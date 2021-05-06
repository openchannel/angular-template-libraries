import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcActivationComponent } from './oc-activation/oc-activation.component';
import { OcResendActivationComponent } from './oc-resend-activation/oc-resend-activation.component';
import { OcResetPasswordComponent } from './oc-reset-password/oc-reset-password.component';
import { OcForgotPasswordComponent } from './oc-forgot-password/oc-forgot-password.component';
import { OcSignupComponent } from './oc-signup/oc-signup.component';
import { OcLoginComponent } from './oc-login/oc-login.component';
import { OcCommonLibModule } from 'oc-ng-common-component/src/lib/common-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OcEditUserFormComponent } from './oc-edit-user-form/oc-edit-user-form.component';
import { OcSignupCustomComponent } from './oc-signup-custom/oc-signup-custom.component';
import { OcFormComponentsModule } from 'oc-ng-common-component/src/lib/form-components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        OcActivationComponent,
        OcResendActivationComponent,
        OcResetPasswordComponent,
        OcSignupComponent,
        OcLoginComponent,
        OcForgotPasswordComponent,
        OcSignupCustomComponent,
        OcEditUserFormComponent,
    ],
    imports: [CommonModule, FormsModule, RouterModule, OcCommonLibModule, OcFormComponentsModule, ReactiveFormsModule, NgbModule],
    exports: [
        OcActivationComponent,
        OcResendActivationComponent,
        OcResetPasswordComponent,
        OcSignupComponent,
        OcLoginComponent,
        OcForgotPasswordComponent,
        OcSignupCustomComponent,
        OcEditUserFormComponent,
    ],
})
export class OcAuthComponentsModule {}
