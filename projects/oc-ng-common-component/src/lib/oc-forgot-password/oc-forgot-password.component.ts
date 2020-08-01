import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SellerSignin } from 'oc-ng-common-service';

@Component({
  selector: 'oc-forgot-password',
  templateUrl: './oc-forgot-password.component.html',
  styleUrls: ['./oc-forgot-password.component.scss']
})
export class OcForgotPasswordComponent implements OnInit {
  @Input() loginModel = new SellerSignin();

  @Input() loginUrl;
  @Input() signupUrl;
  @Input() companayLogoUrl;
  @Input() forgotPasswordDoneUrl;
  @Input() ForgotPwdPageState;

  @Output() submit = new EventEmitter<any>();
  constructor() { }

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




}
