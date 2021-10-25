import { NgForm } from '@angular/forms';

/**
 * All field validators for this library.
 */
export type FieldError =
    | 'required'
    | 'minlength'
    | 'maxlength'
    | 'minCount'
    | 'maxCount'
    | 'minElementsCount'
    | 'maxElementsCount'
    | 'pattern'
    | 'emailValidator'
    | 'email'
    | 'websiteValidator'
    | 'whiteSpaceValidator'
    | 'serverErrorValidator'
    | 'min'
    | 'max'
    | 'colorValidator'
    | 'booleanTagsValidator'
    | 'numberTagsValidator'
    | 'passwordValidator'
    | 'invalidDFAField'
    | string;

/**
 * Part of server validators.
 */
export type ServerError =
    | 'email_is_incorrect'
    | 'password_is_incorrect'
    | 'password_reset_required'
    | 'email_not_verified'
    | 'defaultMessageHandler'
    | string;

/**
 * Form IDs, used for identification current form.<br>
 * By this ID will be applied a custom error messages.<br>
 * Note: these are all components that use a form.<br>
 */
export type ErrorMessageFormId = keyof FormErrorMessagePatterns;

/** Pattern for all field error messages */
export type FieldErrorMessagePattern = {
    [key in FieldError]: (params: any) => string;
};

/** Pattern for all server error messages */
export type ServerErrorMessagePattern = {
    [key in ServerError]?: (params: any) => string;
};

/** Interface for friendly showing a form ID and her fields. */
export type FormErrorMessagePatterns = {
    /** Config for component : {@link OcActivationComponent}*/
    activation: 'code';

    /** Config for component : {@link OcEditUserFormComponent}*/
    editUser: 'terms' | string;

    /** Config for component : {@link OcForgotPasswordComponent}*/
    forgotPassword: 'email';

    /** Config for component : {@link OcLoginComponent}*/
    login: 'email' | 'password';

    /** Config for component : {@link OcResendActivationComponent}*/
    resendActivation: 'email' | 'code';

    /** Config for component : {@link OcResetPasswordComponent}*/
    resetPassword: 'newPassword';

    /** Config for component : {@link OcSignupComponent}*/
    signup: 'uname' | 'email' | 'company' | 'password' | 'isChecked';

    /** Config for component : {@link OcSignupCustomComponent}*/
    signupCustom: 'terms' | string;

    /** Config for component : {@link OcReviewComponent}*/
    review: 'rating' | 'headline' | 'description';

    /** Your custom form configurations. */
    [name: string]: string;
};

/** Interface with field and server error messages. */
export interface ErrorMessage {
    fieldValidators?: FieldErrorMessagePattern | null;
    serverValidators?: ServerErrorMessagePattern | null;
}

/** Specific config for updating error message by field path. */
export interface ErrorMessageByFieldPath<T = string> extends ErrorMessage {
    /** Path to form field.*/
    fieldPath: T;
}

export interface FormErrorMessage<T = string> extends ErrorMessage {
    specificFields: ErrorMessageByFieldPath<T>[];
}

export type FormErrorMessageConfig = {
    [name in keyof FormErrorMessagePatterns]?: FormErrorMessage<FormErrorMessagePatterns[name]>;
};

export type FormErrorMessages = {
    [formId: string]: ErrorMessage & {
        specificFields: {
            [fieldPath: string]: ErrorMessage;
        };
    };
};

/**
 * Used for creating custom error message HTML template.
 * Store required data for creating custom error message.
 * Used only for type in TemplateRef<ErrorContext>.
 * Used in :<br>
 *   {@link OcLoginComponent#incorrectEmailErrorCodeTemplate},
 *   {@link OcLoginComponent#notVerifiedEmailErrorTemplate},
 *   {@link OcLoginComponent#passwordResetRequiredErrorTemplate},
 */
export interface ErrorContext {
    /** field or server error data. */
    params: any;
    /** Parent form for this field. */
    parentForm: NgForm | null;
}

/**
 * Pattern for overriding validator error messages  (field and server).<br>
 */
export interface ErrorMessageFormPattern extends ErrorMessage {
    specificFormValidators: FormErrorMessageConfig;
}

/**
 * Configuration for all field error messages.<br>
 * Have default implementation {@link DefaultErrorMessageConfiguration}.
 */
export class AbstractErrorMessageConfiguration {
    readonly fieldValidators: FieldErrorMessagePattern;
    readonly serverValidators: ServerErrorMessagePattern;
    readonly specificFormValidators: FormErrorMessages;

    constructor(
        fieldValidators: FieldErrorMessagePattern,
        serverValidators: ServerErrorMessagePattern,
        specificFormValidators: FormErrorMessageConfig,
    ) {
        this.fieldValidators = fieldValidators || {};
        this.serverValidators = serverValidators || {};
        this.specificFormValidators = this.mapFormConfig(specificFormValidators);
    }

    private mapFormConfig(config: FormErrorMessageConfig): FormErrorMessages {
        const temp: FormErrorMessages = {};
        for (const formId of Object.keys(config)) {
            temp[formId] = {
                fieldValidators: temp[formId]?.fieldValidators || {},
                serverValidators: temp[formId]?.serverValidators || {},
                specificFields: config[formId]?.specificFields
                    ?.filter(field => field.fieldPath)
                    .reduce((acc, field) => ({ ...acc, [field.fieldPath]: field }), {}),
            };
        }
        return temp;
    }
}
/**
 * Error message configuration pattern {@link AbstractErrorMessageConfiguration}. Use for providing error messages config to the main project module.<br>
 *
 * Used for updating server and field validation messages.<br>
 *
 * @example modify error message, for default login component and two custom forms.
 * import {
 *     AbstractErrorMessageConfiguration,
 *     DefaultErrorMessageConfiguration,
 * } from '@openchannel/angular-common-components/src/lib/common-components';
 *
 *  class CustomErrorMessageConfiguration extends DefaultErrorMessageConfiguration {
 *     constructor() {
 *         super(
 *             {
 *                 required: () => '(default) Please fill out this field.',
 *             },
 *             {
 *                defaultMessageHandler: () => '(custom) Server error.',
 *                 email_is_incorrect: () => '(custom) Email is incorrect.',
 *             },
 *             {
 *                login: {
 *                     specificFields: [
 *                         {
 *                             fieldPath: 'email',
 *                             fieldValidators: {
 *                                 required: () => '(custom) Email is required field.',
 *                             },
 *                         },
 *                     ],
 *                 },
 *             },
 *         );
 *     }
 * }
 *
 *  .@NgModule({
 *     providers: [
 *         { provide: AbstractErrorMessageConfiguration, useClass: CustomErrorMessageConfiguration },
 *     ],
 *     bootstrap: [AppComponent],
 *     entryComponents: [],
 * })
 *  export class AppModule {}
 *
 *  # Your component (ts)
 * .@Component({
 *   ...
 *  })
 *  export class YourComponent  {
 *     formJsonData: Partial<AppFormField> = {
 *         fields: [
 *             {
 *                 id: 'text-id',
 *                type: 'text',
 *                 label: 'My text label',
 *                 attributes: {
 *                     required: true,
 *                 },
 *             },
 *         ],
 *     };
 * }
 *
 *  # Your component (html)
 *  <div class="my-forms">
 *      <!-- default login form, already have ID 'login' -->
 *      <oc-login></oc-login>
 *
 *      <!--  your custom form, with ID 'MY_FIRST_FORM' -->
 *      <oc-form formId="MY_FIRST_FORM" [formJsonData]="formJsonData"></oc-form>
 *
 *      <!--  your custom form with ID 'MY_SECOND_FORM'-->
 *      <oc-form formId="MY_SECOND_FORM" [formJsonData]="formJsonData"> </oc-form>
 *  </div>
 */
export class DefaultErrorMessageConfiguration extends AbstractErrorMessageConfiguration {
    constructor(
        fieldValidators?: FieldErrorMessagePattern,
        serverValidators?: ServerErrorMessagePattern,
        specificFormValidators?: FormErrorMessageConfig,
    ) {
        super(
            {
                required: () => 'Please fill out this field',
                minlength: params => 'The min number of characters is ' + params.requiredLength,
                maxlength: params => 'The max allowed number of characters is ' + params.requiredLength,
                minCount: () => '',
                maxCount: () => '',
                minElementsCount: params => `Minimum ${params.requiredCount} ${params.fieldLabel} are required`,
                maxElementsCount: params => `Maximum ${params.requiredCount} ${params.fieldLabel} are required`,
                pattern: params => 'The required pattern is: ' + params.requiredPattern,
                emailValidator: () => 'Email seems to be invalid',
                email: () => 'Email seems to be invalid',
                websiteValidator: () => 'Please enter a valid URL',
                whiteSpaceValidator: () => 'Please fill valid value',
                min: params => 'The minimum possible value is ' + params.min,
                max: params => 'The maximum possible value is ' + params.max,
                colorValidator: () => 'Please enter a valid Color value.',
                booleanTagsValidator: params => params.fieldTitle + " can only contain boolean values ('true' or 'false')",
                numberTagsValidator: params => params.fieldTitle + ' can only contain numeric values',
                passwordValidator: () =>
                    'Password must contain 1 uppercase, 1 lowercase, 1 digit, 1 special char (one of @#$%!^&) and at least 8 characters long',
                invalidDFAField: (params) => `Please, check all fields inside ${params.fieldDefinition.label || ''}`,
                ...(fieldValidators || {}),
            },
            {
                defaultMessageHandler: params => params.message,
                ...(serverValidators || {}),
            },
            {
                signup: {
                    specificFields: [
                        {
                            fieldPath: 'isChecked',
                            fieldValidators: {
                                required: () => 'Please confirm this checkbox',
                            },
                        },
                    ],
                },
                signupCustom: {
                    specificFields: [
                        {
                            fieldPath: 'terms',
                            fieldValidators: {
                                required: () => 'Please confirm this checkbox',
                            },
                        },
                    ],
                },
                resetPassword: {
                    specificFields: [
                        {
                            fieldPath: 'newPassword',
                            fieldValidators: {
                                required: () => null,
                            },
                        },
                    ],
                },
                ...(specificFormValidators || {}),
            },
        );
    }
}

export interface ServerErrorModel {
    field?: string
    type?: string;
    code?: string;
    message?: string
}
export interface ServerErrorEvent<T extends 'onNewErrors' | 'onRemovedError', V> {
    type: T,
    value: V;
}
export interface OnNewErrorsEvent extends ServerErrorEvent<'onNewErrors', ServerErrorModel[]> {}
export interface OnRemoveErrorEvent extends ServerErrorEvent<'onRemovedError', ServerErrorModel[]> {}
