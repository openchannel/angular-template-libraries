import {
  OcColorComponent,
  OcCommonLibModule,
  OcDatetimePickerComponent,
  OcDynamicArrayItemComponent,
  OcDynamicFieldArrayComponent,
  OcFileUploadComponent,
  OcFormComponent,
  OcMultiSelectListComponent,
  OcNumberComponent,
  OcRichTextEditorComponent,
  OcTagsComponent,
  OcTextareaComponent,
  OcTooltipLabelComponent,
  OcVideoUrlComponent,
} from 'oc-ng-common-component';
import {moduleMetadata} from '@storybook/angular';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormArray, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EditorModule} from '@tinymce/tinymce-angular';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ColorPickerModule} from 'ngx-color-picker';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [
    OcCommonLibModule,
    AngularSvgIconModule.forRoot(),
    HttpClientTestingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgbModule,
    EditorModule,
    ImageCropperModule,
    ColorPickerModule
  ],
  declarations: [
    OcFormComponent,
    OcDynamicArrayItemComponent,
    OcTooltipLabelComponent,
    OcRichTextEditorComponent,
    OcTextareaComponent,
    OcTagsComponent,
    OcFileUploadComponent,
    OcNumberComponent,
    OcColorComponent,
    OcVideoUrlComponent,
    OcDatetimePickerComponent,
    OcMultiSelectListComponent,
  ],
};

export default {
  title: 'Dynamic Fields Array [BEM]',
  component: OcDynamicFieldArrayComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const DynamicFieldsArrayComponent = (args: OcDynamicFieldArrayComponent) => ({
  component: OcDynamicFieldArrayComponent,
  moduleMetadata: modules,
  props: args,
});

export const DynamicFieldsArrayComponentAppendOrdering = DynamicFieldsArrayComponent.bind({});

DynamicFieldsArrayComponentAppendOrdering.args = {
  fieldDefinition: {
    attributes: {
      maxCount: null,
      minCount: null,
      ordering: 'append',
      required: null,
      rowLabel: 'field1',
    },
    required: null,
    rowLabel: null,
    category: 'CUSTOM',
    defaultValue: null,
    description: '',
    id: 'test-dynamic-field-array',
    isOpen: false,
    isValid: true,
    label: 'Test Dynamic field array',
    placeholder: null,
    fields: [
      {
        attributes: {
          maxChars: null,
          minChars: null,
          required: null,
        },
        category: 'CUSTOM',
        defaultValue: null,
        description: 'some description',
        id: 'field1',
        isOpen: false,
        isValid: true,
        label: 'field1',
        placeholder: 'write some text',
        type: 'text',
      },
      {
        id: 'long-text-example',
        label: 'Long Text Example',
        type: 'longText',
        placeholder: 'Write your text here...',
        category: 'CUSTOM',
        defaultValue: null,
        attributes: {
          maxChars: 200,
          required: null,
          minChars: 2,
        },
      },
    ],
    type: 'dynamicFieldArray',
  },
  maxCount: 3,
  required: true,
  dfaFormArray: new FormArray([])
};

export const DynamicFieldsArrayComponentPrependOrdering = DynamicFieldsArrayComponent.bind({});

DynamicFieldsArrayComponentPrependOrdering.args = {
  fieldDefinition: {
    attributes: {
      maxCount: null,
      minCount: null,
      ordering: 'prepend',
      required: null,
      rowLabel: 'field1',
    },
    required: null,
    rowLabel: null,
    category: 'CUSTOM',
    defaultValue: null,
    description: '',
    id: 'test-dynamic-field-array',
    isOpen: false,
    isValid: true,
    label: 'Test Dynamic field array',
    placeholder: null,
    fields: [
      {
        attributes: {
          maxChars: null,
          minChars: null,
          required: null,
        },
        category: 'CUSTOM',
        defaultValue: null,
        description: 'some description',
        id: 'field1',
        isOpen: false,
        isValid: true,
        label: 'field1',
        placeholder: 'write some text',
        type: 'text',
      },
      {
        id: 'long-text-example',
        label: 'Long Text Example',
        type: 'longText',
        placeholder: 'Write your text here...',
        category: 'CUSTOM',
        defaultValue: null,
        attributes: {
          maxChars: 200,
          required: null,
          minChars: 2,
        },
      },
    ],
    type: 'dynamicFieldArray',
  },
  maxCount: 3,
  required: true,
  dfaFormArray: new FormArray([])
};
