import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ComponentsUserLoginModel } from '../models/auth-types.model';
import {HeadingTag} from "@openchannel/angular-common-components/src/lib/common-components";
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
    @Input() loginButtonText: string = 'Log In';

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
     * Error code for not activated email.
     */
    @Input() notVerifiedEmailErrorCode: string = 'email_not_verified';

    /**
     * Error code for password change required.
     */
    @Input() passwordResetRequiredErrorCode: string = 'password_reset_required';

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
     * Checks if there are server errors for the whole form
     * @returns boolean
     */
    isServerErrorExist(): boolean {
        if (this.form) {
            for (const control of Object.keys(this.form.controls)) {
                if (this.form.controls[control].hasError('serverErrorValidator')) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Checks if there are server errors for provided model
     * @returns boolean
     */
    hasServerError(control: NgModel, errorCode: string): boolean {
        if (control.errors) {
            const serverErrorValidator = control.errors.serverErrorValidator;
            if (serverErrorValidator && serverErrorValidator.code === errorCode) {
                return true;
            }
        }
        return false;
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
