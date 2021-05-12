import { OcDatetimePickerComponent, OcFormComponentsModule } from '@openchannel/angular-common-components/src/lib/form-components';
import { moduleMetadata } from '@storybook/angular';

const modules = {
    imports: [OcFormComponentsModule]
};

export default {
    title: 'Date component [BEM]',
    component: OcDatetimePickerComponent,
    decorators: [
        moduleMetadata(modules),
    ],
};

const DateTimeComponent = (args: OcDatetimePickerComponent) => ({
    component: OcDatetimePickerComponent,
    moduleMetadata: modules,
    props: args
});

export const DisabledDate = DateTimeComponent.bind({});

DisabledDate.args = {
    disabled: true,
};

export const DefaultDate = DateTimeComponent.bind({});

DefaultDate.args = {
    value: new Date().valueOf(),
    type: 'date',
    settings: {
        format: 'dd/MM/yyyy',
    },
    disabled: false
};

export const DefaultDateTime = DateTimeComponent.bind({});

DefaultDateTime.args = {
    value: new Date().valueOf(),
    type: 'datetime',
};
