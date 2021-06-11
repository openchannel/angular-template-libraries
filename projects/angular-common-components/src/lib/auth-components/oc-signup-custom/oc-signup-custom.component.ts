import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { OcEditUserFormConfig, OcEditUserResult } from '../models/oc-edit-user-form.model';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'oc-signup-custom',
    templateUrl: './oc-signup-custom.component.html',
    styleUrls: ['./oc-signup-custom.component.scss'],
})
export class OcSignupCustomComponent {
    @Input() loginUrl: string;
    @Input() signupUrl: string;
    @Input() activationUrl: string;
    @Input() termsUrl: string;
    @Input() policyUrl: string;
    @Input() companyLogoUrl: string;
    @Input() process: boolean;
    @Input() forgotPasswordDoneUrl: string;
    @Input() showSignupFeedbackPage: boolean;
    @Input() formConfigsLoading = true;
    @Input() formConfigs: OcEditUserFormConfig[];
    @Input() defaultTypeLabelText = 'Type';
    @Input() customTermsDescription: TemplateRef<any>;

    @Output() resultUserData = new EventEmitter<OcEditUserResult>();

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
