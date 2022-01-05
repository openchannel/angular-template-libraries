import { AppFormField, DropdownFormField } from '../model/app-form-model';
import { cloneDeep } from 'lodash';

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

        const dropdownOption = this.findDropdownValue(dropdownField, oldValue?.[dropdownField.id] || dropdownField.defaultValue);
        if (!dropdownOption) {
            console.warn(`Can't init dropdown value. fieldId=${dropdownField}`);
            return null;
        }
        const clonedDropdownField = cloneDeep(dropdownField);
        const clonedFields = cloneDeep(dropdownForms[dropdownOption] || []);

        clonedFields.forEach(fieldItem => this.setDefaultValue(fieldItem, oldValue?.[fieldItem.id]));
        this.setDefaultValue(clonedDropdownField, dropdownOption);

        return [clonedDropdownField, ...clonedFields];
    }

    private static findDropdownValue(field: AppFormField, defaultValue: any): string {
        if (field?.options) {
            return field.options.find((option: any) => option?.toLowerCase() === defaultValue?.toLowerCase()) || field.options[0];
        }
        return null;
    }

    private static setDefaultValue(field: AppFormField, defaultValue: any): void {
        if (defaultValue) {
            field.defaultValue = defaultValue;
        }
    }
}
