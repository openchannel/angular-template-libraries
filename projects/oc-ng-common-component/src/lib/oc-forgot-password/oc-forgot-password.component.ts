import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SellerSignin} from 'oc-ng-common-service';
import {Router} from '@angular/router';

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
  @Input() companyLogoUrl;
  @Input() process;
  @Output() submit = new EventEmitter<any>();

  constructor(private router: Router) {
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

  goBackToLogin() {
    this.router.navigateByUrl(this.loginUrl);
  }

}
