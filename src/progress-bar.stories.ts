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
            state: 'pristine',
            defaultDivider: true,
        },
        {
            title: 'Contact information',
            state: 'pristine',
            defaultDivider: true,
        },
        {
            title: 'Images',
            state: 'pristine',
            defaultDivider: true,
        },
        {
            title: 'Personal Data',
            state: 'pristine',
            defaultDivider: true,
        },
        {
            title: 'Step 5',
            state: 'pristine',
            defaultDivider: true,
        },
    ],
    currentStep: 1,
};
