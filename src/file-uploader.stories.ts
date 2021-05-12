import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import { OcFileUploadComponent, FileDetails } from '@openchannel/angular-common-components/src/lib/form-components';
import { action } from '@storybook/addon-actions';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { ImageCropperModule } from 'ngx-image-cropper';

const modules = {
    imports: [OcCommonLibModule, NgbModule, HttpClientModule, ImageCropperModule],
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
file4.fileUrl = './assets/img/standard-app-icon.svg';
file4.size = 2048000;
file4.uploadDate = 1595942005169;

class StubFileUploadDownloadService {
    constructor() {}

    uploadToOpenchannel(file: FormData, isPrivate?: boolean): Observable<any> {
        return new Observable();
    }

    prepareUploadReq(token: any, file: any, isPrivate: any): Observable<any> {
        return new Observable();
    }

    getToken(): Observable<any> {
        return new Observable();
    }

    downloadFileDetails(fileId: any): Observable<FileDetails> {
        return new Observable();
    }

    downloadFileFromUrl(fileUrl: any): Observable<any> {
        return new Observable();
    }
}

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
            uploadIconUrl: 'assets/img/upload_icon.svg',
            defaultFileIcon: 'assets/img/file_icon.svg',
        },
    }))
    .add('Single File With Data', () => ({
        component: OcFileUploadComponent,
        moduleMetadata: modules,
        props: {
            fileDetailArr: [file2],
            fileType: 'privateSingleFile',
            uploadIconUrl: 'assets/img/upload_icon.svg',
            defaultFileIcon: 'assets/img/file_icon.svg',
        },
    }))
    .add('Multi Public Image With Data', () => ({
        component: OcFileUploadComponent,
        moduleMetadata: modules,
        props: {
            isMultiFile: true,
            fileDetailArr: [file1, file2, file3, file4],
            fileType: 'multiImage',
            uploadIconUrl: 'assets/img/upload_icon.svg',
            defaultFileIcon: 'assets/img/file_icon.svg',
        },
    }));
