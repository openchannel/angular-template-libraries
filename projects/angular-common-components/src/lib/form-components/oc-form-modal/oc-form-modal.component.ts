import { Component, Input, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

/**
 * Form modal component. Represents form in modal window and all related logic.
 *
 * Inputs:
 * @param {string} modalTitle
 * @param {any} formJsonData
 * @param {TemplateRef<any>} confirmButton
 * @param {TemplateRef<any>} rejectButton
 *
 * @example <oc-form-modal [modalTitle]="Custom title" [formJsonData]="" [confirmButton]="cButton" [rejectButton]="rButton">
 */
@Component({
    selector: 'oc-form-modal',
    templateUrl: './oc-form-modal.component.html',
    styleUrls: ['./oc-form-modal.component.scss'],
})
export class OcFormModalComponent {
    /**
     * Title of modal window
     */
    @Input() modalTitle: string;

    /**
     * Metadata for form builder
     */
    @Input() formJsonData: any;

    /**
     * Confirm button template ref
     */
    @Input() confirmButton: TemplateRef<any>;

    /**
     * Reject button template ref
     */
    @Input() rejectButton: TemplateRef<any>;

    /**
     * Angular form group
     */
    private formGroup: FormGroup;

    /**
     * Data for form
     */
    private formData: any;

    /**
     * (private) Modal window instance
     */
    private modal: NgbActiveModal;

    constructor(modal: NgbActiveModal) {
        this.modal = modal;
    }

    /**
     * Function for dismiss modal window
     */
    dismiss(): void {
        this.modal.dismiss();
    }

    /**
     * Set new form to a variable
     * @param {FormGroup} createdForm
     */
    setCreatedForm(createdForm: FormGroup) {
        this.formGroup = createdForm;
    }

    /**
     * Set data to form
     * @param {any} data
     */
    setDataFromForm(data: any) {
        this.formData = data;
    }

    /**
     * Function that executes on click to confirmation button
     */
    onClickConfirmButton(): void {
        if (this.formGroup) {
            this.formGroup.markAllAsTouched();
            if (this.formGroup.valid && this.formData) {
                this.modal.close(this.formData);
            }
        }
    }
}
