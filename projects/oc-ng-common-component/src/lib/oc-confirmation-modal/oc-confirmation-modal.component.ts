import {Component, Input, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'oc-confirmation-modal',
  templateUrl: './oc-confirmation-modal.component.html',
  styleUrls: ['./oc-confirmation-modal.component.scss']
})
export class OcConfirmationModalComponent implements OnInit {

  @Input() ngbModalRef: NgbModalRef;

  @Input() modalTitle: string;
  @Input() modalText: string;

  @Input() confirmButtonText = 'Ok';
  @Input() confirmButtonType: 'primary' | 'secondary' | 'link' | 'danger' = 'primary';
  @Input() confirmButtonHide: boolean = false;

  @Input() rejectButtonText = 'No, cancel';
  @Input() rejectButtonType: 'primary' | 'secondary' | 'link' | 'danger' = 'secondary';
  @Input() rejectButtonHide: boolean = false;

  constructor() { }
  ngOnInit(): void {
  }

  closeModal(result?: boolean) {
    this.ngbModalRef.close(result)
  }
}
