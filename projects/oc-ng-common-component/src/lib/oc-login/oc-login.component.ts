import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {SellerSignin} from 'oc-ng-common-service';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'oc-login',
  templateUrl: './oc-login.component.html',
  styleUrls: ['./oc-login.component.scss']
})
export class OcLoginComponent {
  @ViewChild('loginForm') form: NgForm;

  @Input() loginModel = new SellerSignin();
  @Output() loginModelChange = new EventEmitter<SellerSignin>();

  @Input() loginButtonText = 'Log In';
  @Input() forgotPwdUrl;
  @Input() signupUrl;
  @Input() companyLogoUrl = './assets/img/company_logo.svg';
  @Input() process;
  @Input() loginType;
  @Input() incorrectEmailErrorCode = 'email_is_incorrect';
  @Input() notVerifiedEmailErrorCode = 'email_not_verified';

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

  onchange() {
    if (this.form.form.controls.email.errors && this.form.form.controls.email.errors.serverErrorValidator) {
      this.form.form.controls.email.setErrors(null);
    }
    if (this.form.form.controls.password.errors && this.form.form.controls.password.errors.serverErrorValidator) {
      this.form.form.controls.password.setErrors(null);
    }
  }

  isServerErrorExist(): boolean {
    if (this.form) {
      for (const control of Object.keys(this.form.controls)) {
        if (this.form.controls[control].hasError('serverErrorValidator')) {
          return true;
        }
      }
    }
    return false;
  }

  hasServerError(email: NgModel, errorCode: string): boolean {
    if (email.errors) {
      const serverErrorValidator = email.errors.serverErrorValidator;
      if (serverErrorValidator && serverErrorValidator.code === errorCode) {
        return true;
      }
    }
    return false;
  }
}

