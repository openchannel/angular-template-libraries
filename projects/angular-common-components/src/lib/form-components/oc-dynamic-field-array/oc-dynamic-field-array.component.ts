import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { OcFormGenerator } from '../oc-form/oc-form-generator';
import { AppTypeFieldModel, FormArrayItem } from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-dynamic-field-array',
    templateUrl: './oc-dynamic-field-array.component.html',
    styleUrls: ['./oc-dynamic-field-array.component.scss'],
})
export class OcDynamicFieldArrayComponent implements OnInit {
    /**
     * Fields definition config necessary for the DFA generation
     * @param value fields definition config
     */
    @Input() set fieldDefinitionData(value: AppTypeFieldModel) {
        if (value) {
            this.fieldDefinition = value;
        } else {
            throw Error('FieldDefinitionData is required @Input() parameter');
        }
    }
    /**
     * Generated Form Array for the DFA
     */
    @Input() dfaFormArray: FormArray;

    formsArrayConfig: FormArrayItem[] = [];
    fieldDefinition: AppTypeFieldModel;

    constructor() {}

    ngOnInit(): void {
        this.generateConfigForCreatedForms();
    }

    generateConfigForCreatedForms(): void {
        if (this.dfaFormArray && this.dfaFormArray.controls.length > 0) {
            this.dfaFormArray.controls.forEach(control => {
                this.formsArrayConfig.push({
                    isEdit: false,
                    new: false,
                    formData: control.value,
                });
            });
        }
    }

    saveItemFieldsData(formItem: FormArrayItem, control: AbstractControl): void {
        formItem.isEdit = false;
        formItem.new = false;
        formItem.formData = control.value;
    }

    deleteDynamicItem(isNewItem: boolean, index: number): void {
        this.dfaFormArray.removeAt(index);
        this.formsArrayConfig.splice(index, 1);
    }

    addNewArrayItem(): void {
        const newGroup = new FormGroup(OcFormGenerator.getFormByConfig(this.fieldDefinition.fields));
        if (this.fieldDefinition.attributes.ordering === 'append') {
            this.formsArrayConfig.push({
                new: true,
                isEdit: true,
                formData: null,
            });
            this.dfaFormArray.push(newGroup);
        } else {
            this.formsArrayConfig.splice(0, 0, {
                new: true,
                isEdit: true,
                formData: null,
            });
            this.dfaFormArray.insert(0, newGroup);
        }
    }

    cancelArrayItemAdding(index: number, isNewItem: boolean, formControl: AbstractControl): void {
        if (!isNewItem) {
            formControl.setValue({ ...this.formsArrayConfig[index].formData });
            this.formsArrayConfig[index].isEdit = false;
        } else {
            this.formsArrayConfig.splice(index, 1);
            this.dfaFormArray.removeAt(index);
        }
    }

    editDFAItemData(fieldsDefinitions: AppTypeFieldModel, index: number): void {
        this.formsArrayConfig[index] = {
            ...this.formsArrayConfig[index],
            isEdit: true,
        };
    }

    getLabelValue(dataObject: any, rowLabel: string): any {
        return dataObject[rowLabel];
    }

    trackByFieldIndex(index: number, item): number {
        return index;
    }
}
