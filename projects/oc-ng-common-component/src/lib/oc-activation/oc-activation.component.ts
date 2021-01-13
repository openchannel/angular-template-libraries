import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SellerActivation} from 'oc-ng-common-service';


@Component({
  selector: 'oc-activation',
  templateUrl: './oc-activation.component.html',
  styleUrls: ['./oc-activation.component.scss']
})
export class OcActivationComponent {

  @Input() resendActivationUrl;
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
      } else {
        this.submit.emit(true);
      }
    }
  }
}
