import {OcCommonLibModule} from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import {moduleMetadata} from '@storybook/angular';
import {OcRichTextEditorComponent} from '../projects/oc-ng-common-component/src/lib/oc-rich-text-editor/oc-rich-text-editor.component';
import {OcAppDescriptionComponent} from '../projects/oc-ng-common-component/src/lib/oc-app-description/oc-app-description.component';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'App Description Component',
  component: OcAppDescriptionComponent,
  decorators: [
    moduleMetadata(modules),
  ],
  argTypes: { getEditorContent: { action: 'Editor data' }}
};

const AppDescriptionComponent = (args: OcAppDescriptionComponent) => ({
  component: OcAppDescriptionComponent,
  moduleMetadata: modules,
  props: args
});

export const ExpandableDescription = AppDescriptionComponent.bind({});

ExpandableDescription.args = {
  appDescription: '<p> Nulla ut cursus mi. Nullam mi lacus, porttitor a sapien quis, scelerisque vestibulum massa.' +
    '<br> Phasellus tincidunt est eget fermentum dictum. Morbi consequat sed risus a maximus. ' +
    '<br>Proin aliquam libero eget tellus pharetra posuere. Praesent accumsan ipsum quam.' +
    ' <br> Suspendisse potenti. Maecenas id posuere dui, in semper urna. Sed mattis nec mauris eget tristique.' +
    ' <br>Phasellus id nulla id dolor sagittis placerat.' +
    ' <br>Aliquam posuere, magna sit amet vehicula posuere, elit purus facilisis elit, in lacinia enim diam consequat felis.' +
    ' <br>Nullam scelerisque in elit vitae feugiat. Nunc mattis eros leo, at finibus lacus ornare nec. Nulla facilisi.</p>',
  header: 'About App',
};

export const FullDescription = AppDescriptionComponent.bind({});

FullDescription.args = {
  appDescription: '<p> Nulla ut cursus mi. Nullam mi lacus, porttitor a sapien quis, scelerisque vestibulum massa.' +
    '<br> Phasellus tincidunt est eget fermentum dictum. Morbi consequat sed risus a maximus. ' +
    '<br>Proin aliquam libero eget tellus pharetra posuere. Praesent accumsan ipsum quam.' +
    ' <br> Suspendisse potenti. Maecenas id posuere dui, in semper urna. Sed mattis nec mauris eget tristique.' +
    ' <br>Phasellus id nulla id dolor sagittis placerat.' +
    ' <br>Aliquam posuere, magna sit amet vehicula posuere, elit purus facilisis elit, in lacinia enim diam consequat felis.' +
    ' <br>Nullam scelerisque in elit vitae feugiat. Nunc mattis eros leo, at finibus lacus ornare nec. Nulla facilisi.</p>',
  header: 'About App',
  showFullDescription: true
};

