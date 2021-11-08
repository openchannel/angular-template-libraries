export interface RoleResponse {
    created: number;
    lastUpdated: number;
    name: string;
    permissions?: string[];
    systemDefined: boolean;
}

export interface DeveloperRoleResponse extends RoleResponse {
    developerRoleId: string;
}

export interface UserRoleResponse extends RoleResponse {
    userRoleId: string;
}
