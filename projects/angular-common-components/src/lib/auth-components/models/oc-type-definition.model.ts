/**
 * @deprecated
 */
export interface TypeModel<T extends TypeFieldModel> {
    fields?: T[];
}

/**
 * @deprecated
 */
export interface TypeFieldModel {
    id: string;
    type: string;
    label?: string;
    defaultValue?: any;
    attributes?: any;
    options?: OptionValue[] | string[] | any[];
    fields?: TypeFieldModel[];
}

export interface OptionValue {
    value: any;
}
