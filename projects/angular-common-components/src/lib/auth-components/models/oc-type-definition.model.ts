/**
 * @deprecated
 * This model is deprecated and will be removed in the next releases.
 * Use the {@link #AppFormModel} instead.
 */
export interface TypeModel<T extends TypeFieldModel> { //NOSONAR
    fields?: T[];
}

/**
 * @deprecated
 * This model is deprecated and will be removed in the next releases.
 * Use the {@link #AppFormField} instead.
 */
export interface TypeFieldModel {
    id: string;
    type: string;
    label?: string;
    defaultValue?: any;
    attributes?: any;
    options?: OptionValue[] | string[] | any[]; //NOSONAR
    fields?: TypeFieldModel[]; //NOSONAR
}

/**
 * @deprecated
 * This field is deprecated and will be removed in the next releases.
 * Use the {@link FieldOptionValue} instead.
 */
export interface OptionValue {
    value: any;
}
