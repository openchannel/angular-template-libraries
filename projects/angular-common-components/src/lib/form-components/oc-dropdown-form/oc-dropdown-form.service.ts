import { AppFormField, DropdownFormField } from '../model/app-form-model';
import { FormGroup } from '@angular/forms';
import { OcFormGenerator } from '../oc-form/oc-form-generator';

export interface DropdownFormModel {
    formGroup: FormGroup;
    formFields: AppFormField[];
}

export class OcDropdownFormUtils {
    static getFormFields(field: DropdownFormField, dropdownValue: string): AppFormField[] {
        if (field?.attributes?.dropdownSettings) {
            const dropdownField = field.attributes.dropdownSettings.dropdownField;
            const otherFields = field.attributes.dropdownSettings.dropdownForms?.[dropdownValue] || [];
            return [dropdownField, ...otherFields];
        } else {
            return [];
        }
    }

    static getFormModel(field: DropdownFormField, oldValue?: string): DropdownFormModel | null {
        const {
            attributes: {
                dropdownSettings: { dropdownForms, dropdownField },
            },
        } = field || ({} as DropdownFormField);

        if (!dropdownForms || !dropdownField) {
            // tslint:disable-next-line:no-console
            console.warn(`Incorrect field settings. Please check dropdown field: id=${field?.id}.`);
            return null;
        }

        const dropdownOption = this.findDropdownValue(dropdownField, oldValue?.[dropdownField.id]);
        if (!dropdownOption) {
            console.warn(`Can't init dropdown value. fieldId=${dropdownField}`);
            return null;
        }

        const formFields = [dropdownField, ...(dropdownForms[dropdownOption] || [])];
        const formGroup = new FormGroup(OcFormGenerator.getFormByConfig(formFields, []));

        return {
            formFields,
            formGroup,
        };
    }

    private static findDropdownValue(field: AppFormField, defaultValue: any): string {
        if (field?.options) {
            return field.options.find((option: any) => option?.toLowerCase() === defaultValue?.toLowerCase()) || field.options[0];
        }
        return null;
    }
}
