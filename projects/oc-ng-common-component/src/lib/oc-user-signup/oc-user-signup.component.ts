import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SellerSignup} from 'oc-ng-common-service';
import {Router} from '@angular/router';
import {OcSellerAgreementComponent} from '../../public-api';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from '../oc-popup/dialog.service';

@Component({
  selector: 'oc-user-signup',
  templateUrl: './oc-user-signup.component.html',
  styleUrls: ['./oc-user-signup.component.scss']
})
export class OcUserSignupComponent implements OnInit {
  imagePath: any;
  closeResult = '';

  @Input() signupModel = new SellerSignup();
  @Input() loginUrl;
  @Input() signupUrl;
  @Input() termsUrl;
  @Input() policyUrl;
  @Input() companyLogoUrl;
  @Input() process;
  @Input() forgotPasswordDoneUrl;
  @Input() showSignupFeedbackPage;

  @Output() submit = new EventEmitter<any>();


  constructor(public dialog: NgbModal) {
  }


  ngOnInit(): void {

  }

  submitForm(form) {
    if (!form.valid) {
      form.control.markAllAsTouched();
      this.submit.emit(false);
      return false;
    }
    this.submit.emit(true);
    return false;
  }
}
