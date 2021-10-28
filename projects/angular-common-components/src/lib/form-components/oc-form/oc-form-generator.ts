import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AppTypeFieldModel } from '@openchannel/angular-common-components/src/lib/common-components';
import { cloneDeep } from 'lodash';
import { AppFormField } from '../model/app-form-model';

export class OcFormGenerator {
    private static readonly emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/;

    // tslint:disable-next-line:typedef
    static getFormByConfig(fieldsDefinitions: AppFormField[]) {
        const group = {};
        fieldsDefinitions.forEach(inputTemplate => {
            switch (inputTemplate?.type) {
                case 'richText':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ? inputTemplate?.defaultValue : '');
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isRichText: true });
                    break;
                case 'text':
                case 'longText':
                case 'dropdownList':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ? inputTemplate?.defaultValue : '');
                    this.setValidators(group[inputTemplate?.id], inputTemplate);
                    break;
                case 'password':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ? inputTemplate?.defaultValue : '');
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isPassword: true });
                    break;
                case 'tags':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue?.length > 0 ? inputTemplate?.defaultValue : []);
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isList: true });
                    break;
                case 'multiFile':
                case 'singleFile':
                case 'multiImage':
                case 'singleImage':
                case 'privateSingleFile':
                case 'multiPrivateFile':
                    group[inputTemplate?.id] = new FormControl(inputTemplate.defaultValue);
                    this.setValidators(group[inputTemplate.id], inputTemplate, { isList: true });
                    break;
                case 'checkbox':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ? inputTemplate?.defaultValue : false);
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isCheckbox: true });
                    break;
                case 'number':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ? inputTemplate?.defaultValue : null);
                    this.setValidators(group[inputTemplate?.id], inputTemplate);
                    break;
                case 'emailAddress':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ? inputTemplate?.defaultValue : '');
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isEmail: true });
                    break;
                case 'websiteUrl':
                case 'videoUrl':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ? inputTemplate?.defaultValue : '');
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isUrl: true });
                    break;
                case 'color':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ? inputTemplate?.defaultValue : '#00cf9f');
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isColor: true });
                    break;
                case 'booleanTags':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue?.length ? inputTemplate?.defaultValue : []);
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isList: true, isBooleanTags: true });
                    break;
                case 'numberTags':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue?.length > 0 ? inputTemplate?.defaultValue : []);
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isList: true, isNumberTags: true });
                    break;
                case 'date':
                case 'datetime':
                    group[inputTemplate.id] = new FormControl(inputTemplate?.defaultValue);
                    this.setValidators(group[inputTemplate?.id], inputTemplate);
                    break;
                case 'multiselectList':
                    if (inputTemplate.attributes.maxCount && inputTemplate?.attributes.maxCount < 2) {
                        group[inputTemplate.id] = new FormControl(
                            inputTemplate.defaultValue ? inputTemplate.defaultValue : [inputTemplate?.options[0]],
                        );
                    } else {
                        group[inputTemplate.id] = new FormControl(
                            inputTemplate?.defaultValue?.length > 0 ? inputTemplate?.defaultValue : [],
                        );
                    }
                    this.setValidators(group[inputTemplate.id], inputTemplate, { isList: true });
                    break;
                case 'multiApp':
                    group[inputTemplate.id] = new FormControl(inputTemplate?.defaultValue || []);
                    this.setValidators(group[inputTemplate.id], inputTemplate, { isList: true });
                    break;
                case 'dynamicFieldArray':
                    group[inputTemplate.id] = new FormArray([]);
                    if (inputTemplate.defaultValue && inputTemplate.defaultValue.length > 0) {
                        inputTemplate.defaultValue.forEach(dValue => {
                            const form = cloneDeep(inputTemplate.fields);
                            form.forEach(field => {
                                field.defaultValue = dValue[field.id];
                            });
                            const arrayFormGroup = new FormGroup(this.getFormByConfig(form));
                            group[inputTemplate.id].push(arrayFormGroup);
                        });
                    }
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isList: true, isDFA: true });
                    break;
                default:
                    break;
            }
        });
        return group;
    }
    /**
     * Setting validators array to the chosen control
     */
    static setValidators(
        control: AbstractControl,
        inputTemplate: AppTypeFieldModel,
        additional?: {
            isCheckbox?: boolean;
            isEmail?: boolean;
            isUrl?: boolean;
            isColor?: boolean;
            isList?: boolean;
            isRichText?: boolean;
            isPassword?: boolean;
            isBooleanTags?: boolean;
            isNumberTags?: boolean;
            isDFA?: boolean;
        },
    ): void {
        const validators: ValidatorFn[] = [];
        const { attributes } = inputTemplate;
        if (!attributes) {
            return;
        }
        Object.keys(attributes).forEach(key => {
            switch (key) {
                case 'required':
                    if (attributes.required) {
                        if (additional && additional.isCheckbox) {
                            validators.push(Validators.requiredTrue);
                        } else {
                            validators.push(Validators.required);
                        }
                    }
                    break;
                case 'maxChars':
                    if (attributes.maxChars) {
                        if (additional && additional.isRichText) {
                            validators.push(this.richTextMaxCharactersValidator(attributes.maxChars));
                        } else {
                            validators.push(Validators.maxLength(attributes.maxChars));
                        }
                    }
                    break;
                case 'minChars':
                    if (attributes.minChars) {
                        if (additional && additional.isRichText) {
                            validators.push(this.richTextMinCharactersValidator(attributes.minChars));
                        } else {
                            validators.push(Validators.minLength(attributes.minChars));
                        }
                    }
                    break;
                case 'minCount':
                    if (attributes.minCount) {
                        validators.push(
                            this.validatorMinLengthArray(attributes.minCount, inputTemplate.label, additional ? additional.isList : false),
                        );
                    }
                    break;
                case 'maxCount':
                    if (attributes.maxCount) {
                        validators.push(
                            this.validatorMaxLengthArray(attributes.maxCount, inputTemplate.label, additional ? additional.isList : false),
                        );
                    }
                    break;
                case 'min':
                    if (attributes.min) {
                        validators.push(Validators.min(Number(attributes.min)));
                    }
                    break;
                case 'max':
                    if (attributes.max) {
                        validators.push(Validators.max(Number(attributes.max)));
                    }
                    break;
                default:
                    break;
            }
        });
        if (additional && additional.isEmail) {
            validators.push(this.emailValidator());
        }
        if (additional && additional.isUrl) {
            validators.push(this.urlValidator());
        }
        if (additional && additional.isColor) {
            validators.push(this.colorValidator());
        }
        if (additional && additional.isPassword) {
            validators.push(this.passwordValidator());
        }
        if (additional && additional.isNumberTags) {
            validators.push(this.numberTagsValidator(inputTemplate.label));
        }
        if (additional && additional.isBooleanTags) {
            validators.push(this.booleanTagsValidator(inputTemplate.label));
        }
        if (additional && additional.isDFA) {
            validators.push(this.childDFAFieldValidator(inputTemplate));
        }
        control.setValidators(validators);
    }
    /**
     * Return 'minLength' validation error, when array length < min.
     */
    static validatorMinLengthArray(min: number, label: string, showLengthErrorText?: boolean): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            if (!c.value || c.value.length === 0 || c.value.length >= min) {
                return null;
            } else {
                if (showLengthErrorText) {
                    return {
                        minElementsCount: {
                            requiredCount: min,
                            fieldLabel: label,
                        },
                    };
                } else {
                    return {
                        minCount: true,
                    };
                }
            }
        };
    }
    /**
     * Return 'maxLength' validation error, when array length > max.
     */
    static validatorMaxLengthArray(max: number, label: string, showLengthErrorText?: boolean): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            if (!c.value || c.value.length === 0 || c.value.length <= max) {
                return null;
            } else {
                if (showLengthErrorText) {
                    return {
                        maxElementsCount: {
                            requiredCount: max,
                            fieldLabel: label,
                        },
                    };
                } else {
                    return {
                        maxCount: true,
                    };
                }
            }
        };
    }
    /**
     * Custom validator
     * for the url type control
     */
    static urlValidator(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            // regex for url validation
            const reg = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm); //NOSONAR
            const value = c.value;
            if (reg.test(value) || value === '') {
                return null;
            } else {
                return {
                    websiteValidator: true,
                };
            }
        };
    }
    /**
     * Custom validator for color control
     */
    static colorValidator(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            const value = c.value;
            if ((value.charAt(0) === '#' && value.length === 7) || value === '') {
                return null;
            } else {
                return {
                    colorValidator: true,
                };
            }
        };
    }
    /**
     * Custom validator of min characters for rich text.
     * Check only characters, not tags
     */
    static richTextMinCharactersValidator(min: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            const characters = c.value.replace(/<[^>]*>/g, '');
            if (!characters || characters.length >= min) {
                return null;
            } else {
                return {
                    minlength: {
                        requiredLength: min,
                    },
                };
            }
        };
    }
    /**
     * Custom validator of max characters for rich text.
     * Check only characters, not tags
     */
    static richTextMaxCharactersValidator(max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            const characters = c.value.replace(/<[^>]*>/g, '');
            if (characters.length <= max) {
                return null;
            } else {
                return {
                    maxlength: {
                        requiredLength: max,
                    },
                };
            }
        };
    }
    /**
     * Custom validator of password
     */
    static passwordValidator(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%!^&]).{8,}$/;
            const password = c.value;
            if (!password || password.match(regex)) {
                return null;
            } else {
                return { passwordValidator: {} };
            }
        };
    }
    /**
     * Custom validator for numbers
     */
    static numberTagsValidator(label: string): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            const numberArray = c.value as any[];
            if (numberArray) {
                for (const numberItem of numberArray) {
                    if (isNaN(Number(numberItem))) {
                        return {
                            numberTagsValidator: {
                                fieldTitle: label,
                            },
                        };
                    }
                }
                return null;
            }
            return null;
        };
    }
    /**
     * Custom validator for boolean
     */
    static booleanTagsValidator(label: string): ValidatorFn {
        const booleanAcceptedValues: boolean[] = [true, false];

        return (c: AbstractControl): { [key: string]: any } => {
            const booleanArray = c.value as any[];
            if (booleanArray) {
                for (const booleanItem of booleanArray) {
                    if (!booleanAcceptedValues.includes(booleanItem)) {
                        return {
                            booleanTagsValidator: {
                                fieldTitle: label,
                            },
                        };
                    }
                }
                return null;
            }
            return null;
        };
    }

    static emailValidator(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            const email = c.value;
            if (!email || email.match(this.emailRegex)) {
                return null;
            } else {
                return { email: true };
            }
        };
    }

    static childDFAFieldValidator(fieldDefinition: AppTypeFieldModel): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            if (c.touched && Object.values((c as any).controls).find((v: any) => v.invalid)) {
                return this.createChildDfaFieldError(fieldDefinition);
            } else {
                return null;
            }
        };
    }

    static createChildDfaFieldError(fieldDefinition: AppTypeFieldModel): any {
        return {
            invalidDFAField: {
                fieldDefinition,
            },
        };
    }
}
