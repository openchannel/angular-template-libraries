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
