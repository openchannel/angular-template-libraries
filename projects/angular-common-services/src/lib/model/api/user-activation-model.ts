export interface UserActivationModel {
    password: string;
    email: string;
    code: string;
}

export interface UserResetPassword {
    newPassword: string;
    code: string;
}
