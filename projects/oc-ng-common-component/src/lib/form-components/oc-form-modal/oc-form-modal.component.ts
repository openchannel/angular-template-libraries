import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'oc-form-modal',
  templateUrl: './oc-form-modal.component.html',
  styleUrls: ['./oc-form-modal.component.scss']
})
export class OcFormModalComponent implements OnInit {

  @Input() ngbModalRef: NgbModalRef;
  @Input() modalTitle: string;
  @Input() formJsonData: any;

  @Input() confirmButton: TemplateRef<any>;
  @Input() rejectButton: TemplateRef<any>;

  private formGroup: FormGroup;
  private formData: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.ngbModalRef.close();
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
        this.ngbModalRef.close(this.formData);
      }
    }
  }
}
