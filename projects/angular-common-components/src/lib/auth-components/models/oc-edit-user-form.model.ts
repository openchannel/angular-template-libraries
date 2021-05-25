import { TypeFieldModel, TypeModel } from './oc-type-definition.model';

export interface OcCheckboxData {
    termsUrl: string;
    policyUrl: string;
}

export interface OcEditUserFormConfig {
    name: string;
    account: OcEditUserTypeConfig;
    organization: OcEditUserTypeConfig;
    subFields?: {
        order: string[];
    };
}

export interface OcEditUserTypeConfig {
    type: string;
    includeFields: string[];
    typeData: TypeModel<TypeFieldModel>;
}

export interface OcEditUserResult {
    account?: OCOrganization;
    organization?: OCOrganization;
    password?: string;
}

export interface OCOrganization {
    name?: string;
    username?: string;
    type?: string;
    email: string;
    customData?: any;
}
