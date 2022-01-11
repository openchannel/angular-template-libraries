import { AppFormModel } from '@openchannel/angular-common-components/src/lib/form-components';

export interface OcCheckboxData {
    termsUrl: string;
    policyUrl: string;
}
/**
 * @example
 * {
 *  name: 'Default',
 *  account: {
 *      includeFields: ['name', 'email'],
 *      type: 'default',
 *      createdDate: 1612362087671
 *      description: ""
 *      developerAccountTypeId: "default",
 *      fields: [
 *            {
 *                "id": "name",
 *                "label": "Name",
 *                "type": "text",
 *                "attributes": {
 *                    "required": false
 *                }
 *            },
 *            {
 *                "id": "email",
 *                "label": "Email",
 *                "type": "emailAddress",
 *                "attributes": {
 *                    "required": true
 *                }
 *            },
 *            {
 *                "id": "username",
 *                "label": "Username",
 *                "type": "text",
 *                "attributes": {
 *                    "required": false
 *                }
 *            },
 *            {
 *                "id": "customData.company",
 *                "label": "Company",
 *                "description": "",
 *                "type": "text",
 *                "attributes": {
 *                    "maxChars": null,
 *                    "required": null,
 *                    "minChars": null
 *                }
 *            }
 *        ]
 *      },
 *  fieldsOrder: ['email', 'name', 'username' ]
 * }
 */
export interface OcEditUserFormConfig {
    name: string;
    account: OcEditUserTypeConfig;
    organization?: OcEditUserTypeConfig;
    fieldsOrder?: string[];
}

export interface OcEditUserTypeConfig {
    type: string;
    includeFields: string[];
    typeData: AppFormModel;
}

export interface OcEditUserResult {
    account?: OCOrganization;
    organization?: OCOrganization;
    password?: string;
}

export interface OCOrganization {
    name?: string;
    username?: string;
    type?: string;
    email: string;
    customData?: any;
}
