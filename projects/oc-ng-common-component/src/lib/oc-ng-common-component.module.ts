import {NgModule} from '@angular/core';
import {OcCommonLibComponent} from './oc-ng-common-component.component';
import {OcButtonComponent} from './oc-button/oc-button.component';
import {OcInputComponent} from './oc-input/oc-input.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {OcLabelComponent} from './oc-label/oc-label.component';
import {OcCheckboxComponent} from './oc-checkbox/oc-checkbox.component';
import {OcRadioComponent} from './oc-radio/oc-radio.component';
import {OcSignupComponent} from './oc-signup/oc-signup.component';
import {OcPasswordComponent} from './oc-password/oc-password.component';
import {OcLoginComponent} from './oc-login/oc-login.component';
import {OcFeaturedAppsComponent} from './oc-featured-apps/oc-featured-apps.component';
import {OcSelectComponent} from './oc-select/oc-select.component';
import {OcBoxGridComponent} from './oc-box-grid/oc-box-grid.component';
import {OcRatingComponent} from './oc-rating/oc-rating.component';
import {OcTextSearhComponent} from './oc-text-searh/oc-text-searh.component';
import {OcForgotPasswordComponent} from './oc-forgot-password/oc-forgot-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OcErrorComponent} from './oc-error/oc-error.component';
import {EmailValidatorDirective} from './validators/email-validator.directive';
import {WhiteSpaceValidatorDirective} from './validators/white-space-validator';
import {OcAppCategoriesComponent} from './oc-app-categories/oc-app-categories.component';
import {AutofocusDirective} from './validators/autofocus.directive';
import {DomainValidatorDirective} from './validators/domain-validator.directive';
import {DragDropDirective} from './validators/drag-drop.directive';
import {FileSizePipe} from './validators/file-size.pipe';
import {ImageFileValidatorDirective} from './validators/image-file-validator.directive';
import {PasswordToggleDirective} from './validators/password-toggle.directive';
import {PhoneNumberValidatorDirective} from './validators/phone-number-validator.directive';
import {WebsiteValidatorDirective} from './validators/website-validator.directive';
import {OcAppGetStartedComponent} from './oc-app-get-started/oc-app-get-started.component';
import {OcChartComponent} from './oc-chart/oc-chart.component';
import {OcMenuGridComponent} from './oc-menu-grid/oc-menu-grid.component';
import {OcAppGalaryComponent} from './oc-app-galary/oc-app-galary.component';
import {OcAppListGridComponent} from './oc-app-list-grid/oc-app-list-grid.component';
import {OcRecommendedAppsComponent} from './oc-recommended-apps/oc-recommended-apps.component';
import {OcOverallRatingComponent} from './oc-overall-rating/oc-overall-rating.component';
import {OcAppCardComponent} from './oc-app-card/oc-app-card.component';
import {OcReviewListComponent} from './oc-review-list/oc-review-list.component';
import {OcSelectExpandableComponent} from './oc-select-expandable/oc-select-expandable.component';
import {OcFileUploadComponent} from './oc-file-upload/oc-file-upload.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {OcAppCategorySelectComponent} from './oc-app-category-select/oc-app-category-select.component';
import {OcPopupComponent} from './oc-popup/oc-popup.component';
import {SafehtmlPipe} from './pipe/safehtml.pipe';
import {RemoveHtmlTagsPipe} from './pipe/remove-html-tags.pipe';
import {CamelcasePipe} from './pipe/camelcase.pipe';
import {EllipsisPipe} from './pipe/ellipsis.pipe';
import {OcActivationComponent} from './oc-activation/oc-activation.component';
import {CompareDirective} from './validators/compare-passsword-validator.directive';
import {OcAppStatusDetailsComponent} from './oc-app-status-details/oc-app-status-details.component';
import {OcTextareaComponent} from './oc-textarea/oc-textarea.component';
import {OcNumberComponent} from './oc-number/oc-number.component';
import {OcSellerAgreementComponent} from './oc-seller-agreement/oc-seller-agreement.component';
import {OcResetPasswordComponent} from './oc-reset-password/oc-reset-password.component';
import {OcRichTextEditorComponent} from './oc-rich-text-editor/oc-rich-text-editor.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {OcTagsComponent} from './oc-tags/oc-tags.component';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import {OcTagElementComponent} from './oc-tag-element/oc-tag-element.component';
import {OcDropboxComponent} from './oc-dropbox/oc-dropbox.component';
import {OcTitleComponent} from './oc-title/oc-title.component';
import {OcFormComponent} from './oc-form/oc-form.component';
import {OnlyNumberDirective} from './directive/only-number.directive';
import { OcVideoUrlComponent } from './oc-video-url/oc-video-url.component';
import {AppIconsModule} from './app-icons.module';
import {OcColorComponent} from './oc-color/oc-color.component';
import {ColorPickerModule} from 'ngx-color-picker';
import { OcDatetimePickerComponent } from './oc-datetime-picker/oc-datetime-picker.component';
import {OcMultiSelectListComponent} from './oc-multi-select-list/oc-multi-select-list.component';
import { RouterModule } from '@angular/router';

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
    OcReviewListComponent,
    OcSelectExpandableComponent,
    OcFileUploadComponent,
    OcAppCategorySelectComponent,
    OcPopupComponent,
    SafehtmlPipe,
    CamelcasePipe,
    EllipsisPipe,
    RemoveHtmlTagsPipe,
    CompareDirective,
    OcAppStatusDetailsComponent,
    OcActivationComponent,
    CompareDirective,
    OcTextareaComponent,
    OcNumberComponent,
    OcSellerAgreementComponent,
    OcResetPasswordComponent,
    OcRichTextEditorComponent,
    OcTagsComponent,
    OcTagElementComponent,
    OcDropboxComponent,
    OcTitleComponent,
    OcRichTextEditorComponent,
    OcFormComponent,
    OnlyNumberDirective,
    OcVideoUrlComponent,
    OcColorComponent,
    OcDatetimePickerComponent,
    OcMultiSelectListComponent,
  ],

  imports: [
    NgbModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ImageCropperModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ReactiveFormsModule,
    AppIconsModule,
    ColorPickerModule,
    RouterModule,
  ],
  exports: [OcCommonLibComponent,
    OcInputComponent,
    OcButtonComponent,
    OcLabelComponent,
    OcCheckboxComponent,
    OcRadioComponent,
    OcSignupComponent,
    OcActivationComponent,
    OcPasswordComponent,
    OcLoginComponent,
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
    CamelcasePipe,
    EllipsisPipe,
    ImageFileValidatorDirective,
    PasswordToggleDirective,
    PhoneNumberValidatorDirective,
    WebsiteValidatorDirective,
    OcChartComponent,
    OcMenuGridComponent,
    OcAppGetStartedComponent,
    OcAppGalaryComponent,
    OcSelectExpandableComponent,
    OcFileUploadComponent,
    OcAppListGridComponent,
    OcAppCategorySelectComponent,
    OcPopupComponent,
    NgbModule,
    CompareDirective,
    OcAppStatusDetailsComponent,
    OcTextareaComponent,
    OcNumberComponent,
    OcSellerAgreementComponent,
    OcResetPasswordComponent,
    OcRichTextEditorComponent,
    OcDropboxComponent,
    OcTitleComponent,
    OcTagElementComponent,
    OcFormComponent,
    OcTagsComponent,
    OcColorComponent,
    OcVideoUrlComponent,
    OcMultiSelectListComponent
  ],
  providers: [
    NgbActiveModal,
  ],
  entryComponents: [
    OcSellerAgreementComponent
  ]

})
export class OcCommonLibModule {
}
