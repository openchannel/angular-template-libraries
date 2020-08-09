import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  @Input() informationalText: string;
  inProcess: boolean;
  confirmCallback: any;
  cancelCallback: any;
  closeCallBack: any;

  @Input() closeIconUrl;
  @Input() type;

  @Input() isProcess;

  constructor(public dailog: NgbModal) { }

  ngOnInit(): void {
    console.log(this.type);
  }

  dismiss() {
    this.closeCallBack('cancel');
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
