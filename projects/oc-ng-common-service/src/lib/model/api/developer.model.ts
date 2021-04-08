export interface DeveloperModel {
  developerId?: string;
  accountCount?: number;
  appCount?: number;
  created?: number;
  email?: string;
  name?: string;
  type?: string;
  roles?: string[];
  permissions?: string[];
  customData?: any;
}

export interface DeveloperAccountModel extends DeveloperModel {
  developerAccountId?: string;
}

export interface DeveloperDataModel {
  developer?: DeveloperModel;
}

export interface DeveloperUpdateModel {
  email?: string;
  name?: string;
  type?: string;
  customData?: any;
}

export interface UpdateDeveloperAccountModel extends DeveloperUpdateModel {
  developerId?: string;
}

export interface DeveloperTypeModel {
  developerTypeId: string;
  label: string;
  description?: string;
  createdDate: number;
  fields: DeveloperTypeFieldModel[];
}

export interface DeveloperTypeFieldModel {
  id: string;
  label: string;
  type: string;
  attributes?: any;
  description?: string;
  fields?: DeveloperTypeFieldModel [];
  subFieldDefinitions?: DeveloperTypeFieldModel [];
  defaultValue?: any;
  placeholder?: string;
  options?: DeveloperTypeOptionModal [] | string [];
  specialType?: string;
}

export interface DeveloperTypeOptionModal {
  value: string;
}
