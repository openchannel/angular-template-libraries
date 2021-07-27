import { OcCommonLibModule, OcDropdownComponent } from '@openchannel/angular-common-components/src/lib/common-components';
import { moduleMetadata } from '@storybook/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const modules = {
    imports: [OcCommonLibModule, AngularSvgIconModule.forRoot(), NgbModule],
};

export default {
    title: 'Dropdown [BEM]',
    component: OcDropdownComponent,
    decorators: [moduleMetadata(modules)],
};

const DropdownComponent = (args: OcDropdownComponent) => ({
    component: OcDropdownComponent,
    moduleMetadata: modules,
    props: args,
});

export const DefaultDropdownLabel = DropdownComponent.bind({});

DefaultDropdownLabel.args = {
    selected: {
        label: 'popular',
    },
    options: [
        {
            label: 'popular',
        },
        {
            label: 'newest',
        },
        {
            label: 'featured',
        },
    ],
};
