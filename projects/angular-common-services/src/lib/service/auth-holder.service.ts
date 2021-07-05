import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AccessLevel, Permission, PermissionType, UserDetails } from '../model/api/user.model';

/**
 * Description:
 * 1. Service for store JWT tokens in local browser storage.
 * 2. Decoding JWT accessToken and getting user data from him.
 * 3. Checking permission (JWT accessToken have field 'permissions',
 *  it is array of user permission.
 *  Example: ['APPS.READ', 'ACCOUNTS.MODIFY', 'ORGANIZATIONS.MODIFY'])
 */
@Injectable({
    providedIn: 'root',
})
export class AuthHolderService {
    /**
     * Get JWT accessToken from the browser local storage.
     * @return string
     */
    get accessToken(): string {
        return window.localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    /**
     * Set JWT accessToken to the browser local storage.
     * @param token (required) JWT accessToken.
     * @return void;
     */
    set accessToken(token: string) {
        window.localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    }

    /**
     * Get JWT refreshToken from the browser local storage.
     * @return string;
     */
    get refreshToken(): string {
        return window.localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    /**
     * Set refreshToken to the browser local storage.
     * @param token (required) JWT refreshToken
     */
    set refreshToken(token: string) {
        window.localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    }
    /**
     * By this key will be store JWT accessToken in browser local storage.
     */
    readonly ACCESS_TOKEN_KEY = 'accessToken';
    /**
     * By this key will be store JWT refreshToken in browser local storage.
     */
    readonly REFRESH_TOKEN_KEY = 'refreshToken';

    /**
     * User data from derived from the decoded JWT accessToken.
     */
    userDetails: UserDetails;

    constructor() {
        this.updateVariables();
    }

    /**
     * Put JWT tokens in browser local storage. Update UserDetails by new claims from the accessToken.
     * @param accessToken (required) JWT access token.
     * @param refreshToken (required) JWT refresh token.
     *
     * @return void;
     */
    persist(accessToken: string, refreshToken: string): void {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;

        this.updateVariables();
    }

    /**
     * Put JWT access token in browser local storage. Update UserDetails by new claims from the accessToken.
     * @param accessToken (required) JWT access token.
     * @return void;
     */
    updateAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
        this.updateVariables();
    }

    /**
     * When exists JWT tokens (access token and refresh token) in browser local storage, return true.
     */
    isLoggedInUser(): boolean {
        return !!this.accessToken && !!this.refreshToken;
    }

    /**
     * Function for removing accessToken and refreshToken from the browser local storage.
     */
    clearTokensInStorage(): void {
        window.localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        window.localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }

    /**
     * Function for creating user name by current user details.
     * @return 'FirstName LastName'
     */
    getUserName(): string {
        if (this.userDetails) {
            const firstName = this.userDetails?.firstName;
            const lastName = this.userDetails?.lastName;
            return `${firstName ? firstName : ''} ${lastName ? lastName : ''}`.trim();
        }
        return '';
    }

    /**
     * Function for checking user permissions. Used for blocking access for some functions or hiding DOM elements.
     *
     * @param type (required) Permission type : 'APPS','ACCOUNTS','DEVELOPERS','USERS','FILES','FORMS','OWNERSHIPS','REVIEWS','ORGANIZATIONS';
     * @param accessArray (required) Array of the access levels: 'READ', 'MODIFY', 'DELETE',
     *
     * @return boolean
     *
     * ### Example:
     * ``
     *   Note: Now permissions in JWT accessToken are : ['APPS.READ', 'APPS.MODIFY']
     *
     *   hasPermission('APPS', ['READ']);
     *   will be return true.
     *
     *   hasPermission('APPS', ['MODIFY']);
     *   will be return true.
     *
     *   hasPermission('APPS', ['DELETE']);
     *   will be return false.
     * ``
     */
    hasPermission(type: PermissionType, accessArray: AccessLevel[]): boolean {
        if (this.userDetails?.permissions && type && accessArray) {
            return !!this.userDetails?.permissions.find(permission => {
                if (!permission) {
                    return false;
                }
                const validType = permission.startsWith(type) || permission.startsWith('*');
                const hasAccess = accessArray.find(access => permission.endsWith(access));
                return (validType && hasAccess) || permission.endsWith('*');
            });
        }
        return false;
    }

    /**
     * Function for checking the array of the user permissions.
     * When will found the first match, from the incoming array 'permissions', the function returns true, else false.
     * Used for blocking access for some functions or hiding DOM elements.
     *
     * @param permissions (required) The array of permission for searching into current user permissions.
     *
     * @return boolean;
     *
     * ### Example:
     * ``
     * Note: Now permissions in JWT accessToken are : ['ACCOUNTS.MODIFY', 'ORGANIZATIONS.MODIFY']
     *
     * const permissions: Permission [] = [
     * {
     *  type: PermissionType.ACCOUNTS,
     *  access: [AccessLevel.READ]
     * },{
     *  type: PermissionType.ORGANIZATIONS,
     *  access: [AccessLevel.READ, AccessLevel.MODIFY, AccessLevel.DELETE]
     * }
     * ]
     *
     * hasAnyPermission(permissions);
     * return true;
     * ``
     */
    hasAnyPermission(permissions: Permission[]): boolean {
        if (permissions) {
            return !!permissions.find(p => this.hasPermission(p.type, p.access));
        }
        return false;
    }

    /**
     * Function for decoding JWT accessToken and creating user details.
     * When JWT signature is not valid, will be removed all JWT tokens from the browser local storage.
     * @return void;
     */
    private updateVariables(): void {
        try {
            this.userDetails = this.accessToken ? jwtDecode(this.accessToken) : null;
        } catch (error) {
            this.clearTokensInStorage();
        }
    }
}
