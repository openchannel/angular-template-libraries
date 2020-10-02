import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'oc-form-modal',
  templateUrl: './oc-form-modal.component.html',
  styleUrls: ['./oc-form-modal.component.scss']
})
export class OcFormModalComponent implements OnInit {

  @Input() formJSONData: any;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close({
      status: 'cancel'
    });
  }

  catchFormData(data) {
    this.activeModal.close({
      status: 'success',
      data
    });
  }
}
