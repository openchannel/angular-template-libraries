import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppFormField, DropdownAdditionalField } from '../model/app-form-model';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OcFormGenerator } from '../oc-form/oc-form-generator';
import { cloneDeep } from 'lodash';

@Component({
    selector: 'oc-additional-select',
    templateUrl: './oc-additional-select.component.html',
    styleUrls: ['./oc-additional-select.component.scss'],
})
export class OcAdditionalSelectComponent implements OnInit, OnDestroy {
    @Input() formGroup: FormGroup;
    @Input() dropdownField: DropdownAdditionalField;
    @Input() fields: AppFormField[];

    otherFieldId: string;
    destroy$ = new Subject<void>();

    constructor() {}

    ngOnInit(): void {
        this.initOtherFieldId();
        this.listenDropdownChanges();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initOtherFieldId(): void {
        this.otherFieldId = this.dropdownField?.attributes?.subTypeSettings?.additionalFieldId;
    }

    private listenDropdownChanges(): void {
        if (this.formGroup && this.dropdownField) {
            this.formGroup.controls[this.dropdownField.id].valueChanges
                .pipe(takeUntil(this.destroy$))
                .subscribe(dropdownValue => this.updateValidatorsForOtherField(dropdownValue));
        }
    }

    private updateValidatorsForOtherField(dropdownValue: string): void {
        const attributesByValue = this.dropdownField?.attributes?.subTypeSettings?.additionalFieldAttributesByDropdownValue[dropdownValue];
        const otherField = cloneDeep(this.fields?.find(field => field.id === this.otherFieldId)) as AppFormField;
        if (attributesByValue && otherField && this.formGroup?.controls[this.otherFieldId]) {
            const control = this.formGroup.controls[this.otherFieldId];
            otherField.attributes = { ...(otherField?.attributes || {}), ...attributesByValue };
            OcFormGenerator.setValidators(control, otherField);
            control.updateValueAndValidity();
        }
    }
}
