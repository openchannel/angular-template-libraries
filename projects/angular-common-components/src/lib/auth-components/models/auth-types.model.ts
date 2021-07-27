/**
 * Model for the [user activation]{@link OcActivationComponent} form.
 *
 * Interface includes
 * ``` typescript
 * {
 *   password: string;
 *   email: string;
 *   code: string;
 * }
 * ```
 */
export class ComponentsUserActivationModel {
    /** password data field */
    password: string;
    /** email data field */
    email: string;
    /** activation code from the email */
    code: string;
}

/**
 * Interface for the [Reset Password]{@link OcResetPasswordComponent} form.
 *
 * Interface includes
 * ``` typescript
 * {
 *   newPassword: string;
 *   code: string;
 * }
 * ```
 */
export class ComponentsUserResetPassword {
    /** new password data */
    newPassword: string;
    /** activation code from the email */
    code: string;
}

/**
 * Interface for the [Login Component]{@link OcLoginComponent}
 *
 * Interface includes
 * ``` typescript
 * {
 *   password: string;
 *   email: string;
 *   isChecked: boolean;
 * }
 * ```
 */
export class ComponentsUserLoginModel {
    /** email data field */
    email: string;
    /** password data field */
    password: string;
    /** status of the `remember me` field */
    isChecked: boolean;
}

/**
 * Interface for the [Sign Up component]{@link OcSignupComponent}.
 *
 * Interface includes
 * ``` typescript
 * {
 *   uname: string;
 *   company: string;
 *   password: string;
 *   email: string;
 *   isChecked: boolean;
 * }
 * ```
 */
export class ComponentsUserRegistrationModel {
    /** field for the username data */
    uname: string;
    /** field for the company data */
    company: string;
    /** field for the password data */
    password: string;
    /** field for the email data */
    email: string;
    /** status of the agree with terms field */
    isChecked: boolean;
}
