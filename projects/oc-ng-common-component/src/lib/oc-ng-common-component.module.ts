import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OcCommonLibComponent } from './oc-ng-common-component.component';
import { OcButtonComponent } from './oc-button/oc-button.component';
import { OcInputComponent } from './oc-input/oc-input.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OcLabelComponent } from './oc-label/oc-label.component';
import { OcCheckboxComponent } from './oc-checkbox/oc-checkbox.component';
import { OcRadioComponent } from './oc-radio/oc-radio.component';
import { OcSignupComponent } from './oc-signup/oc-signup.component';
import { OcPasswordComponent } from './oc-password/oc-password.component';
import { OcLoginComponent } from './oc-login/oc-login.component';
import { OcFeaturedAppsComponent } from './oc-featured-apps/oc-featured-apps.component';
import { OcSelectComponent } from './oc-select/oc-select.component';
import { OcBoxGridComponent } from './oc-box-grid/oc-box-grid.component';
import { OcRatingComponent } from './oc-rating/oc-rating.component';
import { OcTextSearhComponent } from './oc-text-searh/oc-text-searh.component';
import { OcForgotPasswordComponent } from './oc-forgot-password/oc-forgot-password.component';
import { FormsModule } from '@angular/forms';
import { OcErrorComponent } from './oc-error/oc-error.component';
import { OcCommonServiceModule } from 'oc-ng-common-service';
import { EmailValidatorDirective } from './validators/email-validator.directive';
import { WhiteSpaceValidatorDirective } from './validators/white-space-validator';
import { OcAppCategoriesComponent } from './oc-app-categories/oc-app-categories.component';
import { AutofocusDirective } from './validators/autofocus.directive';
import { DomainValidatorDirective } from './validators/domain-validator.directive';
import { DragDropDirective } from './validators/drag-drop.directive';
import { FileSizePipe } from './validators/file-size.pipe';
import { ImageFileValidatorDirective } from './validators/image-file-validator.directive';
import { PasswordToggleDirective } from './validators/password-toggle.directive';
import { PhoneNumberValidatorDirective } from './validators/phone-number-validator.directive';
import { WebsiteValidatorDirective } from './validators/website-validator.directive';
import { OcAppGetStartedComponent } from './oc-app-get-started/oc-app-get-started.component';
import { OcChartComponent } from './oc-chart/oc-chart.component';
import { OcMenuGridComponent } from './oc-menu-grid/oc-menu-grid.component';
import { OcAppGalaryComponent } from './oc-app-galary/oc-app-galary.component';
import { OcAppListGridComponent } from './oc-app-list-grid/oc-app-list-grid.component';
import { OcRecommendedAppsComponent } from './oc-recommended-apps/oc-recommended-apps.component';
import { OcOverallRatingComponent } from './oc-overall-rating/oc-overall-rating.component';
import { OcAppCardComponent } from './oc-app-card/oc-app-card.component';
import { OcDialogComponent } from './oc-dialog/oc-dialog.component';
import { OcReviewListComponent } from './oc-review-list/oc-review-list.component';
import { OcSelectExpandableComponent } from './oc-select-expandable/oc-select-expandable.component';
import { OcFileUploadComponent } from './oc-file-upload/oc-file-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OcAppCategorySelectComponent } from './oc-app-category-select/oc-app-category-select.component';
import { OcPopupComponent } from './oc-popup/oc-popup.component';
import { SafehtmlPipe } from './safehtml.pipe';

@NgModule({
  declarations: [OcCommonLibComponent,
    OcInputComponent,
    OcButtonComponent,
    OcLabelComponent,
    OcCheckboxComponent,
    OcRadioComponent,
    OcSignupComponent,
    OcPasswordComponent,
    OcLoginComponent,
    EmailValidatorDirective,
    OcFeaturedAppsComponent,
    OcSelectComponent,
    OcBoxGridComponent,
    OcRatingComponent,
    OcTextSearhComponent,
    OcAppCategoriesComponent,
    OcForgotPasswordComponent,
    WhiteSpaceValidatorDirective,
    OcErrorComponent,
    AutofocusDirective,
    DomainValidatorDirective,
    DragDropDirective,
    FileSizePipe,
    ImageFileValidatorDirective,
    PasswordToggleDirective,
    PhoneNumberValidatorDirective,
    WebsiteValidatorDirective,
    OcChartComponent,
    OcMenuGridComponent,
    OcAppGetStartedComponent,
    OcAppGalaryComponent,
    OcAppListGridComponent,
    OcRecommendedAppsComponent,
    OcOverallRatingComponent,
    OcAppCardComponent,
    OcDialogComponent,
    OcReviewListComponent,
    OcSelectExpandableComponent,
    OcFileUploadComponent,
    OcAppCategorySelectComponent,
    OcPopupComponent,
    SafehtmlPipe
  ],

  imports: [NgbModule, CommonModule, BrowserModule, FormsModule, OcCommonServiceModule,ImageCropperModule],
  exports: [OcCommonLibComponent,
    OcInputComponent,
    OcButtonComponent,
    OcLabelComponent,
    OcCheckboxComponent,
    OcRadioComponent,
    OcSignupComponent,
    OcPasswordComponent
    , OcLoginComponent,
    EmailValidatorDirective,
    WhiteSpaceValidatorDirective,
    OcFeaturedAppsComponent,
    OcSelectComponent,
    OcBoxGridComponent,
    OcRatingComponent,
    OcTextSearhComponent,
    OcAppCategoriesComponent,
    OcForgotPasswordComponent,
    OcErrorComponent,
    AutofocusDirective,
    DomainValidatorDirective,
    DragDropDirective,
    FileSizePipe,
    ImageFileValidatorDirective,
    PasswordToggleDirective,
    PhoneNumberValidatorDirective,
    WebsiteValidatorDirective,
    OcChartComponent,
    OcMenuGridComponent,
    OcAppGetStartedComponent,
    OcAppGalaryComponent,
    OcDialogComponent,
    OcSelectExpandableComponent,
    OcFileUploadComponent,
    OcAppListGridComponent,
    OcAppCategorySelectComponent,
    OcPopupComponent,
    NgbModule
  ],
  providers: [
    NgbActiveModal,
  ]
})
export class OcCommonLibModule { }
