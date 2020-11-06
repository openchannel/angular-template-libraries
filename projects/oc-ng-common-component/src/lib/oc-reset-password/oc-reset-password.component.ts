import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SellerResetPassword} from 'oc-ng-common-service';

@Component({
  selector: 'oc-reset-password',
  templateUrl: './oc-reset-password.component.html',
  styleUrls: ['./oc-reset-password.component.scss']
})
export class OcResetPasswordComponent implements OnInit {

  @Input() companyLogoUrl;
  @Input() process;
  @Input() resetModel = new SellerResetPassword();
  @Output() submit = new EventEmitter<any>();

  constructor() {
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

  onchange(form) {
    if (form.form.controls.email.errors && form.form.controls.email.errors.serverErrorValidator) {
      form.form.controls.email.setErrors(null);
    }
    if (form.form.controls.newPassword.errors && form.form.controls.newPassword.errors.serverErrorValidator) {
      form.form.controls.newPassword.setErrors(null);
    }
  }
}
