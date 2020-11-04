import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SellerSignin} from 'oc-ng-common-service';

@Component({
  selector: 'oc-login',
  templateUrl: './oc-login.component.html',
  styleUrls: ['./oc-login.component.scss']
})
export class OcLoginComponent {
  @Input() loginModel = new SellerSignin();
  @Output() loginModelChange = new EventEmitter<SellerSignin>();

  @Input() loginButtonText = 'Log In';
  @Input() forgotPwdUrl;
  @Input() signupUrl;
  @Input() companyLogoUrl = './assets/img/company_logo.svg';
  @Input() process;
  @Input() loginType;

  @Output() submit = new EventEmitter<any>();

  constructor() {
  }

  submitForm(form) {
    this.loginModelChange.emit(this.loginModel);
    if (!form.valid) {
      form.control.markAllAsTouched();
      return;
    }
    this.submit.emit(true);
  }

  onchange(form) {
    if (form.form.controls.email.errors && form.form.controls.email.errors.serverErrorValidator) {
      form.form.controls.email.setErrors(null);
    }
    if (form.form.controls.password.errors && form.form.controls.password.errors.serverErrorValidator) {
      form.form.controls.password.setErrors(null);
    }
  }
}

