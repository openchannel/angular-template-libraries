import {storiesOf} from '@storybook/angular';
import {
  OcAppListGridComponent,
  OcCheckboxComponent,
  OcCommonLibModule,
  OcInputComponent,
  OcRadioComponent,
  OcTextSearhComponent
} from 'projects/oc-ng-common-component/src/public-api';
import {withA11y} from '@storybook/addon-a11y';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

storiesOf('Input', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcInputComponent,
  })
  .add('Text', () => ({
    component: OcInputComponent,
    props: {
      focus: true
    },
    moduleMetadata: modules
  })).add('Radio', () => ({
  component: OcRadioComponent,

})).add('Checkbox', () => ({
  component: OcCheckboxComponent,
  props: {
    labelText: 'Custom Checkbox',
    requiredIndicator: true
  }
})).add('Text search', () => ({
  component: OcTextSearhComponent,
  // props: {
  //     text: "Name"
  // }
}));
