import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { OcEditUserFormConfig, OcEditUserResult } from '../models/oc-edit-user-form.model';
import { FormGroup } from '@angular/forms';
import { ErrorMessageFormId, HeadingTag } from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-signup-custom',
    templateUrl: './oc-signup-custom.component.html',
    styleUrls: ['./oc-signup-custom.component.css'],
})
export class OcSignupCustomComponent {
    /**
     * Login url for those users who already has an account.
     * @type {string}.
     */
    @Input() loginUrl: string;

    /**
     * Link to the Sign Up page.
     * ## Example
     * `"/sign-up"`
     */
    @Input() signupUrl: string;

    /**
     * Link to the Activate account page.
     * ## Example
     * `"/activation"`
     */
    @Input() activationUrl: string;

    /**
     * A url for users, which opens the terms of service.
     * @type {string}.
     */
    @Input() termsUrl: string;

    /**
     * A url for users, which opens the data processing policy.
     * @type {string}.
     */
    @Input() policyUrl: string;

    /**
     * A source path to company logo icon.
     * @type {string}.
     */
    @Input() companyLogoUrl: string;

    /**
     * Status of the signup process. If user clicked the Sign Up button - process will start, spinner will be shown on the button
     * and user can not interact with a signup button.
     */
    @Input() process: boolean = false;

    /**
     * A source path to the icon in a result message after the activation email had been sent to the inbox.
     * @type {boolean}.
     */
    @Input() forgotPasswordDoneUrl: string;

    /**
     * A variable which determines whether to show or hide signup feedback page.
     * @type {boolean}.
     */
    @Input() showSignupFeedbackPage: boolean = false;

    /**
     * Flag that showing that form for sign up is loading.
     */
    @Input() formConfigsLoading: boolean = true;

    /**
     * Config for the Custom Sign Up form.
     */
    @Input() formConfigs: OcEditUserFormConfig[];

    /**
     * Default text for the type label.
     */
    @Input() defaultTypeLabelText = 'Type';

    /**
     * Custom template for the checkbox with privacy and terms.
     */
    @Input() customTermsDescription: TemplateRef<any>;

    /**
     * Heading tag of title
     * @type {HeadingTag}.
     * @example.
     * 'h2'.
     */
    @Input() headingTag: HeadingTag = 'h1';

    /** Current form ID. Used for modifying error messages. Look:  {@link ErrorMessageFormId} */
    @Input() formId: ErrorMessageFormId = 'signupCustom';

    /**
     *
     * showSignupFeedbackPage change emitter
     */
    @Output() readonly showSignupFeedbackPageChange = new EventEmitter<boolean>();

    /**
     * Returns last data from the user form on sign up action.
     */
    @Output() readonly resultUserData = new EventEmitter<OcEditUserResult>();

    resultFormValue: OcEditUserResult;
    formGroup: FormGroup;

    constructor(private router: Router) {}

    submitForm(): void {
        if (this.formGroup) {
            this.formGroup.markAllAsTouched();
        }
        if (this.resultFormValue && !this.process) {
            this.resultUserData.emit(this.resultFormValue);
        }
    }

    goToActivationPage(): void {
        this.router.navigate([this.activationUrl]);
    }
}
