import { OcCommonLibModule, OcPasswordComponent } from '@openchannel/angular-common-components';
import { moduleMetadata } from '@storybook/angular';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Password [BEM]',
    component: OcPasswordComponent,
    decorators: [moduleMetadata(modules)],
    argTypes: { modelNameChange: { action: 'Entered Password' } },
};

const PasswordComponent = (args: OcPasswordComponent) => ({
    component: OcPasswordComponent,
    moduleMetadata: modules,
    props: args,
});

export const PasswordInput = PasswordComponent.bind({});

PasswordInput.args = {
    placeholder: 'Enter password',
};
