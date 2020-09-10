import {moduleMetadata, storiesOf} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';
import {OcCommonLibModule, OcFileUploadComponent} from 'projects/oc-ng-common-component/src/public-api';
import {FileDetails, FileUploadDownloadService, OcCommonServiceModule} from 'oc-ng-common-service';
import {OCComponentConstants} from 'projects/oc-ng-common-component/src/lib/model/oc-constants';
import {HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

class StubFileUploadDownloadService {
    constructor() {
    }

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

const modules = {
    imports: [OcCommonLibModule, OcCommonServiceModule.forRoot({}), HttpClientModule]
};

const metadata = moduleMetadata({
    providers: [
        {provide: FileUploadDownloadService, useClass: StubFileUploadDownloadService}
    ]
});

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
file4.fileIconUrl = 'https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png';
file4.fileUrl = 'https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png';
file4.size = 2048000;
file4.uploadDate = 1595942005169;

const defaultProps = {
    isMultiFile: true,
    fileType: OCComponentConstants.FILE_TYPES.MULTI_PRIVATE_IMAGE,
    uploadIconUrl: 'http://localhost:4200/assets/img/upload-icon.svg',
    closeIconUrl: 'http://localhost:4200/assets/img/close-icon.svg',
    defaultFileIcon: 'http://localhost:4200/assets/img/file-placeholder.svg',
    zoomInIconUrl: 'http://localhost:4200/assets/img/zoom-in.svg',
    zoomOutIconUrl: 'http://localhost:4200/assets/img/zoom-out.svg'
};

storiesOf('Multi image uploader', module)
    .addParameters({
        component: OcFileUploadComponent,
    })
    .addDecorator(withA11y)
    .addDecorator(metadata)
    .add('With no data and with image resize', () => ({
        component: OcFileUploadComponent,
        moduleMetadata: modules,
        props: {
            ...defaultProps,
            resizeToWidth: 150,
            resizeToHeight: 300,
            acceptType: 'image/*'
        }
    }))
    .add('Only jpeg', () => ({
        component: OcFileUploadComponent,
        moduleMetadata: modules,
        props: {
            ...defaultProps,
            acceptType: 'image/jpeg'
        }
    })).add('Multi Public Image With Data', () => ({
    component: OcFileUploadComponent,
    moduleMetadata: modules,
    props: {
        ...defaultProps,
        fileDetailArr: [file1, file2, file3, file4],
    }
}));
