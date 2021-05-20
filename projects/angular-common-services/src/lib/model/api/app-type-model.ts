export interface AppTypeOptionModelResponse {
  value: string;
}

export interface AppTypeFieldModelResponse {
  id: string;
  label: string;
  type: string;
  attributes?: any;
  description?: string;
  fields?: AppTypeFieldModelResponse [];
  subFieldDefinitions?: AppTypeFieldModelResponse [];
  defaultValue?: any;
  placeholder?: string;
  options?: AppTypeOptionModelResponse [] | string [];
  specialType?: string;
}

export interface AppTypeModelResponse {
  appTypeId: string;
  label?: string;
  description?: string;
  createdDate: any;
  fields?: AppTypeFieldModelResponse[];
}


