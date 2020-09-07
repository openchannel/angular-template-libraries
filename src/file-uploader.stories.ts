import {storiesOf} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';
import {
  OcAppListGridComponent,
  OcCommonLibModule,
  OcFileUploadComponent
} from 'projects/oc-ng-common-component/src/public-api';
import {FileDetails} from 'oc-ng-common-service';
import {action} from '@storybook/addon-actions';
import {OCComponentConstants} from 'projects/oc-ng-common-component/src/lib/model/oc-constants';

const modules = {
  imports: [OcCommonLibModule]
};

const file1 = new FileDetails()
file1.name = 'Product_image.png';
file1.fileUploadProgress = 0;


const file2 = new FileDetails();
file2.name = 'Product_image.png';
file2.fileUploadProgress = 50;

const file3 = new FileDetails();
file3.name = 'Product_side_image.png';
file3.fileUploadProgress = 75;

const file4 = new FileDetails();
file4.name = "Product_backside_image.png";
file4.fileUploadProgress = 100;
file4.fileIconUrl = "https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png"
file4.fileUrl = "https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png";
file4.size = 2048000;
file4.uploadDate = 1595942005169;

storiesOf('File Uploader', module)
  .addParameters({
    component: OcFileUploadComponent,
  })
  .addDecorator(withA11y)
  .add('Single Private File', () => ({
    component: OcFileUploadComponent,
    moduleMetadata: modules,
    props: {
      fileUpload: action('fileUpload'),
      fileType: OCComponentConstants.FILE_TYPES.SINGLE_PRIVATE_FILE
    }
  })).add('Single Private image', () => ({
  component: OcFileUploadComponent,
  moduleMetadata: modules,
  props: {
    fileUpload: action('fileUpload'),
    fileType: OCComponentConstants.FILE_TYPES.SINGLE_PRIVATE_IMAGE
  }
})).add('Single File With Data', () => ({
  component: OcFileUploadComponent,
  moduleMetadata: modules,
  props: {
    files: [file2],
    fileType: OCComponentConstants.FILE_TYPES.SINGLE_PRIVATE_FILE,
    defaultFileIcon: 'https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png'
  }
})).add('Multi Public Image With Data', () => ({
  component: OcFileUploadComponent,
  moduleMetadata: modules,
  props: {
    isMultiFile: true,
    files: [file1, file2, file3, file4],
    fileType: OCComponentConstants.FILE_TYPES.MULTI_PUBLIC_IMAGE,
    defaultFileIcon: 'https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png'
  }
}));
