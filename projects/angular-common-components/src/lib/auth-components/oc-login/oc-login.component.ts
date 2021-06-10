import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ComponentsUserLoginModel } from '../models/auth-types.model';
/**
 * Login component. Represent login page with auth logic.
 * 
 * Inputs:
 * @param {ComponentsUserLoginModel} loginModel - default `new ComponentsUserLoginModel()`
 * @param {string} loginButtonText - default `'Log in'`
 * @param {string} forgotPwdUrl
 * @param {string} signupUrl
 * @param {string} companyLogoUrl - default `'~@openchannel/angular-common-components/assets/angular-common-components/logo-company.png'`
 * @param {boolean} process
 * @param {string} incorrectEmailErrorCode - default `'email_is_incorrect'`
 * @param {string} notVerifiedEmailErrorCode - default `'email_not_verified'`
 * <br>
 * Outputs:
 * @param {EventEmitter<ComponentsUserLoginModel>} loginModelChange
 * @param {EventEmitter<any>} submit
 * @param {EventEmitter<string>} sendActivationLink
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
    @ViewChild('loginForm') form: NgForm;

    @Input() loginModel = new ComponentsUserLoginModel();
    @Output() loginModelChange = new EventEmitter<ComponentsUserLoginModel>();

    @Input() loginButtonText = 'Log In';
    @Input() forgotPwdUrl: string;
    @Input() signupUrl: string;
    @Input() companyLogoUrl = '~@openchannel/angular-common-components/assets/angular-common-components/logo-company.png';
    @Input() process: boolean;
    @Input() incorrectEmailErrorCode = 'email_is_incorrect';
    @Input() notVerifiedEmailErrorCode = 'email_not_verified';

    @Output() submit = new EventEmitter<any>();
    @Output() sendActivationLink = new EventEmitter<string>();

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
            this.submit.emit(true);
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
     * Fuction executed when user pres on activation link
     * @param {NgModel} email
     * @returns void
     */
    onActivationLinkClick(email: NgModel): void {
        this.sendActivationLink.emit(email.value);
        this.onchange();
    }
}
