export interface TypeModel<T extends TypeFieldModel> {
  fields?: T[];
}

export interface TypeFieldModel {
  id: string;
  defaultValue?: any;
  options?: OptionValue[] | string [];
  fields?: TypeFieldModel[];
}

export interface OptionValue {
  value: any;
}
