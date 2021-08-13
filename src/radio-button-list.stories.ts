import { moduleMetadata } from '@storybook/angular';
import { OcFormComponentsModule, OcRadioButtonListComponent } from '@openchannel/angular-common-components/src/lib/form-components';

const modules = {
    imports: [OcFormComponentsModule],
};

export default {
    title: 'Radio Button List [BEM]',
    component: OcRadioButtonListComponent,
    decorators: [moduleMetadata(modules)],
};

const RadioButtonListComponent = (args: OcRadioButtonListComponent) => ({
    component: OcRadioButtonListComponent,
    moduleMetadata: modules,
    props: args,
});

export const RadioGroup = RadioButtonListComponent.bind({});

RadioGroup.args = {
    itemsArray: [
        {
            label: 'Angular',
            value: 'angular',
        },
        {
            label: 'React',
            value: 'react',
        },
        {
            label: 'Vue',
            value: 'vue',
        },
    ],
    value: 'angular',
    radioButtonGroup: 'frameworks',
};
