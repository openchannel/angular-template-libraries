import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SellerSignup} from 'oc-ng-common-service';

@Component({
  selector: 'oc-signup',
  templateUrl: './oc-signup.component.html',
  styleUrls: ['./oc-signup.component.scss']
})
export class OcSignupComponent {
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
  @Input() withCompany = false;

  @Output() submit = new EventEmitter<any>();


  constructor() {
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
