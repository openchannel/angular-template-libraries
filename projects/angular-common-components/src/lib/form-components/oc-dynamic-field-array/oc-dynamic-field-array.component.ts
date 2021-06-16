import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { OcFormGenerator } from '../oc-form/oc-form-generator';
import { AppTypeFieldModel } from '@openchannel/angular-common-components/src/lib/common-components';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FieldValueModel, FormArrayItem, PreviewLabel } from '../model/dynamic-array.model';

@Component({
    selector: 'oc-dynamic-field-array',
    templateUrl: './oc-dynamic-field-array.component.html',
    styleUrls: ['./oc-dynamic-field-array.component.scss'],
})
export class OcDynamicFieldArrayComponent implements OnInit, OnDestroy {
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
    destroy$: Subject<boolean> = new Subject<boolean>();
    previewLabelSubscription$: Subject<boolean> = new Subject<boolean>();

    ngOnInit(): void {
        this.generateConfigForCreatedForms();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.previewLabelSubscription$.next(true);
        this.previewLabelSubscription$.unsubscribe();
    }

    saveItemFieldsData(formItem: FormArrayItem, control: AbstractControl): void {
        formItem.isEdit = false;
        formItem.new = false;
        formItem.formData = control.value;
    }

    deleteDynamicItem(index: number): void {
        this.dfaFormArray.removeAt(index);
        this.formsArrayConfig.splice(index, 1);
        this.subscribeToAllPreviewFieldChanges();
    }

    addNewArrayItem(): void {
        const newGroup = new FormGroup(OcFormGenerator.getFormByConfig(this.fieldDefinition.fields));
        if (this.fieldDefinition.attributes.ordering === 'append') {
            this.formsArrayConfig.push({
                new: true,
                isEdit: true,
                formData: null,
                previewLabel: null,
                previewFiledValues: null,
            });
            this.dfaFormArray.push(newGroup);
        } else {
            this.formsArrayConfig.splice(0, 0, {
                new: true,
                isEdit: true,
                formData: null,
                previewLabel: null,
                previewFiledValues: null,
            });
            this.dfaFormArray.insert(0, newGroup);
        }
        this.subscribeToAllPreviewFieldChanges();
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

    editDFAItemData(index: number): void {
        this.formsArrayConfig[index] = {
            ...this.formsArrayConfig[index],
            isEdit: true,
        };
        this.subscribeToAllPreviewFieldChanges();
    }

    trackByFieldIndex(index: number, item: any): number {
        return index;
    }

    private generateConfigForCreatedForms(): void {
        if (this.dfaFormArray && this.dfaFormArray.controls.length > 0) {
            this.formsArrayConfig = this.dfaFormArray.controls.map(control => {
                return {
                    isEdit: false,
                    new: false,
                    formData: control.value,
                    previewLabel: null,
                    previewFiledValues: null,
                };
            });
            this.subscribeToAllPreviewFieldChanges();
        }
    }

    private subscribeToAllPreviewFieldChanges(): void {
        this.previewLabelSubscription$.next(true);
        this.dfaFormArray.controls.forEach((control, i) => {
            this.subscribeToPreviewFieldChanges(control, i);
        });
    }

    private subscribeToPreviewFieldChanges(control: AbstractControl, index: number): void {
        this.formsArrayConfig[index].previewLabel = this.getPreviewLabel(control, index);
        this.formsArrayConfig[index].previewFiledValues = this.getPreviewFieldValues(control);
        control.valueChanges
            .pipe(
                tap(() => (this.formsArrayConfig[index].previewLabel = this.getPreviewLabel(control, index))),
                tap(() => (this.formsArrayConfig[index].previewFiledValues = this.getPreviewFieldValues(control))),
                takeUntil(this.previewLabelSubscription$),
            ).subscribe();
    }

    private getPreviewLabel(control: AbstractControl, index: number): PreviewLabel {
        if (!this.fieldDefinition.attributes.rowLabel) {
            // DFA default title
            return {
                defaultLabel: `Item ${index + 1}`,
            };
        } else {
            // DFA title by one of the fields
            return {
                defaultLabel: null,
                customLabelValue: [
                    {
                        fieldId: this.fieldDefinition.attributes.rowLabel,
                        fieldValue: control.value[this.fieldDefinition.attributes.rowLabel],
                    },
                ],
                customLabelDefinition: { fields: this.getFieldByRowLabel(this.fieldDefinition.fields) } as AppTypeFieldModel,
            };
        }
    }

    private getFieldByRowLabel(fields: any[]): AppTypeFieldModel [] {
        return fields.filter(field =>
            field.id ? field.id === this.fieldDefinition.attributes.rowLabel : field.fieldId === this.fieldDefinition.attributes.rowLabel,);
    }

    private getPreviewFieldValues(control: AbstractControl): FieldValueModel[] {
        const newArray: FieldValueModel[] = [];
        for (const fieldName in control.value) {
            newArray.push({ fieldId: fieldName, fieldValue: control.value[fieldName] });
        }
        return newArray;
    }
}
