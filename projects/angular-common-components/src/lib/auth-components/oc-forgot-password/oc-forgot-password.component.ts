import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentsUserLoginModel } from '../models/auth-types.model';
import {HeadingTag} from "@openchannel/angular-common-components/src/lib/common-components";

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
    @Output() readonly buttonClick = new EventEmitter<void>();

    /**
     * Heading tag of title
     * @type {HeadingTag}.
     * @example.
     * 'h2'.
     */
    @Input() headingTag: HeadingTag = 'h1';

    constructor(private router: Router) {}

    /**
     * Submit function if form valid emit `true` value to components output
     * @param {NgForm} form
     */
    submitForm(form: NgForm): void {
        if (!this.process) {
            form.form.markAllAsTouched();
            if (form.valid) {
                this.buttonClick.emit();
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
