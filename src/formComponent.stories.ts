import { OcCommonLibModule } from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import { moduleMetadata } from '@storybook/angular';
import { OcFormComponent } from '../projects/oc-ng-common-component/src/lib/oc-form/oc-form.component';

const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Form Group Component',
  component: OcFormComponent,
  decorators: [
    moduleMetadata(modules),
  ],
  // argTypes: { formData: { action: 'Form Data' }}
};

const FormGroupComponent = (args: OcFormComponent) => ({
  component: OcFormComponent,
  moduleMetadata: modules,
  props: args
});

export const FormWithRichText = FormGroupComponent.bind({});

FormWithRichText.args = {
};
