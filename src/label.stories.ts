import {storiesOf} from '@storybook/angular';
import {
  OcCommonLibModule,
  OcLabelComponent,
  OcTooltipLabelComponent
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
  .add('Simple Label', () => ({
    component: OcLabelComponent,
    props: {
      text: 'Name'
    },
    moduleMetadata: modules
  })).add('Tooltip Label', () => ({
  component: OcTooltipLabelComponent,
  props: {
    text: 'Label',
    description: 'It\'s tooltip text'
  },
  moduleMetadata: modules
}));
