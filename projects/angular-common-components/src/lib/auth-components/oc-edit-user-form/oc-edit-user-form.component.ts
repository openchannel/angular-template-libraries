import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeFieldModel, TypeModel } from '../models/oc-type-definition.model';
import { OcCheckboxData, OcEditUserFormConfig, OcEditUserResult, OCOrganization } from '../models/oc-edit-user-form.model';
import { TypeMergeUtils } from '../utils/type-merge.util';
import { ErrorMessageFormId } from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-edit-user-form',
    templateUrl: './oc-edit-user-form.component.html',
    styleUrls: ['./oc-edit-user-form.component.css'],
})
export class OcEditUserFormComponent implements OnInit {
    private readonly ORG_PREFIX = 'org--';
    private readonly PASSWORD_FILED_KEY = 'password';

    @Input() formConfigs: OcEditUserFormConfig[];
    @Input() enableTypesDropdown = false;
    @Input() enablePasswordField = false;
    @Input() enableTermsCheckbox: OcCheckboxData;
    @Input() defaultTypeLabelText = 'Type';
    @Input() defaultAccountData: OCOrganization;
    @Input() defaultOrganizationData: OCOrganization;
    @Input() defaultEmptyConfigsErrorTemplate: TemplateRef<any>;
    @Input() defaultEmptyConfigsErrorMessage: string = 'There are no forms configured';
    @Input() customTermsDescription: TemplateRef<any>;
    /** Current form ID. Used for modifying error messages. Look:  {@link ErrorMessageFormId} */
    @Input() formId: ErrorMessageFormId = 'editUser';
    @Output() readonly resultFormDataChange = new EventEmitter<OcEditUserResult>();
    @Output() readonly createdFormGroup = new EventEmitter<FormGroup>();

    mainFormModel: TypeModel<TypeFieldModel>;
    formGroup: FormGroup;
    termsControl: FormControl;
    currentFormConfig: OcEditUserFormConfig;

    ngOnInit(): void {
        this.buildFormByConfig(this.getCurrentFormConfig());
    }

    buildFormByConfig(formConfig: OcEditUserFormConfig): void {
        this.clearPreviousValues();
        const fieldsSorting = (field1, field2) => {
            const index1 = formConfig.fieldsOrder.indexOf(field1.id);
            const index2 = formConfig.fieldsOrder.indexOf(field2.id);
            return (index1 > -1 ? index1 : Infinity) - (index2 > -1 ? index2 : Infinity);
        };
        if (formConfig) {
            this.currentFormConfig = formConfig;
            let tempForm: any = {};
            if (formConfig.organization?.includeFields) {
                const config = formConfig?.organization;
                tempForm = TypeMergeUtils.mergeTypes(
                    tempForm,
                    this.defaultOrganizationData,
                    config.typeData,
                    this.ORG_PREFIX,
                    config.includeFields,
                );
            }
            if (formConfig.account?.includeFields) {
                const config = formConfig?.account;
                tempForm = TypeMergeUtils.mergeTypes(tempForm, this.defaultAccountData, config.typeData, '', config.includeFields);
            }
            if (this.enablePasswordField) {
                const passwordField: TypeFieldModel = {
                    id: this.PASSWORD_FILED_KEY,
                    type: 'password',
                    label: 'Password',
                    attributes: {
                        required: true,
                    },
                };
                tempForm = TypeMergeUtils.mergeTypes(tempForm, this.defaultOrganizationData, { fields: [passwordField] }, '', ['password']);
            }
            if (formConfig.fieldsOrder) {
                tempForm.fields.sort(fieldsSorting);
            }

            this.mainFormModel = tempForm;
        }
    }

    buildAndEmitResultData(formData: any): void {
        if (this.formGroup?.valid && this.currentFormConfig) {
            let account: OCOrganization;
            if (this.currentFormConfig?.account?.includeFields) {
                account = TypeMergeUtils.mergeDataAfterChanges(
                    this.defaultAccountData,
                    TypeMergeUtils.findFieldsWithoutCustomPrefixes(formData, [this.ORG_PREFIX]),
                );
                account.type = this.currentFormConfig.account.type;
            }
            let organization: OCOrganization;
            if (this.currentFormConfig?.organization?.includeFields) {
                organization = TypeMergeUtils.mergeDataAfterChanges(
                    this.defaultOrganizationData,
                    TypeMergeUtils.findFieldsWithCustomPrefixes(formData, [this.ORG_PREFIX]),
                );
                organization.type = this.currentFormConfig.organization.type;
            }
            this.resultFormDataChange.emit({
                account,
                organization,
                password: formData?.password,
            });
        } else {
            this.resultFormDataChange.emit(null);
        }
    }

    setFormGroup(formGroup: FormGroup): void {
        this.formGroup = formGroup;
        if (this.enableTermsCheckbox) {
            this.termsControl = new FormControl(false, Validators.requiredTrue);
            this.formGroup.addControl('terms', this.termsControl);
        }
        this.createdFormGroup.emit(formGroup);
    }

    private getCurrentFormConfig(): OcEditUserFormConfig {
        const accType = this.defaultAccountData ? this.defaultAccountData.type : null;
        const orgType = this.defaultOrganizationData ? this.defaultOrganizationData.type : null;
        if (this.formConfigs) {
            const newConfig = this.formConfigs.find(
                config => (accType && accType === config?.account.type) || (orgType && orgType === config?.organization.type),
            );

            if (newConfig) {
                return newConfig;
            } else if (this.formConfigs[0]) {
                return this.formConfigs[0];
            } else {
                return null;
            }
        }
    }

    private clearPreviousValues(): void {
        this.mainFormModel = null;
        this.formGroup = null;
        this.termsControl = null;
    }
}
