import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import {
    OcFileUploadComponent,
    FileDetails,
    FileUploaderService
} from '@openchannel/angular-common-components/src/lib/form-components';
import { action } from '@storybook/addon-actions';
import { HttpClientModule, HttpResponse, HttpUploadProgressEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { ImageCropperModule } from 'ngx-image-cropper';

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

class FileUploadDownloadServiceStub extends FileUploaderService {
    constructor() {
        super();
    }

    fileUploadRequest(file: FormData, isPrivate: boolean, hash?: string[]): Observable<HttpResponse<FileDetails> | HttpUploadProgressEvent> {
        return of(new HttpResponse({ body: mockResponse }));
    }

    fileDetailsRequest(fileId: string): Observable<FileDetails> {
        return of(mockResponse);
    }
}

const modules = {
    imports: [OcCommonLibModule, NgbModule, HttpClientModule, ImageCropperModule],
    providers: [{ provide: FileUploaderService, useClass: FileUploadDownloadServiceStub }],
};

const file1 = new FileDetails();
file1.name = 'Product_image.png';
file1.fileUploadProgress = 0;

const file2 = new FileDetails();
file2.name = 'Product_image.png';
file2.fileUploadProgress = 50;

const file3 = new FileDetails();
file3.name = 'Product_side_image.png';
file3.fileUploadProgress = 75;

const file4 = new FileDetails();
file4.name = 'Product_backside_image.png';
file4.fileUploadProgress = 100;
file4.fileUrl = './assets/angular-common-components/standard-app-icon.svg';
file4.size = 2048000;
file4.uploadDate = 1595942005169;

const metadata = moduleMetadata({});

storiesOf('File Uploader [BEM]', module)
    .addParameters({
        component: OcFileUploadComponent,
    })
    .addDecorator(withA11y)
    .addDecorator(metadata)
    .add('Single Private File', () => ({
        component: OcFileUploadComponent,
        moduleMetadata: modules,
        props: {
            fileUpload: action('fileUpload'),
            fileType: 'privateSingleFile',
            uploadIconUrl: 'assets/angular-common-components/upload_icon.svg',
            defaultFileIcon: 'assets/angular-common-components/file_icon.svg',
        },
    }))
    .add('Single File With Data', () => ({
        component: OcFileUploadComponent,
        moduleMetadata: modules,
        props: {
            fileDetailArr: [file2],
            fileType: 'privateSingleFile',
          uploadIconUrl: 'assets/angular-common-components/upload_icon.svg',
          defaultFileIcon: 'assets/angular-common-components/file_icon.svg',
        },
    }))
    .add('Multi Public Image With Data', () => ({
        component: OcFileUploadComponent,
        moduleMetadata: modules,
        props: {
            isMultiFile: true,
            fileDetailArr: [file1, file2, file3, file4],
            fileType: 'multiImage',
          uploadIconUrl: 'assets/angular-common-components/upload_icon.svg',
          defaultFileIcon: 'assets/angular-common-components/file_icon.svg',
        },
    }));
