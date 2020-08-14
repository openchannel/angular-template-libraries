import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SellerSignup } from 'oc-ng-common-service';
import { Router, ActivatedRoute } from '@angular/router';
import { OcSellerAgreementComponent } from '../../public-api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from '../oc-popup/dialog.service';

@Component({
  selector: 'oc-signup',
  templateUrl: './oc-signup.component.html',
  styleUrls: ['./oc-signup.component.scss']
})
export class OcSignupComponent implements OnInit {
  imagePath: any;
  closeResult = '';

  @Input() signupModel = new SellerSignup();
  @Input() loginUrl;
  @Input() activationUrl;
  @Input() signupUrl;
  @Input() termsUrl;
  @Input() policyUrl;
  @Input() companyLogoUrl;
  @Input() process;
  @Input() forgotPasswordDoneUrl;
  @Input() showSignupFeedbackPage;

  @Input() sellerAgreementTitle: string="Seller Agreement";
  @Input() sellerAgreementText: string = "Agreement Text";
  @Input() closeButtonText: string="Close";

  @Input() dataPolocyTitle: string="Data Processing Policy";
  @Input() dataPolicyText: string = "Policy Text";
 
  @Output() submit = new EventEmitter<any>();


  constructor(public dialog: NgbModal,
    private dialogService: DialogService,
    private router: Router) { }


  ngOnInit(): void {

  }

  getValue(label: string) {
    return label;
  }

  // getImage() {
  //   return "~oc-ng-common-component/assets/img/logo-philips.svg";
  // }

  // img = {
  //   src: url('~oc-ng-common-component/assets/img/logo-philips.svg');
  // }

  submitForm(form) {
    if (!form.valid) {
      form.control.markAllAsTouched();
      this.submit.emit(false);
      return false;
    }
    this.submit.emit(true);  
    return false;    
  }

  goToActivationPage(){
    this.router.navigateByUrl(this.activationUrl);
  }

  openSellerAgreementDetails(){
    this.dialogService.showAgreementPopup(OcSellerAgreementComponent as Component,
      this.sellerAgreementTitle,this.sellerAgreementText,this.closeButtonText );
  }

  openDataProcessingPolicy(){
    this.dialogService.showAgreementPopup(OcSellerAgreementComponent as Component,
      this.dataPolocyTitle,this.dataPolicyText,this.closeButtonText );
  }
}
