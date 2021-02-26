import { OcCommonLibModule, OcFormComponentsModule } from 'oc-ng-common-component';
import { moduleMetadata } from '@storybook/angular';
import { OcDynamicFieldArrayComponent } from 'oc-ng-common-component';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcFormComponentsModule]
};

export default {
  title: 'Dynamic Fields Array',
  component: OcDynamicFieldArrayComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const DynamicFieldsArrayComponent = (args: OcDynamicFieldArrayComponent) => ({
  component: OcDynamicFieldArrayComponent,
  moduleMetadata: modules,
  props: args
});

export const DynamicFieldsArrayComponentAppendOrdering = DynamicFieldsArrayComponent.bind({});

DynamicFieldsArrayComponentAppendOrdering.args = {
  fieldDefinition: {
    attributes:    {
      maxCount: null,
      minCount: null,
      ordering: 'append',
      required:	null,
      rowLabel:	'field1'
    },
    required: null,
    rowLabel: null,
    category: 'CUSTOM',
    defaultValue: null,
    description: '',
    id: 'test-dynamic-field-array',
    isOpen: false,
    isValid: true,
    label: 'Test Dynamic field array',
    placeholder: null,
    subFieldDefinitions:   [
      {
        attributes: {
          maxChars: null,
          minChars: null,
          required: null
        },
        category: 'CUSTOM',
        defaultValue: null,
        description: 'some description',
        id: 'field1',
        isOpen: false,
        isValid: true,
        label: 'field1',
        placeholder: 'write some text',
        type: 'text'
      },
      {
        id:	'long-text-example',
        label: 'Long Text Example',
        type:	'longText',
        placeholder: 'Write your text here...',
        category: 'CUSTOM',
        defaultValue: null,
        attributes: {
          maxChars:	200,
          required:	null,
          minChars:	2
        },
      }
    ],
    type: 'dynamicFieldArray'
  },
  maxCount: 3,
  required: true
};

export const DynamicFieldsArrayComponentPrependOrdering = DynamicFieldsArrayComponent.bind({});

DynamicFieldsArrayComponentPrependOrdering.args = {
  fieldDefinition: {
    attributes:    {
      maxCount: null,
      minCount: null,
      ordering: 'prepend',
      required:	null,
      rowLabel:	'field1'
    },
    required: null,
    rowLabel: null,
    category: 'CUSTOM',
    defaultValue: null,
    description: '',
    id: 'test-dynamic-field-array',
    isOpen: false,
    isValid: true,
    label: 'Test Dynamic field array',
    placeholder: null,
    subFieldDefinitions:   [
      {
        attributes: {
          maxChars: null,
          minChars: null,
          required: null
        },
        category: 'CUSTOM',
        defaultValue: null,
        description: 'some description',
        id: 'field1',
        isOpen: false,
        isValid: true,
        label: 'field1',
        placeholder: 'write some text',
        type: 'text'
      },
      {
        id:	'long-text-example',
        label: 'Long Text Example',
        type:	'longText',
        placeholder: 'Write your text here...',
        category: 'CUSTOM',
        defaultValue: null,
        attributes: {
          maxChars:	200,
          required:	null,
          minChars:	2
        },
      }
    ],
    type: 'dynamicFieldArray'
  },
  maxCount: 3,
  required: true
};
