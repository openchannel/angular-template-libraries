import { OcFormComponentsModule, OcRichTextEditorComponent } from 'oc-ng-common-component/src/lib/form-components';
import { moduleMetadata } from '@storybook/angular';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcFormComponentsModule]
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

// SimpleRichTextEditor.component.tinyOptions = {
//   base_url: undefined,
//   suffix: undefined,
//   ...SimpleRichTextEditor.component.tinyOptions,
// };
SimpleRichTextEditor.args = {
  placeholder: 'Write here about yourself...',
  tinyOptions: {
    menubar: false,
    toolbar: 'bold italic underline strikethrough subscript superscript fontselect fontsizeselect |' +
      'alignleft aligncenter alignright alignjustify | numlist bullist | outdent indent | link unlink | undo redo',
    plugins: 'lists link wordcount',
    placeholder: 'sdfasfd',
    max_height: 150,
    content_style: 'body { font-family: Arial; }'
  },
};

