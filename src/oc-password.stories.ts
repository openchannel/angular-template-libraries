import {OcCommonLibModule} from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import {moduleMetadata} from '@storybook/angular';
import { OcPasswordComponent } from '../projects/oc-ng-common-component/src/lib/oc-password/oc-password.component';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Password',
  component: OcPasswordComponent,
  decorators: [
    moduleMetadata(modules),
  ],
  argTypes: { modelNameChange: { action: 'Entered Password' }}
};

const PasswordComponent = (args: OcPasswordComponent) => ({
  component: OcPasswordComponent,
  moduleMetadata: modules,
  props: args
});

export const PasswordInput = PasswordComponent.bind({});

PasswordInput.args = {
  placeholder: 'Enter password',
};

