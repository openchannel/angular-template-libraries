import {moduleMetadata} from '@storybook/angular';
import {OcCommonLibModule} from 'projects/oc-ng-common-component/src/public-api';
import {OcDropboxComponent} from '../projects/oc-ng-common-component/src/lib/oc-dropbox/oc-dropbox.component';

const modules = {
    imports: [OcCommonLibModule]
};

export default {
    title: 'Dropbox search',
    component: OcDropboxComponent,
    decorators: [
        moduleMetadata(modules),
    ],
    argTypes: { selectedItem: { action: 'Get selected' }}
};

const DropboxComponent = (args: OcDropboxComponent) => ({
    component: OcDropboxComponent,
    moduleMetadata: modules,
    props: args
});

export const DefaultDropbox = DropboxComponent.bind({});
DefaultDropbox.args = {
    placeHolder: 'Default place holder',
    items: ['first', 'second', 'third'],
    clearFormAfterSelect: true,
};

export const ScrollDropbox = DropboxComponent.bind({});
ScrollDropbox.args = {
    placeHolder: 'Default place holder',
    items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    clearFormAfterSelect: false,
};

export const EmptyDropbox = DropboxComponent.bind({});
EmptyDropbox.args = {
    placeHolder: null,
    items: null,
    clearFormAfterSelect: null,
};



