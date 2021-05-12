import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentsUserResetPassword } from '../models/auth-types.model';

@Component({
    selector: 'oc-reset-password',
    templateUrl: './oc-reset-password.component.html',
    styleUrls: ['./oc-reset-password.component.scss'],
})
export class OcResetPasswordComponent implements OnInit {
    @Input() companyLogoUrl;
    @Input() process;
    @Input() loginUrl;
    @Input() signupUrl;
    @Input() resetModel = new ComponentsUserResetPassword();
    @Output() submit = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    submitForm(form): void {
        if (!form.valid || this.process) {
            form.control.markAllAsTouched();
            this.submit.emit(false);
        } else {
            this.submit.emit(true);
        }
    }

    onchange(form): void {
        if (form.form.controls.newPassword.errors && form.form.controls.newPassword.errors.serverErrorValidator) {
            form.form.controls.newPassword.setErrors(null);
        }
    }
}
