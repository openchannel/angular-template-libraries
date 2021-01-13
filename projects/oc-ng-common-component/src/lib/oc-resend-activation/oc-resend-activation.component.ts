import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SellerActivation} from 'oc-ng-common-service';

@Component({
  selector: 'oc-resend-activation',
  templateUrl: './oc-resend-activation.component.html',
  styleUrls: ['./oc-resend-activation.component.scss']
})
export class OcResendActivationComponent {

  @Input() loginUrl;
  @Input() signupUrl;
  @Input() companyLogoUrl;
  @Input() process;
  @Input() activationModel = new SellerActivation();
  @Output() submit = new EventEmitter<any>();

  constructor() {
  }

  submitForm(form) {
    if (!this.process) {
      if (!form.valid) {
        form.control.markAllAsTouched();
        this.submit.emit(false);
        return false;
      }
      this.submit.emit(true);
      return false;
    }
  }
}
