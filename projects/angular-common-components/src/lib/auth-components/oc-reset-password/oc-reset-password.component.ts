import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentsUserResetPassword } from '../models/auth-types.model';

@Component({
    selector: 'oc-reset-password',
    templateUrl: './oc-reset-password.component.html',
    styleUrls: ['./oc-reset-password.component.scss'],
})
export class OcResetPasswordComponent implements OnInit {
    /**
     * A source path for company logo.
     * @type {string}.
     */
    @Input() companyLogoUrl;

    /**
     * A variable which determines whether to show or hide button text.
     * Shows button text if it has no active process.
     * @type {boolean}.
     */
    @Input() process;

    /**
     * Login url for those users who already has an account.
     * @type {string}.
     */
    @Input() loginUrl;

    /**
     * Signup url for those users who has no account yet.
     * @type {string}.
     */
    @Input() signupUrl;

    /**
     * The user password model for signup.
     * @type {ComponentsUserResetPassword}.
     */
    @Input() resetModel = new ComponentsUserResetPassword();

    /**
     * Event emitter that submits form.
     * Uses ResetPasswordForm.
     * @type {*}.
     */
    @Output() readonly submit = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    /**
     * Submits a reset password form.
     * Marks all fields as touched.
     * Then emits the valid value of the form.
     */
    submitForm(form: any): void {
        if (!form.valid || this.process) {
            form.control.markAllAsTouched();
            this.submit.emit(false);
        } else {
            this.submit.emit(true);
        }
    }

    /**
     * Calls when form model changes.
     * Checks form errors and validators.
     */
    onchange(form: any): void {
        if (form.form.controls.newPassword.errors && form.form.controls.newPassword.errors.serverErrorValidator) {
            form.form.controls.newPassword.setErrors(null);
        }
    }
}
