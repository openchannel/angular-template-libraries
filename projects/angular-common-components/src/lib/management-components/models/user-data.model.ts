import { ComponentsPage } from '@openchannel/angular-common-components/src/lib/common-components';

export interface ComponentsUser {
    userId: string;
    name: string;
    email: string;
    customData: any;
    created: number;
    type?: string;
    roles?: string[];
    permissions?: string[];
}

export interface ComponentsUserAccount extends ComponentsUser {
    userAccountId: string;
}

export interface ComponentsUserAccountGridModel extends ComponentsUserAccount {
    inviteStatus?: UserAccountInviteStatusType;
    inviteId?: string;
    inviteToken?: string;
}

export declare type UserAccountInviteStatusType = 'ACTIVE' | 'INVITED';
export declare type UserGridOptionType = 'EDIT' | 'DELETE';

export interface ComponentsUserGridActionModel {
    action: UserGridOptionType;
    userId: string;
    userAccountId?: string;
    inviteId?: string;
    inviteToken?: string;
}

export interface ComponentsUsersGridParametersModel {
    layout: 'table';
    data: ComponentsPage<ComponentsUserAccountGridModel>;
    options: UserGridOptionType[];
    previewTemplate?: string;
}

export interface Role {
    created: number;
    lastUpdated: number;
    name: string;
    permissions?: string[];
    systemDefined: boolean;
}

export interface DeveloperRole extends Role {
    developerRoleId: string;
}

export interface UserRole extends Role {
    userRoleId: string;
}
