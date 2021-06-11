import { moduleMetadata } from '@storybook/angular';
import { OcCheckboxComponent, OcCommonLibModule, OcInputComponent } from '@openchannel/angular-common-components/src/lib/common-components';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Input [BEM]',
    component: OcInputComponent,
    decorators: [moduleMetadata(modules)],
};

const InputComponent = (args: OcInputComponent) => ({
    component: OcInputComponent,
    moduleMetadata: modules,
    props: args,
});

const CheckboxComponent = (args: OcCheckboxComponent) => ({
    component: OcCheckboxComponent,
    moduleMetadata: modules,
    props: args,
});

export const Text = InputComponent.bind({});
Text.args = {
    focus: true,
};

export const Checkbox = CheckboxComponent.bind({});
Checkbox.args = {
    labelText: 'Custom Checkbox',
    requiredIndicator: true,
};
