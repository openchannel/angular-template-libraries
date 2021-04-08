import {Injectable} from '@angular/core';
import jwtDecode from 'jwt-decode';
import {AccessLevel, Permission, PermissionType, UserDetails} from '../model/api/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthHolderService {

  readonly ACCESS_TOKEN_KEY = 'accessToken';
  readonly REFRESH_TOKEN_KEY = 'refreshToken';

  public userDetails: UserDetails;

  constructor() {
    this.updateVariables();
  }

  persist(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    this.updateVariables();
  }

  updateAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    this.updateVariables();
  }

  isLoggedInUser() {
    return !!this.accessToken && !!this.refreshToken;
  }

  clearTokensInStorage(): void {
    window.localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  getUserName(): string {
    if (this.userDetails) {
      const firstName = this.userDetails?.firstName;
      const lastName = this.userDetails?.lastName;
      return `${firstName ? firstName : ''} ${lastName ? lastName : ''}`.trim();
    }
    return '';
  }

  private updateVariables(): void {
    try {
      this.userDetails = this.accessToken ? jwtDecode(this.accessToken) : null;
    } catch (error) {
      this.clearTokensInStorage();
    }
  }

  public hasPermission(type: PermissionType, accessArray: AccessLevel[]): boolean {
    if (this.userDetails?.permissions && type && accessArray) {
      return !!this.userDetails?.permissions.find(permission => {
        if (permission) {
          const validType = permission.startsWith(type) || permission.startsWith('*');
          if (validType) {
            if (accessArray.find(access => permission.endsWith(access)) || permission.endsWith('*')) {
              return true;
            }
          }
        }
        return false;
      });
    }
    return false;
  }

  public hasAnyPermission(permissions: Permission []): boolean {
    if (permissions) {
      return !!permissions.find(p => this.hasPermission(p.type, p.access));
    }
    return false;
  }

  get accessToken() {
    return window.localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  set accessToken(token: string) {
      window.localStorage.setItem(this.ACCESS_TOKEN_KEY, token);

  }

  get refreshToken(): string {
    return window.localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  set refreshToken(token: string) {
      window.localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }
}
