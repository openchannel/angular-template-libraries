import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
    AppFormField,
    AppFormModel,
    defaultFieldsForTrim,
    DropdownFormField,
    FormLabelPosition
} from '../model/app-form-model';
import { AbstractControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { OcDropdownFormUtils } from '../oc-dropdown-form/oc-dropdown-form.service';
import { OcFormGenerator } from '../oc-form/oc-form-generator';
import { forIn } from 'lodash';

@Component({
    selector: 'oc-dropdown-form',
    templateUrl: './oc-dropdown-form.component.html',
    styleUrls: ['./oc-dropdown-form.component.scss'],
})
export class OcDropdownFormComponent implements OnInit, OnDestroy {
    @Input() formId: string;
    @Input() labelPosition: FormLabelPosition;
    @Input() field: DropdownFormField;
    @Input() formGroup: FormGroup;

    destroy$ = new Subject<void>();
    formFields: AppFormModel;
    private dropdownControlId: string;
    private dropdownControl: AbstractControl;

    constructor() {}

    ngOnInit(): void {
        this.initDropdownControlId();
        this.initDropdownControl();
        this.initFieldsByDropdownControlValue();
        this.listenDropdownChanges();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initDropdownControlId(): void {
        this.dropdownControlId = this.field?.attributes?.dropdownSettings?.dropdownField?.id;
    }

    initDropdownControl(): void {
        if (this.dropdownControlId) {
            this.dropdownControl = this.formGroup?.controls?.[this.dropdownControlId];
        }
    }

    initFieldsByDropdownControlValue(): void {
        this.setFormFields(OcDropdownFormUtils.getFormFields(this.field, this.formGroup?.value));
    }

    listenDropdownChanges(): void {
        if (this.dropdownControl) {
            this.dropdownControl.valueChanges
                .pipe(takeUntil(this.destroy$))
                .subscribe(dropdownValue => this.updateFormByDropdownValue(dropdownValue));
        } else {
            console.warn(`Can't find dropdown form control by id ${this.labelPosition}`);
        }
    }

    updateFormByDropdownValue(dropdownValue: string): void {
        const oldValue = { ...this.formGroup.value, [this.dropdownControlId]: dropdownValue };
        const newFields = OcDropdownFormUtils.getFormFields(this.field, oldValue);
        const newFormGroup = new FormGroup(OcFormGenerator.getFormByConfig(newFields, defaultFieldsForTrim));
        newFormGroup.patchValue(oldValue);
        this.setFormFields(newFields);
        this.setFormControls(newFormGroup.controls);
    }

    setFormFields(fields: AppFormField[]): void {
        this.formFields = { fields };
    }

    setFormControls(newControls: { [controlName: string]: AbstractControl }): void {
        forIn(this.formGroup.controls, (value, controlName) => this.formGroup.removeControl(controlName));
        forIn(newControls, (control, controlName) => this.formGroup.addControl(controlName, control));
        this.formGroup.setControl(this.dropdownControlId, this.dropdownControl);
    }
}
