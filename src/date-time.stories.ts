import {OcCommonLibModule} from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import {moduleMetadata} from '@storybook/angular';
import {OcDatetimePickerComponent} from '../projects/oc-ng-common-component/src/lib/oc-datetime-picker/oc-datetime-picker.component';

const modules = {
    imports: [OcCommonLibModule]
};

export default {
    title: 'Date component',
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
