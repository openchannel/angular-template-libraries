import {
    ErrorMessage,
    RadioButtonLayout,
    TransformTextType
} from '@openchannel/angular-common-components/src/lib/common-components';

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

export type AppFormField = DefaultAppFormField | DropdownFormField | DropdownAdditionalField;

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
    /**
     * Used for 'number' field type.
     * Limit decimal number after dot.
     */
    decimalCount?: number;
    formHideRow?: boolean;
    transformText?: TransformTextType;
    componentLayout?: RadioButtonLayout;
    onlyFirstDfaItem?: boolean;
    overrideErrorMessage?: ErrorMessage;
}

export interface FieldOptionValue {
    value: any;
}

export type DropdownField = Omit<DefaultAppFormField, 'type' | 'options'> & { type: 'dropdownList'; options: string[] };

export type DropdownFormFieldSettings = {
    dropdownField: DropdownField;
    dropdownForms: { [dropdownValue: string]: AppFormField[] };
};

export type DropdownFormField = Omit<DefaultAppFormField, 'type'> & {
    type: 'dropdownForm';
    attributes: {
        dropdownSettings: DropdownFormFieldSettings;
    };
};

export type DropdownAdditionalField = Omit<DefaultAppFormField, 'type' | 'options'> & {
    type: 'dropdownList';
    options: string[];
    attributes: {
        subType: 'additionalField';
        subTypeSettings: {
            additionalFieldId: string;
            additionalFieldAttributesByDropdownValue: {
                [dropdownValue: string]: AppFormFieldAttributes;
            };
        };
    };
};

export type FormLabelPosition = 'top' | 'left' | 'right';

export type TrimFormFieldType = OcTextFieldType & OcUrlFieldType;

export const defaultFieldsForTrim: TrimFormFieldType[] = ['text', 'longText', 'richText', 'emailAddress', 'websiteUrl', 'videoUrl'];
