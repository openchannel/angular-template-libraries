import { moduleMetadata } from '@storybook/angular';
import { OcFormComponentsModule, OcProgressBarComponent } from '@openchannel/angular-common-components/src/lib/form-components';

const modules = {
    imports: [OcFormComponentsModule],
};

export default {
    title: 'Progressbar [BEM]',
    component: OcProgressBarComponent,
    decorators: [moduleMetadata(modules)],
};

const ProgressBarComponent = (args: OcProgressBarComponent) => ({
    component: OcProgressBarComponent,
    moduleMetadata: modules,
    props: args,
});

export const ProgressBarSteps = ProgressBarComponent.bind({});

ProgressBarSteps.args = {
    progressbarData: [
        {
            title: 'Step 1',
            state: 'finished',
        },
        {
            title: 'Contact information',
            state: 'invalid',
        },
        {
            title: 'Images',
            state: 'pristine',
        },
        {
            title: 'Personal Data',
            state: 'pristine',
        },
        {
            title: 'Step 5',
            state: 'pristine',
        },
    ],
    currentStep: 3,
};
