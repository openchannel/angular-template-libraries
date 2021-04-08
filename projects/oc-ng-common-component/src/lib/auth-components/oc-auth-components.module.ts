import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcActivationComponent } from './oc-activation/oc-activation.component';
import { OcResendActivationComponent } from './oc-resend-activation/oc-resend-activation.component';
import { OcResetPasswordComponent } from './oc-reset-password/oc-reset-password.component';
import { OcForgotPasswordComponent } from './oc-forgot-password/oc-forgot-password.component';
import { OcSignupComponent } from './oc-signup/oc-signup.component';
import { OcLoginComponent } from './oc-login/oc-login.component';
import { OcCommonLibModule } from 'oc-ng-common-component/src/lib/common-components';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    OcActivationComponent,
    OcResendActivationComponent,
    OcResetPasswordComponent,
    OcSignupComponent,
    OcLoginComponent,
    OcForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    OcCommonLibModule,
  ],
  exports: [
    OcActivationComponent,
    OcResendActivationComponent,
    OcResetPasswordComponent,
    OcSignupComponent,
    OcLoginComponent,
    OcForgotPasswordComponent,
  ],
})
export class OcAuthComponentsModule {
}
