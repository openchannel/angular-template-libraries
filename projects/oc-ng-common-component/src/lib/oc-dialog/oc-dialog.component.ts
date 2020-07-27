import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'oc-dialog',
  templateUrl: './oc-dialog.component.html',
  styleUrls: ['./oc-dialog.component.scss']
})
export class OcDialogComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Input() textVariable: string;
  @Input() cancelButtonText: string;
  @Input() confirmButtonText: string;
  inProcess: boolean;
  confirmCallback: any;
  cancelCallback: any;

  constructor(public dialog: NgbActiveModal) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.dialog.dismiss();
  }

  cancel() {
    this.inProcess = false;
    this.cancelCallback('cancel');
  }

  confirm() {
    this.inProcess = true;
    this.confirmCallback('confirm');
    //this.dialog.close();
  }
}
