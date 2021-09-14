import { Page } from './page.model';
import { OwnershipModelResponse } from './ownership.model';

export interface User {
    userId: string;
    name: string;
    email: string;
    customData: any;
    created: number;
    type?: string;
    roles?: string[];
    permissions?: string[];
}

export interface UserDetails {
    email: string;
    exp: number;
    firstName: string;
    generatedByOrigin: string;
    lastName: string;
    organizationId: string;
    roles: string[];
    permissions?: string[];
    userExternalId: string;
    isSSO: boolean;
    individualId?: string;
    userClass?: string;
}

export interface UserAccount extends User {
    userAccountId: string;
}

export interface UserAccountGridModel extends UserAccount {
    inviteStatus?: UserAccountInviteStatusTypeModel;
    inviteId?: string;
    inviteToken?: string;
}

export interface UsersGridParametersModel {
    layout: 'table';
    data: Page<UserAccountGridModel>;
    options: UserGridOptionTypeModel[];
    previewTemplate?: string;
}

export interface UserGridActionModel {
    action: UserGridOptionTypeModel;
    userId: string;
    userAccountId?: string;
    inviteId?: string;
    inviteToken?: string;
}

export interface UserCompanyModel extends User {
    ownedApps?: OwnershipModelResponse[];
    accountCount?: number;
}

export declare type UserGridOptionTypeModel = 'EDIT' | 'DELETE';

export declare type UserAccountInviteStatusTypeModel = 'ACTIVE' | 'INVITED';

export enum AccessLevel {
    ALL = '*',
    READ = 'READ',
    MODIFY = 'MODIFY',
    DELETE = 'DELETE',
}

export enum PermissionType {
    ALL = '*',
    APPS = 'APPS',
    ACCOUNTS = 'ACCOUNTS',
    DEVELOPERS = 'DEVELOPERS',
    USERS = 'USERS',
    FILES = 'FILES',
    FORMS = 'FORMS',
    OWNERSHIPS = 'OWNERSHIPS',
    REVIEWS = 'REVIEWS',
    ORGANIZATIONS = 'ORGANIZATIONS',
}

export interface Permission {
    type: PermissionType;
    access: AccessLevel[];
}
