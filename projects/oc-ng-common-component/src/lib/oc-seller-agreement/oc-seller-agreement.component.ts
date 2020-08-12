import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'oc-seller-agreement',
  templateUrl: './oc-seller-agreement.component.html',
  styleUrls: ['./oc-seller-agreement.component.scss']
})
export class OcSellerAgreementComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() textVariable: string;
  @Input() cancelButtonText: string;
  @Input() confirmButtonText: string;
  @Input() closeButtonText: string;
  @Input() informationalText: string;
  inProcess: boolean;
  confirmCallback: any;
  cancelCallback: any;
  closeCallBack: any;
  cropperModalRef: any;

  closeResult = '';
  title1 = 'appBootstrap';

  @Input() closeIconUrl;
  constructor(public dialog: NgbModal,
    private modalService: NgbModal) { }

  ngOnInit(): void {
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

  close() {
    this.inProcess = true;
    this.closeCallBack('close'); 
  }

  
  //  openModel(content) {
  // //   console.log(content);
  // //   this.cropperModalRef = this.modalService
  // //   .open(content)
  // //   .result.then(
  // //     () => {
  // //       // Do Nothing
  // //     },
  // //     () => {
  // //       alert("gfdfg")
  // //     }
  // //   );
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }


}
