import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ComponentsUserLoginModel } from '../models/auth-types.model';
/**
 * Login component. Represent login page with auth logic.
 *
 * @example <oc-login [loginModel]="{login: 'admin', password:'password', isChecked: true}" [loginButtonText]="'Some text'"
 *      [forgotPwdUrl]="/forgot-password" [signupUrl]="/signup" [companyLogoUrl]="/newlogo.png" [process]="false"
 *      [incorrectEmailErrorCode]="" [notVerifiedEmailErrorCode]="">
 */
@Component({
    selector: 'oc-login',
    templateUrl: './oc-login.component.html',
    styleUrls: ['./oc-login.component.scss'],
})
export class OcLoginComponent {
    /**
     * Main login form template reference (NgForm)
     */
    @ViewChild('loginForm') form: NgForm;

    /**
     * Main form model that contain login data.
     *
     * Default: `new ComponentsUserLoginModel()`
     */
    @Input() loginModel = new ComponentsUserLoginModel();

    /**
     * Text for login button
     *
     * Default: 'Log In'
     */
    @Input() loginButtonText = 'Log In';

    /**
     * Link to redirect on forgot password button click
     */
    @Input() forgotPwdUrl: string;

    /**
     * Link to redirect on sign up button click
     */
    @Input() signupUrl: string;

    /**
     * URL to company logo image
     *
     * Default: `'~@openchannel/angular-common-components/assets/angular-common-components/logo-company.png'`
     */
    @Input() companyLogoUrl = '~@openchannel/angular-common-components/assets/angular-common-components/logo-company.png';

    /**
     * Flag to know process goes or not
     */
    @Input() process: boolean;

    /**
     * Error code for incorrect email.
     *
     * Default: 'email_is_incorect'
     */
    @Input() incorrectEmailErrorCode = 'email_is_incorrect';

    /**
     * Error code for not activated email.
     *
     * Default: 'email_not_verified'
     */
    @Input() notVerifiedEmailErrorCode = 'email_not_verified';

    /**
     * Output event that emits on model change and pass Login model
     */
    @Output() readonly loginModelChange = new EventEmitter<ComponentsUserLoginModel>();

    /**
     * Output event that emits on submit form
     */
    @Output() readonly loginSubmit = new EventEmitter<boolean>();

    /**
     * Output event that emits on click to activation link button and pass Link email value
     */
    @Output() readonly sendActivationLink = new EventEmitter<string>();

    /**
     * Submit fuction emit changed login value check form on validity and submit 'true' if everything is ok.
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
            this.loginSubmit.emit(true);
        }
    }

    /**
     * Fuction executed when triggers change event
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
    hasServerError(email: NgModel, errorCode: string): boolean {
        if (email.errors) {
            const serverErrorValidator = email.errors.serverErrorValidator;
            if (serverErrorValidator && serverErrorValidator.code === errorCode) {
                return true;
            }
        }
        return false;
    }

    /**
     * Fuction executed when user press on activation link
     * @param {NgModel} email
     * @returns void
     */
    onActivationLinkClick(email: NgModel): void {
        this.sendActivationLink.emit(email.value);
        this.onchange();
    }
}
