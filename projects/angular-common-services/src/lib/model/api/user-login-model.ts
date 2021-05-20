export interface OCOrganizationResponse {
    name?: string;
    username?: string;
    type?: string;
    email: string;
    customData?: any;
}

export class UserLoginModel {
    email: string;
    password: string;
    isChecked: boolean;
}

export interface OCNativeSignup {
    password: string;
}
export interface OCNativeCustomSignup extends OCNativeSignup {
    account: OCOrganizationResponse;
    organization: OCOrganizationResponse;
}

export interface OCNativeDefaultSignup extends OCNativeSignup {
    uname: string;
    email: string;
    company: string;
    password: string;
}
