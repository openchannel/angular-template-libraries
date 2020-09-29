import { OcCommonLibModule } from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import { moduleMetadata } from '@storybook/angular';
import { OcDynamicFieldArrayComponent } from '../projects/oc-ng-common-component/src/lib/oc-dynamic-field-array/oc-dynamic-field-array.component';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
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

export const DynamicFieldsArrayComponentSimpleForm = DynamicFieldsArrayComponent.bind({});

DynamicFieldsArrayComponentSimpleForm.args = {
  fieldDefinition: {
    attributes:    {
      maxCount: null,
      minCount: null,
      ordering: 'append'
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
      }
    ],
    type: 'dynamicFieldArray'
  },
  maxCount: 3,
  required: true
};
