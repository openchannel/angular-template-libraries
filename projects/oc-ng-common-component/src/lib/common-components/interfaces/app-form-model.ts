export interface AppFormField {
  id: string;
  label: string;
  description?: string;
  defaultValue: any;
  type: string;
  required?: any;
  attributes?: AppFormFieldAttributes;
  options?: any;
  subFieldDefinitions?: AppFormField [];
  fields?: AppFormField[];
  placeholder?: string;
  category?: string;
}

export interface AppFormModel {
  formId: string;
  name: string;
  createdDate: number;
  fields?: AppFormField[];
}

export interface AppFormFieldAttributes {
  maxCount?: number;
  minCount?: number;
  required?: boolean;
  maxChars?: number;
  minChars?: number;
  min?: number;
  max?: number;
  ordering?: 'append' | 'prepend';
  rowLabel?: string;
}

