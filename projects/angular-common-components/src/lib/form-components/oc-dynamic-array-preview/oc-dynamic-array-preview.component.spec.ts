import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OcDynamicArrayPreviewComponent } from './oc-dynamic-array-preview.component';
import { FormGroup } from '@angular/forms';
import { AppTypeFieldModel, HtmlTagsReplacerPipe, SafePipe } from '@openchannel/angular-common-components/src/lib/common-components';
import { FieldValueModel } from '../model/dynamic-array.model';
import { MockDynamicFieldArrayComponent, MockLabelComponent, MockTagComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { FileDetails, FileUploaderService, OcFormGenerator } from '@openchannel/angular-common-components/src/lib/form-components';
import { Observable, of } from 'rxjs';
import { HttpResponse, HttpUploadProgressEvent } from '@angular/common/http';

describe('OcDynamicArrayPreviewComponent', () => {
    let component: OcDynamicArrayPreviewComponent;
    let fixture: ComponentFixture<OcDynamicArrayPreviewComponent>;

    const TEXT_ID = 'text';
    const RICH_TEXT_ID = 'richText';
    const TAGS_ID = 'tags';
    const MULTI_IMAGE_ID = 'multiImage';
    const DYNAMIC_FIELD_ARRAY_ID = 'dynamicFieldArray';

    const RICH_TEXT_VALUE = '<p><span style="text-decoration: line-through;"><em>a<strong>b</strong></em></span></p>';

    const fieldDefinition: AppTypeFieldModel = {
        id: 'testId',
        label: 'testLabel',
        type: 'testType',
        fields: [
            {
                id: TEXT_ID,
                type: 'text',
                label: 'textLabel',
                attributes: {},
            },
            {
                id: MULTI_IMAGE_ID,
                type: 'multiImage',
                label: 'multiImageLabel',
                attributes: {},
            },
            {
                id: TAGS_ID,
                type: 'tags',
                label: 'tagsLabel',
                attributes: {},
            },
            {
                id: RICH_TEXT_ID,
                type: 'richText',
                label: 'richTextLabel',
                attributes: {},
            },
            {
                id: DYNAMIC_FIELD_ARRAY_ID,
                type: 'dynamicFieldArray',
                label: 'dynamicFieldArrayLabel',
                fields: [
                    {
                        id: 'dfaText',
                        type: 'text',
                        label: 'dfaTextLabel',
                    },
                ],
                attributes: {},
            },
        ],
    };

    const fieldDefinitionWithEmptyFields = {
        id: 'testId',
        label: 'testLabel',
        type: 'testType',
        fields: null,
    };

    const fieldValues: FieldValueModel[] = [
        {
            fieldId: TEXT_ID,
            fieldValue: 'textValue',
        },
        {
            fieldId: RICH_TEXT_ID,
            fieldValue: RICH_TEXT_VALUE,
        },
        {
            fieldId: TAGS_ID,
            fieldValue: ['1', '2', '3'],
        },
        {
            fieldId: MULTI_IMAGE_ID,
            fieldValue: ['url1', 'url2'],
        },
        {
            fieldId: DYNAMIC_FIELD_ARRAY_ID,
            fieldValue: [
                {
                    textId: 'textFirst',
                },
                {
                    textId: 'textSecond',
                },
            ],
        },
    ];

    const mockResponse: FileDetails = {
        uploadDate: 214213,
        fileId: 'fileId',
        name: 'test1.jpg',
        contentType: 'type',
        size: 123123,
        isPrivate: false,
        mimeCheck: 'mimeCheck',
        fileUrl: 'http://file-url.com',
        isError: false,
        fileUploadProgress: 100,
        virusScan: true,
        fileIconUrl: '',
    };

    class FileService extends FileUploaderService {
        fileDetailsRequest(fileId: string): Observable<FileDetails> {
            return of(mockResponse);
        }

        fileUploadRequest(
            file: FormData,
            isPrivate: boolean,
            hash?: string[],
        ): Observable<HttpResponse<FileDetails> | HttpUploadProgressEvent> {
            return undefined;
        }
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                OcDynamicArrayPreviewComponent,
                MockLabelComponent,
                MockTagComponent,
                MockDynamicFieldArrayComponent,
                SafePipe,
                HtmlTagsReplacerPipe,
            ],
            providers: [{ provide: FileUploaderService, useClass: FileService }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OcDynamicArrayPreviewComponent);
        component = fixture.componentInstance;
        component.fieldDefinition = fieldDefinition;
        component.fieldValues = fieldValues;
        component.dfaForm = new FormGroup(OcFormGenerator.getFormByConfig(fieldDefinition.fields));
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('text preview', () => {
        fixture.detectChanges();
        const htmlElement = fixture.debugElement.query(By.css(`#${TEXT_ID}`)).nativeElement as HTMLElement;
        expect(htmlElement.textContent).toEqual('textValue');
    });

    it('tags preview', () => {
        fixture.detectChanges();
        const tagsHtmlContainer = fixture.debugElement.query(By.css(`#${TAGS_ID}`)).nativeElement as HTMLElement;
        const tags = tagsHtmlContainer.querySelectorAll('.array-preview__field-content__tags-item');
        expect(tags.length).toEqual(3);
    });

    it('multi images preview', () => {
        fixture.detectChanges();
        const imagesHtmlContainer = fixture.debugElement.query(By.css(`#${MULTI_IMAGE_ID}`)).nativeElement as HTMLElement;
        const images = imagesHtmlContainer.querySelectorAll('.array-preview__field-content__image-multi-item');
        expect(images.length).toEqual(2);
    });

    it('rich text preview', () => {
        fixture.detectChanges();
        const richTextContainer = fixture.debugElement.query(By.css(`#${RICH_TEXT_ID}`)).nativeElement as HTMLElement;
        expect(richTextContainer.children[0].innerHTML).toEqual(RICH_TEXT_VALUE);
    });

    it('field orders', () => {
        fixture.detectChanges();
        const htmlFields = fixture.debugElement.queryAll(By.css(`.array-preview__field-content`));
        for (let i = 0; i < fieldDefinition.fields.length; i++) {
            expect(fieldDefinition.fields[i].id).toEqual(htmlFields[i].properties.id);
        }
    });

    it('inject form array into DFA field', () => {
        fixture.detectChanges();
        const dfaPreviewField = component.previewFields.find(field => field.id === DYNAMIC_FIELD_ARRAY_ID);
        expect(dfaPreviewField.formArrayDFA).not.toBeNull();
        expect(dfaPreviewField.formArrayDFA).not.toBeUndefined();
    });

    it('should show empty array', () => {
        component.fieldDefinition = fieldDefinitionWithEmptyFields;
        fixture.detectChanges();
        expect(component.previewFields.length).toEqual(0);
    });
});
