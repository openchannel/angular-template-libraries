import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcColorComponent } from './oc-color/oc-color.component';
import { OcDatetimePickerComponent } from './oc-datetime-picker/oc-datetime-picker.component';
import { OcFileUploadComponent } from './oc-file-upload/oc-file-upload.component';
import { OcFormComponent } from './oc-form/oc-form.component';
import { OcMultiSelectListComponent } from './oc-multi-select-list/oc-multi-select-list.component';
import { OcNumberComponent } from './oc-number/oc-number.component';
import { OcRichTextEditorComponent } from './oc-rich-text-editor/oc-rich-text-editor.component';
import { OcTagsComponent } from './oc-tags/oc-tags.component';
import { OcTextareaComponent } from './oc-textarea/oc-textarea.component';
import { OcVideoUrlComponent } from './oc-video-url/oc-video-url.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ColorPickerModule } from 'ngx-color-picker';
import { EditorModule } from '@tinymce/tinymce-angular';
import { OcDynamicFieldArrayComponent } from './oc-dynamic-field-array/oc-dynamic-field-array.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OcTooltipLabelComponent } from './oc-tooltip-label/oc-tooltip-label.component';
import { OcFormModalComponent } from './oc-form-modal/oc-form-modal.component';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { OcDynamicArrayPreviewComponent } from './oc-dynamic-array-preview/oc-dynamic-array-preview.component';
import { OcMultiSelectCheckboxListComponent } from './oc-multi-select-checkbox-list/oc-multi-select-checkbox-list.component';
import { OcRadioButtonListComponent } from './oc-radio-button-list/oc-radio-button-list.component';

@NgModule({
    declarations: [
        OcColorComponent,
        OcDatetimePickerComponent,
        OcFileUploadComponent,
        OcFormComponent,
        OcMultiSelectListComponent,
        OcNumberComponent,
        OcRichTextEditorComponent,
        OcTagsComponent,
        OcTextareaComponent,
        OcVideoUrlComponent,
        OcDynamicFieldArrayComponent,
        OcTooltipLabelComponent,
        OcFormModalComponent,
        OcDynamicArrayPreviewComponent,
        OcMultiSelectCheckboxListComponent,
        OcRadioButtonListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ImageCropperModule,
        ReactiveFormsModule,
        ColorPickerModule,
        EditorModule,
        OcCommonLibModule,
        NgbModule,
    ],
    exports: [
        OcColorComponent,
        OcDatetimePickerComponent,
        OcFileUploadComponent,
        OcFormComponent,
        OcMultiSelectListComponent,
        OcNumberComponent,
        OcRichTextEditorComponent,
        OcTagsComponent,
        OcTextareaComponent,
        OcVideoUrlComponent,
        OcDynamicFieldArrayComponent,
        OcFormModalComponent,
        OcDynamicArrayPreviewComponent,
        OcTooltipLabelComponent,
        OcMultiSelectCheckboxListComponent,
        OcRadioButtonListComponent,
    ],
})
export class OcFormComponentsModule {}
