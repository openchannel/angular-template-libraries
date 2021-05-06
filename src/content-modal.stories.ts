import {OcCommonLibModule, OcContentModalComponent} from 'oc-ng-common-component';
import {moduleMetadata} from '@storybook/angular';
import {TemplateRef} from "@angular/core";

const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Content modal [BEM]',
    component: OcContentModalComponent,
    decorators: [
        moduleMetadata(modules),
    ],
};

const ContentModal = (args: OcContentModalComponent) => ({
    component: OcContentModalComponent,
    moduleMetadata: modules,
    props: args
});

export const modal = ContentModal.bind({});

modal.args = {
    modalTitle: 'Test modal title',
    closeButton: true,
    customContentTemplate: null
};

