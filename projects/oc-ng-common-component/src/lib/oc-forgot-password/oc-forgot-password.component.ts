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
  /** Path to the email sent icon in .svg format */
  @Input() forgotPasswordDoneUrl: string = '../../../assets/img/email_done.svg';
  @Input() showResultPage;
  @Input() companyLogoUrl;
  @Input() process;
  @Output() submit = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  submitForm(form) {
    if (!this.process) {
      if (!form.valid) {
        form.control.markAllAsTouched();
      } else {
        this.submit.emit(true);
      }
    }
  }

  goBackToLogin() {
    this.router.navigateByUrl(this.loginUrl);
  }

}
