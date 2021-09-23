import { AppTypeFieldModel } from '@openchannel/angular-common-components/src/lib/common-components';
import { FormArray } from '@angular/forms';

export interface FieldValueModel {
    fieldId: string;
    fieldValue: any;
}

export interface PreviewFieldModel extends AppTypeFieldModel {
    isValidField: boolean;
    fieldValue: any;
    formArrayDFA: FormArray;
}

export interface FormArrayItem {
    new: boolean;
    isEdit: boolean;
    formData: any;
    previewLabel: PreviewLabel;
    previewFiledValues: FieldValueModel[];
    previewCollapsedDFAFields: boolean;
}

export interface PreviewLabel {
    defaultLabel: string;
    customLabelValue?: FieldValueModel[];
    customLabelDefinition?: AppTypeFieldModel;
    isCollapsedPreviewFields?: boolean;
}

export interface FieldValueModel {
    fieldId: string;
    fieldValue: any;
}
