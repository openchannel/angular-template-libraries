import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentsUserLoginModel } from '../models/auth-types.model';

/**
 * Forgot password component. Represents component with forgot password logic.
 *
 * @example <oc-forgot-password [loginModel]="{
 *                                  email: 'admin'
 *                              }"
 *                              [loginUrl]="'/login'"
 *                              [signupUrl]="'/signup'"
 *                              [forgotPasswordDoneUrl]="'/forgot-password.png'"
 *                              [showResultPage]="true"
 *                              [companyLogoUrl]="./img/logo.png"
 *                              [process]="false"
 *                              (submit)="onSubmit()"
 * >
 */
@Component({
    selector: 'oc-forgot-password',
    templateUrl: './oc-forgot-password.component.html',
    styleUrls: ['./oc-forgot-password.component.css'],
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

    /**
     * Path to the email sent icon in .svg format
     */
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
     * Flag for process spinner
     */
    @Input() process: boolean;

    /**
     * Submit output event emitter.
     */
    @Output() readonly submit = new EventEmitter<void>();

    constructor(private router: Router) {}

    /**
     * Submit function if form valid emit `true` value to components output
     * @param {NgForm} form
     */
    submitForm(form: NgForm): void {
        if (!this.process) {
            if (!form.valid) {
                form.control.markAllAsTouched();
            } else {
                this.submit.emit();
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
