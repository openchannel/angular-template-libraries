import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppTypeFieldModel } from '@openchannel/angular-common-components/src/lib/common-components';
import { FieldValueModel } from '../model/dynamic-array.model';
import { forIn } from 'lodash';

@Component({
    selector: 'oc-dynamic-array-item',
    templateUrl: './oc-dynamic-array-item.component.html',
    styleUrls: ['./oc-dynamic-array-item.component.scss'],
})
export class OcDynamicArrayItemComponent {
    /** Index of the current item. Default: 0 */
    @Input() index: number = 0;
    /** data from form fields */
    @Input() formFieldsData: any;
    /**
     * ID of the form field which data
     * will be set for array item label.
     * Default: empty
     */
    @Input() fieldLabelId: string = '';
    /**
     * Generated form for the item
     */
    @Input() dfaForm: FormGroup;

    @Input() currentFieldDefinition: AppTypeFieldModel;

    /** Info about field deletion with field id */
    @Output() deleteField: EventEmitter<boolean> = new EventEmitter<boolean>();
    /** Sending data from */
    @Output() sendFieldData: EventEmitter<any> = new EventEmitter<any>();

    subFieldDefinition: any[] = [];

    fieldValues: FieldValueModel[] = [];

    fieldLabel: string;

    constructor() {}

    ngOnInit(): void {
        this.initFieldValues();
        this.initFieldLabel();
    }

    deleteCurrentItem(): void {
        this.deleteField.emit(true);
    }

    editFieldsData(): void {
        this.sendFieldData.emit(null);
    }

    private initFieldValues(): void {
        const newFieldValues: FieldValueModel[] = [];
        if (this.formFieldsData) {
            forIn(this.formFieldsData, (fieldValue, fieldId) => newFieldValues.push({ fieldId, fieldValue }));
        }
        this.fieldValues = newFieldValues;
    }

    private initFieldLabel(): void {
        let tempFieldLabel = '';
        if (this.fieldLabelId && this.currentFieldDefinition?.fields) {
            tempFieldLabel = this.fieldValues.find(field => field.fieldId === this.fieldLabelId)?.fieldValue;
        }
        if (!tempFieldLabel) {
            tempFieldLabel = `Item ${this.index + 1}`;
        }
        this.fieldLabel = tempFieldLabel;
    }
}
