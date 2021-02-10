import {OcCommonLibModule} from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import {moduleMetadata} from '@storybook/angular';
import {OcRichTextEditorComponent} from '../projects/oc-ng-common-component/src/lib/oc-rich-text-editor/oc-rich-text-editor.component';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Rich Text Editor Component',
  component: OcRichTextEditorComponent,
  decorators: [
    moduleMetadata(modules),
  ],
  argTypes: { getEditorContent: { action: 'Editor data' }}
};

const RichTextEditorComponent = (args: OcRichTextEditorComponent) => ({
  component: OcRichTextEditorComponent,
  moduleMetadata: modules,
  props: args
});

export const SimpleRichTextEditor = RichTextEditorComponent.bind({});

SimpleRichTextEditor.args = {
  placeholder: 'Write here about yourself...',
};

