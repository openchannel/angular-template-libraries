import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentsUserActivationModel } from '../models/auth-types.model';

@Component({
    selector: 'oc-activation',
    templateUrl: './oc-activation.component.html',
    styleUrls: ['./oc-activation.component.scss'],
})
export class OcActivationComponent {
    @Input() resendActivationUrl;
    @Input() signupUrl;
    @Input() companyLogoUrl;
    @Input() process;
    @Input() activationModel = new ComponentsUserActivationModel();
    @Output() submit = new EventEmitter<any>();


    submitForm(form) {
        if (!this.process) {
            if (!form.valid) {
                form.control.markAllAsTouched();
            }
            this.submit.emit(form.valid);
        }
    }
}
