import { moduleMetadata } from '@storybook/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ColorPickerModule } from 'ngx-color-picker';
import {
    FileDetails,
    FileUploaderService,
    OcColorComponent,
    OcDatetimePickerComponent,
    OcDynamicArrayPreviewComponent,
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
} from '@openchannel/angular-common-components/src/lib/form-components';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { Observable, of } from 'rxjs';
import { HttpResponse, HttpUploadProgressEvent } from '@angular/common/http';
import { ERROR_MESSAGES_STORY_PROVIDER } from './utils.model';

class FileService extends FileUploaderService {
    fileDetailsRequest(fileId: string): Observable<FileDetails> {
        return of();
    }

    fileUploadRequest(
        file: FormData,
        isPrivate: boolean,
        hash?: string[],
    ): Observable<HttpResponse<FileDetails> | HttpUploadProgressEvent> {
        return undefined;
    }
}

/**
 * List of module dependencies and component declarations.
 * Stored as separate var because they are shared among all stories
 */
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
        ColorPickerModule,
        FormsModule,
    ],
    declarations: [
        OcFormComponent,
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
        OcDynamicArrayPreviewComponent,
    ],
    providers: [{ provide: FileUploaderService, useClass: FileService }, ERROR_MESSAGES_STORY_PROVIDER],
};

export default {
    title: 'Dynamic Fields Array [BEM]',
    component: OcDynamicFieldArrayComponent,
    decorators: [moduleMetadata(modules)],
};

const DynamicFieldsArrayComponent = (args: OcDynamicFieldArrayComponent) => ({
    component: OcDynamicFieldArrayComponent,
    moduleMetadata: modules,
    props: args,
});

export const DynamicFieldsArrayComponentAppendOrdering = DynamicFieldsArrayComponent.bind({});

DynamicFieldsArrayComponentAppendOrdering.args = {
    fieldDefinitionData: {
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
    dfaFormArray: new FormArray([]),
};

export const DynamicFieldsArrayComponentPrependOrdering = DynamicFieldsArrayComponent.bind({});

DynamicFieldsArrayComponentPrependOrdering.args = {
    fieldDefinitionData: {
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
    dfaFormArray: new FormArray([]),
};
