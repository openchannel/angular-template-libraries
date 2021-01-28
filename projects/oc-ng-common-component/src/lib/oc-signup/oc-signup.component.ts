import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SellerSignup} from 'oc-ng-common-service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

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
  @Input() activationUrl;
  @Input() termsUrl;
  @Input() policyUrl;
  @Input() companyLogoUrl;
  @Input() process;
  @Input() forgotPasswordDoneUrl;
  @Input() showSignupFeedbackPage;
  @Input() withCompany = false;

  @Output() submit = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  submitForm(form: NgForm) {
    if (this.signupModel.isChecked && !this.process) {
      if (!form.valid) {
        form.form.markAllAsTouched();
      }
      this.submit.emit(form.valid);
    }
  }

  goToActivationPage() {
    this.router.navigate([this.activationUrl]);
  }
}
