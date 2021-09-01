import { Component, Input, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { AppFormModel } from '../model/app-form-model';

/**
 * Form modal component. Represents form in modal window and all related logic.
 *
 * @example <oc-form-modal [modalTitle]="Custom title"
 *                         [formJsonData]="{
 *                              formId: 'test',
 *                              name: 'test',
 *                              createdDate: 1599982592157,
 *                              fields: [
 *                                  {
 *                                    id: 'role',
 *                                    label: 'role',
 *                                    description: '',
 *                                    defaultValue: 'user',
 *                                    type: 'dropdownList',
 *                                    required: null,
 *                                    attributes: {required: true},
 *                                    options: ['admin', 'user', 'test'],
 *                                  }
 *                              ]
 *                         }"
 *                         [confirmButton]="cButtonTemplateRef"
 *                         [rejectButton]="rButtonTemplateRef"
 * >
 */
@Component({
    selector: 'oc-form-modal',
    templateUrl: './oc-form-modal.component.html',
    styleUrls: ['./oc-form-modal.component.css'],
})
export class OcFormModalComponent {
    /**
     * Title of modal window
     */
    @Input() modalTitle: string;

    /**
     * Metadata for form builder
     */
    @Input() formJsonData: AppFormModel;

    /**
     * Confirm button template ref. Use it if you want to change deafault confirmation button.
     */
    @Input() confirmButton: TemplateRef<any>;

    /**
     * Reject button template ref. Use it if you want to change deafault reject button.
     */
    @Input() rejectButton: TemplateRef<any>;

    /**
     * Angular form group
     * @private
     */
    private formGroup: FormGroup;

    /**
     * Data for form
     * @private
     */
    private formData: any;

    /**
     * Modal window instance
     * @private
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
    setCreatedForm(createdForm: FormGroup): void {
        this.formGroup = createdForm;
    }

    /**
     * Set data to form
     * @param {any} data
     */
    setDataFromForm(data: any): void {
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
