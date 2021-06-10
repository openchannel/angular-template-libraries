import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentsUserLoginModel } from '../models/auth-types.model';

/**
 * Forgot password component. Represents component with forgot password logic.
 *
 * Inputs:
 * @param {ComponentsUserLoginModel} loginModel
 * @param {string} loginUrl
 * @param {string} signupUrl
 * @param {string} forgotPasswordDoneUrl
 * @param {boolean} showResultPage
 * @param {string} companyLogoUrl
 * @param {boolean} process
 * <br>
 * Outputs:
 * @param {EventEmitter<any>} submit
 *
 * @example <oc-forgot-password [loginModel]="{
 *                                  email: 'admin',
 *                                  password: 'admin',
 *                                  isChecked: true
 *                              }"
 *                              [loginUrl]="'/login'"
 *                              [signupUrl]="'/signup'"
 *                              [forgotPasswordDoneUrl]="'/forgot-password.png'"
 *                              [showResultPage]="true"
 *                              [companyLogoUrl]="logo.png"
 *                              [process]="false"
 *                              (submit)="onSubmit()"
 * >
 */
@Component({
    selector: 'oc-forgot-password',
    templateUrl: './oc-forgot-password.component.html',
    styleUrls: ['./oc-forgot-password.component.scss'],
})
export class OcForgotPasswordComponent {
    /**
     * Login data
     */
    @Input() loginModel: ComponentsUserLoginModel = new ComponentsUserLoginModel();

    /**
     * Url for back to login
     */
    @Input() loginUrl: string;

    /**
     * Url for go to sign up
     */
    @Input() signupUrl: string;

    /** Path to the email sent icon in .svg format */
    @Input() forgotPasswordDoneUrl: string = 'assets/angular-common-components/email_done.svg';

    /**
     * Flag to show result page or not
     */
    @Input() showResultPage: boolean;

    /**
     * URL to company logo
     */
    @Input() companyLogoUrl: string;

    /**
     * Flag to know process go or not
     */
    @Input() process: boolean;

    /**
     * Submit output eventemitter
     */
    @Output() submit = new EventEmitter<any>();

    constructor(private router: Router) {}

    /**
     * Submit function if form valid emit 'true' value to components output
     * @param {NgForm} form
     */
    submitForm(form: NgForm): void {
        if (!this.process) {
            if (!form.valid) {
                form.control.markAllAsTouched();
            } else {
                this.submit.emit(true);
            }
        }
    }

    /**
     * Navigate back to login page
     */
    goBackToLogin(): void {
        this.router.navigateByUrl(this.loginUrl).then();
    }
}
