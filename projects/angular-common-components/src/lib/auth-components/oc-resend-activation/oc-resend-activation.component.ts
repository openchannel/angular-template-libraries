import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentsUserActivationModel } from '../models/auth-types.model';

/**
 * A resend activation component. A form, which allows user to retry sending account activation to email.
 * Contains of a header, password field and navigation links.
 */
@Component({
    selector: 'oc-resend-activation',
    templateUrl: './oc-resend-activation.component.html',
    styleUrls: ['./oc-resend-activation.component.css'],
})
export class OcResendActivationComponent {
    /**
     * Login url for those users who already has an account.
     * @type {string}.
     */
    @Input() loginUrl: string;

    /**
     * Signup url for those users who has no account yet.
     * @type {string}.
     */
    @Input() signupUrl: string;

    /**
     * A source path for company logo.
     * @type {string}.
     */
    @Input() companyLogoUrl: string;

    /**
     * A variable which determines whether to show or hide button text.
     * Shows button text if it has no active process.
     * @type {boolean}.
     */
    @Input() process: boolean = false;

    /**
     * The activation model for signup.
     * @type {ComponentsUserActivationModel}.
     */
    @Input() activationModel: ComponentsUserActivationModel = new ComponentsUserActivationModel();

    /**
     * Event emitter that submits form.
     * Uses ResetPasswordForm.
     * @type {*}.
     */
    @Output() readonly submit: EventEmitter<any> = new EventEmitter<any>();

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
