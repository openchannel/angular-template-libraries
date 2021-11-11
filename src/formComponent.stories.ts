import {
    FileDetails,
    OcFormComponent,
    OcFormComponentsModule,
    FileUploaderService,
} from '@openchannel/angular-common-components/src/lib/form-components';
import { moduleMetadata } from '@storybook/angular';
import { Observable, of } from 'rxjs';
import { EmbedVideoService } from 'ngx-embed-video';
import { HttpClientModule, HttpResponse, HttpUploadProgressEvent } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { storyMockProviderAppSearchService } from 'src/dropdown-multi-app.stories';
import { ERROR_MESSAGES_STORY_PROVIDER } from './utils.model';

class StubFileUploadDownloadService extends FileUploaderService {
    videoData: FileDetails = {
        uploadDate: 214213,
        fileId: 'fileId',
        name: 'test1.jpg',
        contentType: 'type',
        size: 123123,
        isPrivate: false,
        mimeCheck: 'PASSED',
        fileUrl: 'https://youtu.be/DGQwd1_dpuc',
        isError: false,
        fileUploadProgress: 100,
        virusScan: {
            started: 1457710762784,
            finished: 1457710769567,
            status: 'CLEAN',
            foundViruses: [],
        },
        fileIconUrl: '',
    };

    constructor() {
        super();
    }

    fileUploadRequest(
        file: FormData,
        isPrivate: boolean,
        hash?: string[],
    ): Observable<HttpResponse<FileDetails> | HttpUploadProgressEvent> {
        return of(new HttpResponse({ body: this.videoData }));
    }

    fileDetailsRequest(fileId: string): Observable<FileDetails> {
        return of(this.videoData);
    }
}

class FileServiceStub extends FileUploaderService {
    constructor() {
        super();
    }

    fileUploadRequest(file: FormData, isPrivate: boolean, hash?: string[]): Observable<any> {
        return new Observable();
    }

    fileDetailsRequest(fileId: string): Observable<any> {
        return new Observable();
    }
}

const modules = {
    imports: [OcFormComponentsModule, HttpClientModule, BrowserAnimationsModule],
    providers: [
        EmbedVideoService,
        storyMockProviderAppSearchService,
        { provide: FileUploaderService, useClass: StubFileUploadDownloadService },
        { provide: FileUploaderService, useClass: FileServiceStub },
        ERROR_MESSAGES_STORY_PROVIDER,
    ],
};

export default {
    title: 'Form Group Component [BEM]',
    component: OcFormComponent,
    decorators: [moduleMetadata(modules)],
    argTypes: { formSubmitted: { action: 'Form Data' }, formDataUpdated: { action: 'Form Data Updates' } },
};

const FormGroupComponent = (args: OcFormComponent) => ({
    component: OcFormComponent,
    moduleMetadata: modules,
    props: args,
});

export const FormWithTestData = FormGroupComponent.bind({});

FormWithTestData.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                id: 'name',
                label: 'name',
                description: 'test',
                defaultValue: null,
                type: 'text',
                required: null,
                attributes: {
                    maxChars: 20,
                    required: true,
                    minChars: 10,
                },
                options: null,
                fields: null,
            },
            {
                id: 'role',
                label: 'role',
                description: '',
                defaultValue: 'user',
                type: 'dropdownList',
                required: null,
                attributes: { required: true },
                options: ['admin', 'user', 'test'],
                fields: null,
            },
            {
                id: 'aboutme',
                label: 'aboutme',
                description: '',
                defaultValue: null,
                type: 'richText',
                required: null,
                attributes: {
                    maxChars: 150,
                    required: null,
                    minChars: 10,
                },
                options: null,
                fields: null,
            },
            {
                id: 'skills',
                label: 'skills',
                description: 'skills',
                defaultValue: ['angular'],
                type: 'tags',
                required: null,
                attributes: {
                    minCount: 1,
                    maxCount: 5,
                    required: true,
                },
                options: ['angular', 'react', 'react native', 'spring'],
                fields: null,
            },
        ],
    },
};

export const FormWithRequiredOnly = FormGroupComponent.bind({});

FormWithRequiredOnly.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                id: 'name',
                label: 'name',
                description: 'test',
                defaultValue: null,
                type: 'text',
                required: null,
                attributes: {
                    maxChars: null,
                    required: true,
                    minChars: null,
                },
                options: null,
                fields: null,
            },
            {
                id: 'role',
                label: 'role',
                description: '',
                defaultValue: null,
                type: 'dropdownList',
                required: null,
                attributes: { required: true },
                options: ['admin', 'user', 'test'],
                fields: null,
            },
            {
                id: 'aboutme',
                label: 'aboutme',
                description: '',
                defaultValue: null,
                type: 'richText',
                required: null,
                attributes: {
                    maxChars: null,
                    required: null,
                    minChars: null,
                },
                options: null,
                fields: null,
            },
            {
                id: 'skills',
                label: 'skills',
                description: 'skills',
                defaultValue: ['angular'],
                type: 'tags',
                required: null,
                attributes: {
                    minCount: null,
                    maxCount: null,
                    required: true,
                },
                options: null,
                fields: null,
            },
        ],
    },
    showButton: false,
};

export const FormWithNumberInput = FormGroupComponent.bind({});

FormWithNumberInput.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    max: 25,
                    min: 5,
                    required: null,
                },
                category: 'CUSTOM',
                defaultValue: null,
                description: '',
                id: 'test-number',
                isOpen: false,
                isValid: true,
                label: 'Test number',
                placeholder: null,
                type: 'number',
            },
        ],
    },
};

export const FormWithCheckboxComponent = FormGroupComponent.bind({});

FormWithCheckboxComponent.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    required: true,
                },
                category: 'CUSTOM',
                defaultValue: true,
                description: 'Terms of service',
                id: 'test-checkbox',
                isOpen: false,
                isValid: true,
                label: 'Test Checkbox',
                placeholder: null,
                type: 'checkbox',
            },
        ],
    },
};

export const FormWithEmailComponent = FormGroupComponent.bind({});

FormWithEmailComponent.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    required: true,
                },
                category: 'CUSTOM',
                defaultValue: null,
                description: '',
                id: 'test-email',
                isOpen: false,
                isValid: true,
                deleteable: false,
                label: 'Test email',
                placeholder: 'enter email',
                type: 'emailAddress',
            },
        ],
    },
};

export const FormWithUrlComponent = FormGroupComponent.bind({});

FormWithUrlComponent.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    required: true,
                },
                category: 'CUSTOM',
                defaultValue: null,
                description: null,
                id: 'test-url-component',
                isOpen: false,
                isValid: true,
                deleteable: false,
                label: 'Test URL component',
                placeholder: 'Enter your link here..',
                type: 'websiteUrl',
            },
        ],
    },
};

export const FormWithColorComponent = FormGroupComponent.bind({});

FormWithColorComponent.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    required: true,
                },
                category: 'CUSTOM',
                defaultValue: null,
                description: null,
                id: 'test-color-component',
                isOpen: false,
                isValid: true,
                deleteable: false,
                label: 'Test Color Component',
                placeholder: 'Choose your color',
                type: 'color',
            },
        ],
    },
};

export const FormWithBooleanTags = FormGroupComponent.bind({});

FormWithBooleanTags.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    required: true,
                    maxCount: null,
                    minCount: null,
                },
                options: ['true', 'false'],
                category: 'CUSTOM',
                defaultValue: null,
                description: null,
                id: 'test-boolean-tags',
                isOpen: false,
                isValid: true,
                deleteable: false,
                label: 'Test Boolean tags',
                placeholder: null,
                type: 'booleanTags',
            },
        ],
    },
};

export const FormWithNumberTags = FormGroupComponent.bind({});

FormWithNumberTags.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    required: true,
                    maxCount: 2,
                    minCount: 1,
                },
                options: ['1', '3', '45'],
                category: 'CUSTOM',
                defaultValue: [],
                description: null,
                id: 'test-number-tags',
                isOpen: false,
                isValid: true,
                deleteable: false,
                label: 'Test number tags',
                placeholder: null,
                type: 'numberTags',
            },
        ],
    },
};

export const FormWithDateAndDateTime = FormGroupComponent.bind({});

FormWithDateAndDateTime.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    required: true,
                },
                category: 'CUSTOM',
                defaultValue: null,
                description: null,
                id: 'test-date-picker',
                isOpen: false,
                isValid: true,
                deleteable: false,
                label: 'Test Date picker',
                placeholder: null,
                type: 'date',
            },
            {
                attributes: {
                    required: true,
                },
                category: 'CUSTOM',
                defaultValue: 1602489693553,
                description: null,
                id: 'test-datetime-picker',
                isOpen: false,
                isValid: true,
                deleteable: false,
                label: 'Test date-time picker',
                placeholder: null,
                type: 'datetime',
            },
        ],
    },
};

export const FormWithVideoUrlComponent = FormGroupComponent.bind({});

FormWithVideoUrlComponent.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    required: true,
                },
                category: 'CUSTOM',
                defaultValue: 'https://www.youtube.com/watch?v=DGQwd1_dpuc',
                description: null,
                id: 'test-video-url-comp',
                isOpen: false,
                isValid: true,
                deleteable: false,
                label: 'Test videoUrl component',
                placeholder: null,
                type: 'videoUrl',
            },
        ],
    },
};

export const FormWithMultiSelect = FormGroupComponent.bind({});

FormWithMultiSelect.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    required: true,
                    maxCount: 3,
                    minCount: 2,
                },
                options: ['One', 'Two', 'Three', 'Five'],
                category: 'CUSTOM',
                defaultValue: [],
                description: null,
                id: 'multi-select-test',
                isOpen: false,
                isValid: true,
                deleteable: false,
                label: 'Multi Select test',
                placeholder: null,
                type: 'multiselectList',
            },
        ],
    },
};

export const FormWithMultiAppDropdown = FormGroupComponent.bind({});

FormWithMultiAppDropdown.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    required: true,
                    maxCount: 3,
                    minCount: 2,
                },
                options: ['601ab171d0c0c60baf65433e', '601ab170d0c0c60baf654326'],
                category: 'CUSTOM',
                defaultValue: [],
                description: null,
                id: 'multi-app-dropdown',
                isOpen: false,
                isValid: true,
                deleteable: false,
                label: 'Multi App Dropdown',
                placeholder: null,
                type: 'multiApp',
            },
        ],
    },
};

export const FormWithMultiCheckboxes = FormGroupComponent.bind({});

FormWithMultiCheckboxes.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    subType: 'checkbox',
                    required: true,
                    maxCount: 3,
                    minCount: 2,
                },
                options: ['aaa', 'bb'],
                category: 'CUSTOM',
                defaultValue: [],
                description: null,
                id: 'multi-checkbox',
                isOpen: false,
                isValid: true,
                deleteable: false,
                label: 'Multi checkboxes',
                placeholder: null,
                type: 'multiselectList',
            },
        ],
    },
};

export const FormWithDynamicFieldArray = FormGroupComponent.bind({});

FormWithDynamicFieldArray.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    maxCount: 3,
                    minCount: 1,
                    ordering: 'append',
                    required: true,
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
        ],
    },
    showButton: true,
    buttonPosition: 'left',
};

export const FormWithDynamicFieldArraySecondLvl = FormGroupComponent.bind({});

FormWithDynamicFieldArraySecondLvl.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
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
                    {
                        attributes: {
                            maxCount: null,
                            minCount: null,
                            ordering: 'prepend',
                            required: null,
                            rowLabel: null,
                        },
                        required: null,
                        rowLabel: null,
                        category: 'CUSTOM',
                        defaultValue: null,
                        description: '',
                        id: 'test-dynamic-field-array-2',
                        isOpen: false,
                        isValid: true,
                        label: 'Test Dynamic field array 2',
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
                        ],
                        type: 'dynamicFieldArray',
                    },
                ],
                type: 'dynamicFieldArray',
            },
        ],
    },
};

export const FormWithDynamicFieldArrayThirdLvl = FormGroupComponent.bind({});

FormWithDynamicFieldArrayThirdLvl.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                attributes: {
                    maxCount: null,
                    minCount: null,
                    ordering: 'append',
                    required: null,
                    rowLabel: null,
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
                    {
                        attributes: {
                            maxCount: null,
                            minCount: null,
                            ordering: 'append',
                            required: null,
                            rowLabel: null,
                        },
                        required: null,
                        rowLabel: null,
                        category: 'CUSTOM',
                        defaultValue: null,
                        description: '',
                        id: 'test-dynamic-field-array-2',
                        isOpen: false,
                        isValid: true,
                        label: 'Test Dynamic field array 2',
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
                                id: 'field2',
                                isOpen: false,
                                isValid: true,
                                label: 'field2',
                                placeholder: 'write some text',
                                type: 'text',
                            },
                            {
                                attributes: {
                                    maxCount: null,
                                    minCount: 1,
                                    ordering: 'append',
                                    required: false,
                                    rowLabel: null,
                                },
                                required: null,
                                rowLabel: null,
                                category: 'CUSTOM',
                                defaultValue: null,
                                description: '',
                                id: 'test-dynamic-field-array-3',
                                isOpen: false,
                                isValid: true,
                                label: 'Test Dynamic field array 3',
                                placeholder: null,
                                fields: [
                                    {
                                        id: 'long-text-example2',
                                        label: 'Long Text Example2',
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
                        ],
                        type: 'dynamicFieldArray',
                    },
                ],
                type: 'dynamicFieldArray',
            },
        ],
    },
};

export const FormWithUpdatedRichTextEditor = FormGroupComponent.bind({});

FormWithUpdatedRichTextEditor.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                id: 'rich-text-editor',
                label: 'Rich Text Editor',
                description: '',
                defaultValue: null,
                type: 'richText',
                required: null,
                attributes: {
                    maxChars: 100,
                    required: true,
                    minChars: 10,
                },
                options: null,
            },
        ],
    },
};

export const FormWithFileUpload = FormGroupComponent.bind({});

FormWithFileUpload.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                id: 'file-upload',
                label: 'File Upload',
                description: '',
                defaultValue: null,
                type: 'multiFile',
                required: null,
                attributes: {},
                options: null,
            },
            {
                id: 'file-upload-1',
                label: 'private single File Upload',
                description: '',
                defaultValue: null,
                type: 'privateSingleFile',
                required: null,
                attributes: {},
                options: null,
            },
            {
                id: 'file-upload-2',
                label: 'private multi File Upload',
                description: '',
                defaultValue: null,
                type: 'multiPrivateFile',
                required: null,
                attributes: {},
                options: null,
            },
        ],
    },
};

export const FormWithRadioButtonList = FormGroupComponent.bind({});
FormWithRadioButtonList.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                id: 'role',
                label: 'Role',
                description: '',
                defaultValue: 'user',
                type: 'dropdownList',
                required: null,
                attributes: { required: true, subType: 'radioButton' },
                options: ['admin', 'user', 'test'],
                fields: null,
            },
        ],
    },
};

export const WizardForm = FormGroupComponent.bind({});
WizardForm.args = {
    formJsonData: {
        appTypeId: 'dfa-field',
        label: 'Wizard App Type',
        description: null,
        createdDate: 1612460763356,
        fields: [
            {
                id: 'name',
                label: 'Name',
                type: 'text',
                attributes: { maxChars: null, required: true, minChars: null },
            },
            {
                id: 'customData.description',
                label: 'description',
                type: 'richText',
                attributes: { maxChars: null, required: null, minChars: null, group: '' },
            },
            {
                id: 'customData.contact-information',
                label: 'Contact information',
                description: 'Here is description!',
                type: 'fieldGroup',
                attributes: {},
            },
            {
                id: 'customData.contact-1',
                label: 'contact 1',
                description: 'Description of contact',
                type: 'text',
                attributes: { maxChars: null, required: true, minChars: null, group: 'contact-information' },
            },
            {
                id: 'customData.contact-2',
                label: 'contact 2',
                description: '',
                type: 'longText',
                attributes: { maxChars: null, required: true, minChars: null, group: 'contact-information' },
            },
            {
                id: 'customData.images',
                label: 'Images',
                description: '',
                type: 'fieldGroup',
                attributes: {},
            },
            {
                id: 'customData.images-1',
                label: 'Images 1',
                description: '',
                type: 'singleImage',
                attributes: {
                    width: null,
                    required: true,
                    hash: null,
                    accept: null,
                    height: null,
                    group: 'images',
                },
            },
            {
                id: 'customData.images-2',
                label: 'Images 2',
                description: '',
                type: 'singleFile',
                attributes: { required: true, hash: null, accept: null, group: 'images' },
            },
            {
                id: 'customData.personal-data',
                label: 'Personal Data',
                description: '',
                type: 'fieldGroup',
                attributes: {},
            },
            {
                id: 'customData.personal-1',
                label: 'Personal 1',
                description: '',
                type: 'color',
                attributes: { required: null, group: 'personal-data' },
            },
            {
                id: 'customData.personal-2',
                label: 'Personal 2',
                description: '',
                type: 'emailAddress',
                attributes: { required: true, group: 'personal-data' },
            },
            {
                id: 'customData.personal-3',
                label: 'Personal 3',
                description: '',
                type: 'richText',
                attributes: { maxChars: null, required: true, minChars: null, group: 'personal-data' },
            },
            {
                id: 'customData.general-test-field',
                label: 'General test field',
                description: '',
                defaultValue: [],
                type: 'tags',
                attributes: { minCount: null, maxCount: null, required: true, group: '' },
            },
        ],
    },
    displayType: 'wizard',
    buttonPosition: 'justify',
    maxStepsToShow: 3,
    enableTextTruncation: true,
};
