import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { OcFormGenerator } from '../oc-form/oc-form-generator';
import { AppTypeFieldModel, ErrorMessageFormId } from '@openchannel/angular-common-components/src/lib/common-components';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FieldValueModel, FormArrayItem, PreviewLabel } from '../model/dynamic-array.model';
import { defaultFieldsForTrim } from '../model/app-form-model';

/**
 * Dynamic field array component.
 * A group of form fields, which can be generated dynamically.
 * Uses field definition data config.
 */
@Component({
    selector: 'oc-dynamic-field-array',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './oc-dynamic-field-array.component.html',
    styleUrls: ['./oc-dynamic-field-array.component.css'],
})
export class OcDynamicFieldArrayComponent implements OnInit, OnDestroy, OnChanges {
    /**
     * Option to specify whether to show preview mode
     * @type {boolean}
     * @default true
     */
    @Input() isShowPreviewMode: boolean = true;

    @Input() previewMode: boolean = false;
    /**
     * Fields definition config necessary for the DFA generation.
     * Throws an error if no value provided.
     * @param value fields definition config.
     */
    @Input() set fieldDefinitionData(value: AppTypeFieldModel) {
        if (value) {
            this.fieldDefinition = value;
        } else {
            throw Error('FieldDefinitionData is required @Input() parameter');
        }
    }

    /**
     * Generated Form Array for the DFA.
     * @type {FormArray}.
     */
    @Input() dfaFormArray: FormArray;

    /**
     * Subject that emits an array of indexes of DFA items that needed to be in edit mode.
     * @type {Subject<number[]>}.
     */
    @Input() set setDFAItemsEditMode(setDFAItemsEditMode: Subject<number[]>) {
        setDFAItemsEditMode?.pipe(takeUntil(this.destroy$)).subscribe(indexes => {
            indexes.forEach(index => this.editDFAItemData(index));
            this.cdRef.detectChanges();
        });
    }

    /**
     * Subject that emits an array of indexes of DFA items that needed to be updated.
     * @type {Subject<number[]>}.
     */
    @Input() set updateDFAItems(updateDFAItems: Subject<number[]>) {
        updateDFAItems?.pipe(takeUntil(this.destroy$)).subscribe(indexes => {
            indexes.forEach(index => this.updateDFAItem(index));
        });
    }

    /** Current form ID. Used for modifying error messages. Look:  {@link ErrorMessageFormId} */
    @Input() formId: ErrorMessageFormId = null;

    formsArrayConfig: FormArrayItem[] = [];
    fieldDefinition: AppTypeFieldModel;
    destroy$: Subject<boolean> = new Subject<boolean>();
    previewLabelSubscription$: Subject<boolean> = new Subject<boolean>();
    /**
     * Initial array length for {@link dfaFormArray}. Used for compare with a new array length.
     */
    currentDFALength: number;

    constructor(private cdRef: ChangeDetectorRef) {}

    /**
     * Generates config for created forms on component initializing.
     */
    ngOnInit(): void {
        this.generateConfigForCreatedForms();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.currentDFALength !== this.dfaFormArray.length) {
            this.generateConfigForCreatedForms();
        }
    }

    /**
     * Subject unsubscription on destroy lifecycle hook.
     */
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.previewLabelSubscription$.next(true);
        this.previewLabelSubscription$.unsubscribe();
    }

    /**
     * Saves form array items data.
     */
    saveItemFieldsData(formItem: FormArrayItem, control: AbstractControl): void {
        formItem.isEdit = false;
        formItem.new = false;
        formItem.formData = control.value;
    }

    /**
     * Removes dynamic item from a form array by its index.
     * Removes specific part of config.
     * Subscribes to all preview field changes.
     */
    deleteDynamicItem(index: number): void {
        this.dfaFormArray.removeAt(index);
        this.formsArrayConfig.splice(index, 1);
        this.subscribeToAllPreviewFieldChanges();
    }

    /**
     * Adds new dynamic item to a form array.
     * Uses OcFormGenerator.
     * Subscribes to all preview field changes.
     */
    addNewArrayItem(): void {
        const newGroup = new FormGroup(OcFormGenerator.getFormByConfig(this.fieldDefinition.fields, defaultFieldsForTrim));
        if (this.fieldDefinition?.attributes?.ordering === 'append') {
            this.formsArrayConfig.push({
                new: true,
                isEdit: true,
                formData: null,
                previewLabel: null,
                previewFiledValues: null,
                previewCollapsedDFAFields: true,
            });
            this.dfaFormArray.push(newGroup);
        } else {
            this.formsArrayConfig.splice(0, 0, {
                new: true,
                isEdit: true,
                formData: null,
                previewLabel: null,
                previewFiledValues: null,
                previewCollapsedDFAFields: true,
            });
            this.dfaFormArray.insert(0, newGroup);
        }
        this.subscribeToAllPreviewFieldChanges();
    }

    /**
     * Cancels adding a new dynamic item to a form array.
     * Checks its index, isNewItem and formControl.
     */
    cancelArrayItemAdding(index: number, isNewItem: boolean, formControl: AbstractControl): void {
        if (!isNewItem) {
            formControl.setValue({ ...this.formsArrayConfig[index].formData });
            this.formsArrayConfig[index].isEdit = false;
        } else {
            this.formsArrayConfig.splice(index, 1);
            this.dfaFormArray.removeAt(index);
        }
    }

    /**
     * Performs DFA item data edit.
     * Checks its index.
     * Subscribes to all preview field changes.
     */
    editDFAItemData(index: number): void {
        this.formsArrayConfig[index] = {
            ...this.formsArrayConfig[index],
            isEdit: true,
        };
        this.dfaFormArray.controls[index].markAllAsTouched();
        this.subscribeToAllPreviewFieldChanges();
    }

    /**
     * Updates DFA item by index in formsArrayConfig according to dfaFormArray.
     */
    private updateDFAItem(index: number): void {
        this.formsArrayConfig[index] = {
            ...this.formsArrayConfig[index],
            formData: this.dfaFormArray.controls[index].value,
        };
    }

    /**
     * Creates a new config for created form.
     * Maps DFA form array controls and returns new object.
     * Subscribes to all preview field changes.
     */
    private generateConfigForCreatedForms(): void {
        this.currentDFALength = this.dfaFormArray.length;

        if (this.dfaFormArray && this.dfaFormArray.controls.length > 0) {
            this.formsArrayConfig = this.dfaFormArray.controls.map(control => {
                return {
                    isEdit: false,
                    new: false,
                    formData: control.value,
                    previewLabel: null,
                    previewFiledValues: null,
                    previewCollapsedDFAFields: this.previewMode || false,
                };
            });
            this.subscribeToAllPreviewFieldChanges();
        }
    }

    /**
     * Performs a forEach loop, calling subscribeToPreviewFieldChanges() method in each iteration.
     */
    private subscribeToAllPreviewFieldChanges(): void {
        this.previewLabelSubscription$.next(true);
        this.dfaFormArray.controls.forEach((control, i) => {
            this.subscribeToPreviewFieldChanges(control, i);
        });
    }

    /**
     * Used in subscribeToAllPreviewFieldChanges() method.
     * Subscribes to changes of the current control value.
     */
    private subscribeToPreviewFieldChanges(control: AbstractControl, index: number): void {
        this.formsArrayConfig[index].previewLabel = this.getPreviewLabel(control, index);
        this.formsArrayConfig[index].previewFiledValues = this.getPreviewFieldValues(control);
        control.valueChanges
            .pipe(
                tap(() => (this.formsArrayConfig[index].previewLabel = this.getPreviewLabel(control, index))),
                tap(() => (this.formsArrayConfig[index].previewFiledValues = this.getPreviewFieldValues(control))),
                takeUntil(this.previewLabelSubscription$),
            )
            .subscribe();
    }

    /**
     * Gets a preview label for current form control.
     * Returns object with default value or custom label value and label definition.
     */
    private getPreviewLabel(control: AbstractControl, index: number): PreviewLabel {
        if (!this.fieldDefinition?.attributes?.rowLabel) {
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

    /**
     * Gets a field by row label.
     * Returns a fields array where field ids equal field definition row label.
     */
    private getFieldByRowLabel(fields: any[]): AppTypeFieldModel[] {
        return fields.filter(field =>
            field.id ? field.id === this.fieldDefinition.attributes.rowLabel : field.fieldId === this.fieldDefinition.attributes.rowLabel,
        );
    }

    /**
     * Gets preview field values.
     * Returns a new array with field ids and field values.
     */
    private getPreviewFieldValues(control: AbstractControl): FieldValueModel[] {
        const newArray: FieldValueModel[] = [];
        for (const fieldName in control.value) {
            newArray.push({ fieldId: fieldName, fieldValue: control.value[fieldName] });
        }
        return newArray;
    }
}
