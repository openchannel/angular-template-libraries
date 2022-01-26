export interface ProfileTypeModel {
    label?: string;
    description?: string;
    createdDate: number;
    fields: UserTypeFieldModel[];
}

export interface UserAccountTypeModel extends ProfileTypeModel {
    userAccountTypeId: string;
}

export interface DeveloperAccountTypeModel extends ProfileTypeModel {
    developerAccountTypeId: string;
}

export interface UserTypeModel extends ProfileTypeModel {
    userTypeId: string;
}

export interface UserTypeFieldModel {
    id: string;
    label: string;
    type: string;
    attributes?: any;
    description?: string;
    fields?: UserTypeFieldModel[];
    subFieldDefinitions?: UserTypeFieldModel[];
    defaultValue?: any;
    placeholder?: string;
    options?: UserTypeOptionModal[] | string[];
    specialType?: string;
}

export interface UserTypeOptionModal {
    value: string;
}
