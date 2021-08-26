export interface AppFormFieldResponse {
    id: string;
    label: string;
    description: string;
    defaultValue: string;
    type: string;
    required?: any;
    attributes: string[];
    options?: any;
    fields?: AppFormFieldResponse[];
    placeholder: string;
}

/**
 * Used as response body for getting a form.<br>
 * [Get Forms API endpoint]{@link getForms}<br>
 * [Get Form by ID API endpoint]{@link getForm}<br>
 */
export interface AppFormModelResponse {
    formId: string;
    name: string;
    createdDate: number;
    fields?: AppFormFieldResponse[];
}

/**
 * Status for form submission. Can be one of: 'open', 'closed'.
 */
export interface FormSubmissionStatus {
    value: string;
}

/**
 * Used as response body for create form submission.<br>
 * [API endpoint]{@link createFormSubmission}<br>
 * [Openchannel docs]{@link https://support.openchannel.io/documentation/api/user-api/forms/create-form-submission/}
 */
export interface FormSubmissionModel {
    formSubmissionId: string;
    formId: string;
    archived?: boolean;
    status?: FormSubmissionStatus;
    submittedDate: number;
    name: string;
    email: string;
    appId: string;
    developerId: string;
    userId?: string;
    formData: any;
}

/**
 * Used as request body for create form submission.<br>
 * [API endpoint]{@link createFormSubmission}<br>
 * [Openchannel docs]{@link https://support.openchannel.io/documentation/api/user-api/forms/create-form-submission/}
 */
export interface CreateFormSubmissionModel {
    name: string;
    appId: string;
    userId: string;
    email: string;
    formData: any;
}
