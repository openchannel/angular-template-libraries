import {OcCommonLibModule} from 'oc-ng-common-component';
import {moduleMetadata} from '@storybook/angular';
import {OcConfirmationModalComponent} from 'oc-ng-common-component';

const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Confirmation modal [BEM]',
    component: OcConfirmationModalComponent,
    decorators: [
        moduleMetadata(modules),
    ],
};

const ConfirmationModal = (args: OcConfirmationModalComponent) => ({
    component: OcConfirmationModalComponent,
    moduleMetadata: modules,
    props: args
});

export const DefaultConfirmation = ConfirmationModal.bind({});

DefaultConfirmation.args = {
    modalTitle: 'Submit app',
    modalText: 'Submit this app to the marketplace now?',
    confirmButtonText: 'Yes, submit it',
};

export const WarningConfirmation = ConfirmationModal.bind({});

WarningConfirmation.args = {
    modalTitle: 'Delete app',
    modalText: 'Delete this app from the marketplace now?',
    confirmButtonText: 'Yes, delete it',
    confirmButtonType: 'danger'
};
