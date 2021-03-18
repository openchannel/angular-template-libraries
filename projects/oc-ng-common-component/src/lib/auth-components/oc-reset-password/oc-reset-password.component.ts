import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserResetPassword} from 'oc-ng-common-service';

@Component({
  selector: 'oc-reset-password',
  templateUrl: './oc-reset-password.component.html',
  styleUrls: ['./oc-reset-password.component.scss']
})
export class OcResetPasswordComponent implements OnInit {

  @Input() companyLogoUrl;
  @Input() process;
  @Input() loginUrl;
  @Input() signupUrl;
  @Input() resetModel = new UserResetPassword();
  @Output() submit = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  submitForm(form) {
    if (!form.valid || this.process) {
      form.control.markAllAsTouched();
      this.submit.emit(false);
    } else {
      this.submit.emit(true);
    }
  }

  onchange(form) {
    if (form.form.controls.newPassword.errors && form.form.controls.newPassword.errors.serverErrorValidator) {
      form.form.controls.newPassword.setErrors(null);
    }
  }
}
