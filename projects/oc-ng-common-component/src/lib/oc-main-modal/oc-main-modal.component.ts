import {Component, ElementRef, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'oc-main-modal',
  templateUrl: './oc-main-modal.component.html',
  styleUrls: ['./oc-main-modal.component.scss'],
  inputs:['modalTitle', 'ngbModalRef']
})
export class OcMainModalComponent implements OnInit {

  modalTitle = 'Need set title header';

  ngbModalRef: NgbModalRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  close() {
    this.ngbModalRef.close();
  }
}
