import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcRadioButtonComponent } from '@openchannel/angular-common-components/src/lib/common-components';

const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Radio Button [BEM]',
    component: OcRadioButtonComponent,
    decorators: [moduleMetadata(modules)],
};

const RadioButtonComponent = (args: OcRadioButtonComponent) => ({
    component: OcRadioButtonComponent,
    moduleMetadata: modules,
    props: args,
});

export const SimpleRadioButton = RadioButtonComponent.bind({});

SimpleRadioButton.args = {
    labelText: 'Test Label',
    radioButtonGroupName: 'test',
    value: 1,
};
