import {Component, Input} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'oc-modal-header',
  templateUrl: './oc-modal-header.component.html',
  styleUrls: ['./oc-modal-header.component.scss']
})
export class OcModalHeaderComponent {

  @Input() modalTitle = 'Need set title header';
  @Input() ngbModalRef: NgbModalRef;

  constructor() {
  }

  onClick() {
    this.ngbModalRef.close();
  }
}
