export interface AppTypeOptionModel {
  value: string;
}

export interface AppTypeFieldModel {
  id: string;
  label: string;
  type: string;
  attributes?: any;
  description?: string;
  fields?: AppTypeFieldModel [];
  subFieldDefinitions?: AppTypeFieldModel [];
  defaultValue?: any;
  placeholder?: string;
  options?: AppTypeOptionModel [] | string [];
  specialType?: string;
}

export interface AppTypeModel {
  appTypeId: string;
  label?: string;
  description?: string;
  createdDate: any;
  fields?: AppTypeFieldModel[];
}


