import { AppFormField, DropdownFormField } from '../model/app-form-model';
import { FormGroup } from '@angular/forms';
import { OcFormGenerator } from '../oc-form/oc-form-generator';

export interface DropdownFormModel {
    formGroup: FormGroup;
    formFields: AppFormField[];
}

export class OcDropdownFormUtils {
    static getFormFields(field: DropdownFormField, oldValue?: string): AppFormField[] {
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

        return [dropdownField, ...(dropdownForms[dropdownOption] || [])];
    }

    private static findDropdownValue(field: AppFormField, defaultValue: any): string {
        if (field?.options) {
            return field.options.find((option: any) => option?.toLowerCase() === defaultValue?.toLowerCase()) || field.options[0];
        }
        return null;
    }
}
