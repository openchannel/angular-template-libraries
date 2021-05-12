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
