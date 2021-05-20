export interface TypeModel<T extends TypeFieldModel> {
    fields?: T[];
}

export interface TypeFieldModel {
    id: string;
    type: string;
    label?: string;
    defaultValue?: any;
    attributes?: any;
    options?: OptionValue[] | string[];
    fields?: TypeFieldModel[];
}

export interface OptionValue {
    value: any;
}
