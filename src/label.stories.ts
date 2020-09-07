import {storiesOf} from '@storybook/angular';
import {
  OcAppListGridComponent,
  OcCommonLibModule,
  OcLabelComponent
} from 'projects/oc-ng-common-component/src/public-api';
import {withA11y} from '@storybook/addon-a11y';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

storiesOf('Label', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcLabelComponent,
  })
  .add('Label', () => ({
    component: OcLabelComponent,
    props: {
      text: "Name"
    }
  }));
