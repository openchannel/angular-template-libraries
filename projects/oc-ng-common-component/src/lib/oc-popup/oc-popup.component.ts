import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'oc-popup',
  templateUrl: './oc-popup.component.html',
  styleUrls: ['./oc-popup.component.scss']
})
export class OcPopupComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Input() textVariable: string;
  @Input() cancelButtonText: string;
  @Input() confirmButtonText: string;
  inProcess: boolean;
  confirmCallback: any;
  cancelCallback: any;

  constructor(public dailog: NgbModal) { }

  ngOnInit(): void {
  }

  dismiss() {
    //alert("close");
    this.dailog.dismissAll();
  }

  cancel() {
    this.inProcess = false;
    this.cancelCallback('cancel');
  }


  confirm() {
    this.inProcess = true;
    this.confirmCallback('confirm');
    
  }


}
