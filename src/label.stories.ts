import { storiesOf } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';

import { OcCommonLibModule, OcLabelComponent } from 'oc-ng-common-component/src/lib/common-components';
import { OcTooltipLabelComponent } from 'oc-ng-common-component/src/lib/form-components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: []
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
  moduleMetadata: {
    imports: [OcCommonLibModule, NgbModule]
  }
}));
