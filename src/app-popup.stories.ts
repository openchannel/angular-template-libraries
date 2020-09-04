import {storiesOf} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';
import {
  OcAppListGridComponent,
  OcCommonLibModule,
  OcPopupComponent
} from 'projects/oc-ng-common-component/src/public-api';

const modules = {
  imports: [OcCommonLibModule]
};

// let application = new Applications();


storiesOf('Popup', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcPopupComponent,
  })
  .add('confirm', () => ({
    component: OcPopupComponent,
    props: {
      title: 'Warning',
      type: 'secondary',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
      text: 'An alert Automatically comes with a confirm button',
      informationalText: 'You can keep the changes as draft',
      textVariable: ''
    }
  }));
