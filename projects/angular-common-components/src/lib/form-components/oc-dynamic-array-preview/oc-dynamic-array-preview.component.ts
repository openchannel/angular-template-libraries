import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldValueModel, PreviewFieldModel } from '../model/dynamic-array.model';
import { AppTypeFieldModel } from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-dynamic-array-preview',
    templateUrl: './oc-dynamic-array-preview.component.html',
    styleUrls: ['./oc-dynamic-array-preview.component.scss'],
})
export class OcDynamicArrayPreviewComponent implements OnInit {
    readonly DYNAMIC_FIELD_ARRAY_KEY = 'dynamicFieldArray';

    @Input() fieldValues: FieldValueModel[];
    @Input() fieldDefinition: AppTypeFieldModel;
    @Input() dfaForm: FormGroup;

    previewFields: PreviewFieldModel[];

    constructor() {}

    ngOnInit(): void {
        this.buildFieldsData();
    }

    buildFieldsData(): void {
        if (this.fieldDefinition?.fields) {
            this.previewFields = this.fieldDefinition.fields.map(field => {
                const result: PreviewFieldModel = {
                    isValidField: false,
                    fieldValue: null,
                    formArrayDFA: null,
                    ...field,
                };
                if (this.fieldValues && field) {
                    result.fieldValue = this.fieldValues.find(value => field?.id === value.fieldId)?.fieldValue;
                }
                if (result.type === this.DYNAMIC_FIELD_ARRAY_KEY) {
                    result.formArrayDFA = this.dfaForm.get(result.id) as FormArray;
                }
                result.isValidField = this.isValidDataForFieldType(field.type, result.fieldValue);
                return result;
            });
        } else {
            this.previewFields = [];
        }
    }

    private isValidDataForFieldType(type: string, fieldValue: any): boolean {
        switch (type) {
            case 'text':
            case 'richText':
            case 'longText':
            case 'videoUrl':
            case 'websiteUrl':
            case 'emailAddress':
            case 'singleImage':
                return !fieldValue || typeof fieldValue === 'string';
            case 'number':
                return !fieldValue || typeof fieldValue === 'number';
            case 'multiImage':
                return !fieldValue || (Array.isArray(fieldValue) && !(fieldValue as []).find(url => typeof url !== 'string'));
            case 'tags':
            case 'booleanTags':
            case 'numberTags':
                return !fieldValue || Array.isArray(fieldValue);
            case 'dynamicFieldArray':
                return Array.isArray(fieldValue) && typeof fieldValue[0] === 'object';
            default:
                return false;
        }
    }
}
