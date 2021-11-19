import { ErrorMessage } from '@openchannel/angular-common-components/src/lib/common-components';

export type OcTextFieldType = 'richText' | 'text' | 'longText' | 'password' | 'emailAddress' | string;

export type OcDateFieldType = 'date' | 'datetime' | string;

export type OcFileFieldType = 'multiFile' | 'singleFile' | 'privateSingleFile' | 'multiPrivateFile' | 'multiImage' | 'singleImage' | string;

export type OcTagsFieldType = 'tags' | 'numberTags' | 'booleanTags' | string;

export type OcListFieldType = 'dropdownList' | 'multiselectList' | 'multiApp' | string;

export type OcUrlFieldType = 'websiteUrl' | 'videoUrl' | string;

export type OcCustomFieldType = 'dropdownForm';

export type OcFieldType =
    | 'checkbox'
    | 'number'
    | 'color'
    | 'dynamicFieldArray'
    | OcTextFieldType
    | OcDateFieldType
    | OcFileFieldType
    | OcTagsFieldType
    | OcListFieldType
    | OcUrlFieldType
    | OcCustomFieldType
    | string;

export type DefaultAppFormField = {
    id: string;
    label?: string;
    description?: string;
    defaultValue?: any;
    type: OcFieldType;
    required?: any;
    attributes?: AppFormFieldAttributes;
    options?: FieldOptionValue[] | string[] | any[];
    fields?: AppFormField[];
    placeholder?: string;
    category?: string;
}

export type AppFormField = DefaultAppFormField | DropdownFormField;

export interface AppFormModel {
    formId?: string;
    name?: string;
    createdDate?: number;
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
    subType?: string;
    group?: string;
    width?: number;
    height?: number;
    hash?: string;
    accept?: any;
    overrideErrorMessage?: ErrorMessage;
}

export interface FieldOptionValue {
    value: any;
}

export type DropdownFormFieldSettings = {
    dropdownField: Omit<DefaultAppFormField, 'type' | 'options'> & { type: 'dropdownList'; options: string[] };
    dropdownForms: { [dropdownValue: string]: AppFormField[] };
}

export type DropdownFormField = Omit<DefaultAppFormField, 'type'> & {
    type: 'dropdownForm';
    attributes: {
        dropdownSettings: DropdownFormFieldSettings;
    };
};

export type FormLabelPosition = 'top' | 'left' | 'right';

export type TrimFormFieldType = OcTextFieldType & OcUrlFieldType;

export const defaultFieldsForTrim: TrimFormFieldType[] = ['text', 'longText', 'richText', 'emailAddress', 'websiteUrl', 'videoUrl'];
