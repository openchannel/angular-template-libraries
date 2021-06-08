import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentsUserActivationModel } from '../models/auth-types.model';

@Component({
    selector: 'oc-resend-activation',
    templateUrl: './oc-resend-activation.component.html',
    styleUrls: ['./oc-resend-activation.component.scss'],
})
export class OcResendActivationComponent {
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
     * The activation model for signup.
     * @type {ComponentsUserActivationModel}.
     */
    @Input() activationModel = new ComponentsUserActivationModel();

    /**
     * Event emitter that submits form.
     * Uses ResetPasswordForm.
     * @type {*}.
     */
    @Output() readonly submit = new EventEmitter<any>();

    constructor() {}

    /**
     * Submits a resend activation form.
     * Marks all fields as touched.
     * Then emits the valid value of the form.
     */
    submitForm(form: any): void {
        if (!this.process) {
            if (!form.valid) {
                form.control.markAllAsTouched();
            }
            this.submit.emit(form.valid);
        }
    }
}
