import {Component, Input, TemplateRef} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'oc-form-modal',
  templateUrl: './oc-form-modal.component.html',
  styleUrls: ['./oc-form-modal.component.scss']
})
export class OcFormModalComponent {

  @Input() modalTitle: string;
  @Input() formJsonData: any;

  @Input() confirmButton: TemplateRef<any>;
  @Input() rejectButton: TemplateRef<any>;

  private formGroup: FormGroup;
  private formData: any;
  private modal: NgbActiveModal;

  constructor(modal: NgbActiveModal) {
    this.modal = modal;
  }

  dismiss(): void {
    this.modal.dismiss();
  }

  setCreatedForm(createdForm: FormGroup) {
    this.formGroup = createdForm;
  }

  setDataFromForm(data: any) {
    this.formData = data;
  }

  onClickConfirmButton(): void {
    if (this.formGroup) {
      this.formGroup.markAllAsTouched();
      if (this.formGroup.valid && this.formData) {
        this.modal.close(this.formData);
      }
    }
  }
}
