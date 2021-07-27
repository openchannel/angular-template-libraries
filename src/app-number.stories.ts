import { OcCommonLibModule } from '@openchannel/angular-common-components';
import { moduleMetadata } from '@storybook/angular';
import { OcNumberComponent } from '@openchannel/angular-common-components/src/lib/form-components';
import { FormsModule } from '@angular/forms';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule, FormsModule],
};

export default {
    title: 'Number Input Component [BEM]',
    component: OcNumberComponent,
    decorators: [moduleMetadata(modules)],
};

const NumberInputComponent = (args: OcNumberComponent) => ({
    component: OcNumberComponent,
    moduleMetadata: modules,
    props: args,
});

export const SimpleNumberInput = NumberInputComponent.bind({});

SimpleNumberInput.args = {
    autoFocus: true,
    placeholder: 'Write any number here',
};
