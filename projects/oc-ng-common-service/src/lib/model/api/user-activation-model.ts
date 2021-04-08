export class UserActivationModel {
    password: string;
    email: string;
    code: string;
}

export class UserResetPassword {
    newPassword: string;
    code: string;
}
