import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ComponentsUserRegistrationModel } from '../models/auth-types.model';
import { ErrorMessageFormId, HeadingTag } from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-signup',
    templateUrl: './oc-signup.component.html',
    styleUrls: ['./oc-signup.component.css'],
})
export class OcSignupComponent {
    /**
     * The user registration model for signup.
     * Contains signup form fields values.
     * @type {ComponentsUserRegistrationModel}.
     */
    @Input() signupModel = new ComponentsUserRegistrationModel();

    /**
     * Login url for those users who already has an account.
     * @type {string}.
     */
    @Input() loginUrl;

    /**
     * A url for users to activate their account.
     * @type {string}.
     */
    @Input() activationUrl;

    /**
     * A url for users, which opens the terms of service.
     * @type {string}.
     */
    @Input() termsUrl;

    /**
     * A url for users, which opens the data processing policy.
     * @type {string}.
     */
    @Input() policyUrl;

    /**
     * A source path to company logo icon.
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
     * A source path to the icon in a result message after the activation email had been sent to the inbox.
     * @type {boolean}.
     */
    @Input() forgotPasswordDoneUrl;

    /**
     * A variable which determines whether to show or hide signup feedback page.
     * @type {boolean}.
     */
    @Input() showSignupFeedbackPage: boolean;

    /**
     * showSignupFeedbackPage change emitter
     */
    @Output() readonly showSignupFeedbackPageChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * Shows or hides a signup company block of the form.
     * @type {boolean}.
     * Default false.
     */
    @Input() withCompany = false;

    /**
     * Event emitter that submits a click event.
     * Used in SubmitForm method, if all the fields are checked.
     * @type {*}.
     */
    @Output() readonly submitClick = new EventEmitter<any>();

    /**
     * Heading tag of title
     * @type {HeadingTag}.
     * @example.
     * 'h2'.
     */
    @Input() headingTag: HeadingTag = 'h1';

    /** Current form ID. Used for modifying error messages. Look:  {@link ErrorMessageFormId} */
    formId: ErrorMessageFormId = 'signup';

    constructor(private router: Router) {}

    /**
     * Submits a signup form.
     * Marks all fields as touched.
     * Then emits the valid value of the form.
     */
    submitForm(form: NgForm): void {
        form.form.markAllAsTouched();
        if (this.signupModel.isChecked && !this.process) {
            this.submitClick.emit(form.valid);
        }
    }

    /**
     * Redirects a user to account activation page, using activationUrl.
     */
    goToActivationPage(): void {
        this.router.navigate([this.activationUrl]);
    }
}
