import { ErrorMessage } from '@openchannel/angular-common-components/src/lib/common-components';

export interface AppFormField {
    id: string;
    label: string;
    description?: string;
    defaultValue?: any;
    type: string;
    required?: any;
    attributes?: AppFormFieldAttributes;
    options?: any;
    fields?: AppFormField[];
    placeholder?: string;
    category?: string;
}

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
