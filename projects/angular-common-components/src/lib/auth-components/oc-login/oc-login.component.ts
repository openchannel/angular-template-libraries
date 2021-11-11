import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ComponentsUserLoginModel } from '../models/auth-types.model';
import {
    ErrorContext,
    ErrorMessageFormId,
    HeadingTag,
    OcErrorService,
} from '@openchannel/angular-common-components/src/lib/common-components';
/**
 * Login component. Represent login page with auth logic.
 *
 * @example <oc-login [loginModel]="{login: 'admin', password:'password', isChecked: true}"
 *                    loginButtonText="Some text"
 *                    forgotPwdUrl="/forgot-password"
 *                    signupUrl="/signup"
 *                    companyLogoUrl="./assets/img/logo.png"
 *                    [process]="false">
 */
@Component({
    selector: 'oc-login',
    templateUrl: './oc-login.component.html',
    styleUrls: ['./oc-login.component.css'],
})
export class OcLoginComponent {
    /**
     * Main login form template reference (NgForm)
     */
    @ViewChild('loginForm') form: NgForm;

    /**
     * Main form model that contain login data.
     */
    @Input() loginModel: ComponentsUserLoginModel = new ComponentsUserLoginModel();

    /**
     * Text for the login button.
     */
    @Input() loginButtonText: string = 'Log in';

    /**
     * Link to the Forgot password page.
     * ## Example
     * `"/forgot-password"`
     */
    @Input() forgotPwdUrl: string;

    /**
     * Link to the Sign Up page.
     * ## Example
     * `"/sign-up"`
     */
    @Input() signupUrl: string;

    /**
     * Path to the company logo. If not set, default logo will be shown.
     */
    @Input() companyLogoUrl: string = './assets/angular-common-components/logo-company.png';

    /**
     * Status of the login process. If user clicked the Login button - process will start, spinner will be shown on the button
     * and user can not interact with a login button.
     */
    @Input() process: boolean = false;

    /**
     * Error code for incorrect email.
     */
    @Input() incorrectEmailErrorCode: string = 'email_is_incorrect';
    /**
     * Error html template for {@link incorrectEmailErrorCode}.
     */
    @Input() incorrectEmailErrorCodeTemplate: TemplateRef<ErrorContext>;
    /**
     * Error code for not activated email.
     */
    @Input() notVerifiedEmailErrorCode: string = 'email_not_verified';
    /**
     * Error html template for {@link notVerifiedEmailErrorCode}.
     */
    @Input() notVerifiedEmailErrorTemplate: TemplateRef<ErrorContext>;
    /**
     * Error code for password change required.
     */
    @Input() passwordResetRequiredErrorCode: string = 'password_reset_required';
    /**
     * Error html template for {@link passwordResetRequiredErrorCode}.
     */
    @Input() passwordResetRequiredErrorTemplate: TemplateRef<ErrorContext>;

    /**
     * Output event that emits on model change and pass Login model
     */
    @Output() readonly loginModelChange: EventEmitter<ComponentsUserLoginModel> = new EventEmitter<ComponentsUserLoginModel>();

    /**
     * Output event that emits on that login button was clicked and the login model was updated with new valid data.
     */
    @Output() readonly submit: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * Output event that emits on click to activation link button and pass Link email value
     */
    @Output() readonly sendActivationLink: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Heading tag of title
     * @type {HeadingTag}.
     * @example.
     * 'h2'.
     */
    @Input() headingTag: HeadingTag = 'h1';

    /** Current form ID. Used for modifying error messages. Look:  {@link ErrorMessageFormId} */
    formId: ErrorMessageFormId = 'login';

    constructor(public errorService: OcErrorService) {}

    /**
     * Submit function emit changed login value check form on validity and submit `true` if everything is ok.
     * @param {NgForm} form
     * @returns void
     */
    submitForm(form: NgForm): void {
        if (!this.process) {
            this.loginModelChange.emit(this.loginModel);
            if (!form.valid) {
                form.control.markAllAsTouched();
                return;
            }
            this.submit.emit(true);
        }
    }

    /**
     * Function executed when triggers change event
     */
    onchange(): void {
        if (this.form.form.controls.email.errors && this.form.form.controls.email.errors.serverErrorValidator) {
            this.form.form.controls.email.setErrors(null);
        }
        if (this.form.form.controls.password.errors && this.form.form.controls.password.errors.serverErrorValidator) {
            this.form.form.controls.password.setErrors(null);
        }
    }

    /**
     * Function executed when user press on activation link
     * @param {NgModel} email
     * @returns void
     */
    onActivationLinkClick(email: NgModel): void {
        this.sendActivationLink.emit(email.value);
        this.onchange();
    }
}
