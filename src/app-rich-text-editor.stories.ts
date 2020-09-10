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

export const RichTextEditorMaxCharacters = RichTextEditorComponent.bind({});

RichTextEditorMaxCharacters.args = {
  placeholder: 'You can write 255 characters here',
  charCounterCount: true,
  maxCharacters: 255,
  label: 'Rich Text Editor Text'
};

export const RichTextEditorLittleMaxCharacters = RichTextEditorComponent.bind({});

RichTextEditorLittleMaxCharacters.args = {
  placeholder: 'You can write only 10 characters here',
  charCounterCount: true,
  maxCharacters: 10,
  label: 'Rich Text Editor Text'
};

export const RichTextEditorWithoutCharacterCounter = RichTextEditorComponent.bind({});

RichTextEditorWithoutCharacterCounter.args = {
  placeholder: '',
  charCounterCount: false,
  label: 'Rich Text Editor Text'
};

