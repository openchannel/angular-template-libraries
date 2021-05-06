import {NgModule} from '@angular/core';
import {OcButtonComponent} from './oc-button/oc-button.component';
import {OcInputComponent} from './oc-input/oc-input.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {OcLabelComponent} from './oc-label/oc-label.component';
import {OcCheckboxComponent} from './oc-checkbox/oc-checkbox.component';
import {OcPasswordComponent} from './oc-password/oc-password.component';
import {OcSelectComponent} from './oc-select/oc-select.component';
import {OcErrorComponent} from './oc-error/oc-error.component';
import {EmailValidatorDirective} from './validators/email-validator.directive';
import {WhiteSpaceValidatorDirective} from './validators/white-space-validator';
import {DragDropDirective} from './validators/drag-drop.directive';
import {PasswordToggleDirective} from './directive/password-toggle.directive';
import {OcSelectExpandableComponent} from './oc-select-expandable/oc-select-expandable.component';
import {CamelcasePipe} from './pipe/camelcase.pipe';
import {EllipsisPipe} from './pipe/ellipsis.pipe';
import {OcTagElementComponent} from './oc-tag-element/oc-tag-element.component';
import {OcDropboxComponent} from './oc-dropbox/oc-dropbox.component';
import {OcTitleComponent} from './oc-title/oc-title.component';
import {OnlyNumberDirective} from './directive/only-number.directive';
import {PricePipe} from './pipe/price.pipe';
import {RouterModule} from '@angular/router';
import {OcDropdownComponent} from './oc-dropdown/oc-dropdown.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {OcDropdownButtonComponent} from './oc-dropdown-button/oc-dropdown-button.component';
import {EmbedVideo} from 'ngx-embed-video';
import {PasswordValidatorDirective} from './validators/password-validator.directive';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';
import {OcSidebarComponent} from './oc-sidebar/oc-sidebar.component';
import {OcConfirmationModalComponent} from './oc-confirmation-modal/oc-confirmation-modal.component';
import {OcProfileNavbarComponent} from './oc-profile-navbar/oc-profile-navbar.component';
import {FormsModule} from '@angular/forms';
import {OcVideoComponent} from './oc-video/oc-video.component';
import {CheckboxRequiredDirective} from './validators/checkbox-required.directive';
import {HtmlTagsReplacerPipe} from './pipe/html-tags-replacer.pipe';
import {EllipsisDirective} from './directive/ellipsis.directive';
import {OcSocialLinksComponent} from "oc-ng-common-component/src/lib/common-components/oc-social-links/oc-social-links.component";

@NgModule({
    declarations: [
        OcInputComponent,
        OcButtonComponent,
        OcLabelComponent,
        OcCheckboxComponent,
        OcPasswordComponent,
        EmailValidatorDirective,
        OcSelectComponent,
        WhiteSpaceValidatorDirective,
        OcErrorComponent,
        DragDropDirective,
        PasswordValidatorDirective,
        PasswordToggleDirective,
        OcSelectExpandableComponent,
        OcDropdownComponent,
        OcDropdownButtonComponent,
        CamelcasePipe,
        EllipsisPipe,
        PricePipe,
        OcTagElementComponent,
        OcDropboxComponent,
        OcTitleComponent,
        OnlyNumberDirective,
        OcSidebarComponent,
        OcConfirmationModalComponent,
        OcProfileNavbarComponent,
        OcVideoComponent,
        OcSocialLinksComponent,
        CheckboxRequiredDirective,
        HtmlTagsReplacerPipe,
        EllipsisDirective
    ],
    imports: [
        NgbModule,
        CommonModule,
        FormsModule,
        RouterModule,
        InfiniteScrollModule,
        NgxSpinnerModule,
        HttpClientModule,
        EmbedVideo.forRoot(),
        AngularSvgIconModule.forRoot(),
    ],
    exports: [
        OcInputComponent,
        OcButtonComponent,
        OcLabelComponent,
        OcCheckboxComponent,
        OcPasswordComponent,
        EmailValidatorDirective,
        WhiteSpaceValidatorDirective,
        OcSelectComponent,
        OcErrorComponent,
        DragDropDirective,
        CamelcasePipe,
        EllipsisPipe,
        PricePipe,
        PasswordValidatorDirective,
        OcSocialLinksComponent,
        PasswordToggleDirective,
        OcSelectExpandableComponent,
        OcDropdownComponent,
        OcDropdownButtonComponent,
        OcDropboxComponent,
        OcTitleComponent,
        OcTagElementComponent,
        OcSidebarComponent,
        OcConfirmationModalComponent,
        OcProfileNavbarComponent,
        OcVideoComponent,
        AngularSvgIconModule,
        CheckboxRequiredDirective,
        HtmlTagsReplacerPipe,
        EllipsisDirective
    ],
    providers: [
        NgbActiveModal,
    ],
})
export class OcCommonLibModule {
}
