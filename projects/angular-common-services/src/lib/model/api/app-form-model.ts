export interface AppFormFieldResponse {
  id: string;
  label: string;
  description: string;
  defaultValue: string;
  type: string;
  required?: any;
  attributes: string [];
  options?: any;
  subFieldDefinitions?: AppFormFieldResponse [];
  fields?: AppFormFieldResponse[];
  placeholder: string;
}

export interface AppFormModelResponse {
  formId: string;
  name: string;
  createdDate: number;
  fields?: AppFormFieldResponse[];
}

export interface FormSubmissionStatus {
  value: string;
}

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

export interface CreateFormSubmissionModel {
  name: string;
  appId: string;
  userId: string;
  email: string;
  formData: any;
}

