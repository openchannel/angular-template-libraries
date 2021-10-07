import {
    FileDetails,
    OcFormComponentsModule,
    OcFormModalComponent,
    FileUploaderService,
} from '@openchannel/angular-common-components/src/lib/form-components';
import { moduleMetadata } from '@storybook/angular';
import { Observable, of } from 'rxjs';
import { EmbedVideoService } from 'ngx-embed-video';
import { HttpClient, HttpClientModule, HttpResponse, HttpUploadProgressEvent } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

const modules = {
    imports: [OcFormComponentsModule, HttpClientModule, BrowserAnimationsModule],
    providers: [
        HttpClient,
        { provide: FileUploaderService, useClass: StubFileUploadDownloadService },
        EmbedVideoService,
        ERROR_MESSAGES_STORY_PROVIDER,
    ],
};

export default {
    title: 'Form Modal Component [BEM]',
    component: OcFormModalComponent,
    decorators: [moduleMetadata(modules)],
    argTypes: { formSubmitted: { action: 'Form Data' }, formDataUpdated: { action: 'Form Data Updates' } },
};

const FormModalComponent = (args: OcFormModalComponent) => ({
    component: OcFormModalComponent,
    moduleMetadata: modules,
    props: args,
});

export const FormWithTestData = FormModalComponent.bind({});

FormWithTestData.args = {
    formJsonData: {
        formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
            {
                id: 'role',
                label: 'role',
                description: '',
                defaultValue: 'user',
                type: 'dropdownList',
                required: null,
                attributes: { required: true },
                options: ['admin', 'user', 'test'],
                subFieldDefinitions: null,
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
                subFieldDefinitions: null,
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
                subFieldDefinitions: null,
            },
        ],
    },
};
