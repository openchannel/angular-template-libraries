import { OcAppDescriptionComponent, OcCommonLibModule } from '@openchannel/angular-common-components';
import { moduleMetadata } from '@storybook/angular';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'App Description Component [BEM]',
    component: OcAppDescriptionComponent,
    decorators: [moduleMetadata(modules)],
    argTypes: { getEditorContent: { action: 'Editor data' } },
};

const AppDescriptionComponent = (args: OcAppDescriptionComponent) => ({
    component: OcAppDescriptionComponent,
    moduleMetadata: modules,
    props: args,
});

const descriptionText =
    '<p> Nulla ut cursus mi. Nullam mi lacus, porttitor a sapien quis, scelerisque vestibulum massa.' +
    '<br> Phasellus tincidunt est eget fermentum dictum. Morbi consequat sed risus a maximus. ' +
    '<br>Proin aliquam libero eget tellus pharetra posuere. Praesent accumsan ipsum quam.' +
    ' <br> Suspendisse potenti. Maecenas id posuere dui, in semper urna. Sed mattis nec mauris eget tristique.' +
    ' <br>Phasellus id nulla id dolor sagittis placerat.' +
    ' <br>Aliquam posuere, magna sit amet vehicula posuere, elit purus facilisis elit, in lacinia enim diam consequat felis.' +
    ' <br>Nullam scelerisque in elit vitae feugiat. Nunc mattis eros leo, at finibus lacus ornare nec. Nulla facilisi.</p>';

export const ExpandableDescription = AppDescriptionComponent.bind({});

ExpandableDescription.args = {
    appDescription: descriptionText,
    header: 'About App',
    truncateTextLength: 250,
};

export const FullDescription = AppDescriptionComponent.bind({});

FullDescription.args = {
    appDescription: descriptionText,
    header: 'About App',
    truncateTextLength: 250,
    showFullDescription: true,
};

export const ShortDescription = AppDescriptionComponent.bind({});

ShortDescription.args = {
    appDescription:
        '<p> Nulla ut cursus mi. Nullam mi lacus, porttitor a sapien quis, scelerisque vestibulum massa.' +
        '<br> Phasellus tincidunt est eget fermentum dictum. Morbi consequat sed risus a maximus. ' +
        '<br>Proin aliquam libero eget tellus pharetra posuere. </p>',
    header: 'About App',
};
