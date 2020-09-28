import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SellerSignin} from 'oc-ng-common-service';

@Component({
  selector: 'oc-login',
  templateUrl: './oc-login.component.html',
  styleUrls: ['./oc-login.component.scss']
})
export class OcLoginComponent implements OnInit {
  @Input() loginModel = new SellerSignin();

  @Input() loginButtonText = 'Log In';
  @Input() forgotPwdUrl;
  @Input() signupUrl;
  @Input() companyLogoUrl;
  @Input() process;

  @Output() submit = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getValue(label: string) {
    return label;
  }

  submitForm(form) {
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

