import { AbstractControl, ValidatorFn } from '@angular/forms';
import { OcFieldType } from '../model/app-form-model';
import { TrimTextUtils } from '../service/trim-text-utils/trim-text.service';
import { AppTypeFieldModel } from '@openchannel/angular-common-components/src/lib/common-components';

export class OcFormValidator {
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
    static urlValidator(isTrimText: boolean): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            // regex for url validation
            const reg = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm); // NOSONAR
            const value = isTrimText ? TrimTextUtils.updateByType(c.value) : c.value;
            if (reg.test(value) || !value) {
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
    static richTextMinCharactersValidator(min: number, isTrimText: boolean): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            const characters = this.removeHtmlTagsFromRichText(
                (isTrimText ? TrimTextUtils.updateByType(c.value, 'richText') : c.value) || '');
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
    static richTextMaxCharactersValidator(max: number, isTrimText: boolean): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            const characters = this.removeHtmlTagsFromRichText(
                (isTrimText ? TrimTextUtils.updateByType(c.value, 'richText') : c.value) || '');
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
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%!^&]).{8,}$/;
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

    static emailValidator(isTrimText: boolean): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            const email = isTrimText ? TrimTextUtils.updateByType(c.value) : c.value;
            if (
                !email ||
                email.match(
                    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/,
                )
            ) {
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

    static maxLength(maxLength: number, isTrimText: boolean): ValidatorFn {
        return (control: AbstractControl) => {
            const value = isTrimText ? TrimTextUtils.updateByType(control.value) : control.value;
            if (this.hasValidLength(value) && value.length > maxLength) {
                return {
                    maxlength: {
                        requiredLength: maxLength,
                        actualLength: value.length,
                    },
                };
            } else {
                return null;
            }
        };
    }

    static minLength(minLength: number, isTrimText: boolean): ValidatorFn {
        return (control: AbstractControl) => {
            const value = isTrimText ? TrimTextUtils.updateByType(control.value) : control.value;

            if (this.isEmptyInputValue(value) || !this.hasValidLength(value)) {
                return null;
            }
            if (value.length < minLength) {
                return {
                    minlength: {
                        requiredLength: minLength,
                        actualLength: value.length,
                    },
                };
            } else {
                return null;
            }
        };
    }

    static required(type: OcFieldType, isTrimText: boolean): ValidatorFn {
        return (control: AbstractControl) => {
            let value = (isTrimText ? TrimTextUtils.updateByType(control.value, type) : control.value);
            if (type === 'richText') {
                value = this.removeHtmlTagsFromRichText(value || '');
            }
            if (this.isEmptyInputValue(value)) {
                return {
                    required: true,
                };
            } else {
                return null;
            }
        };
    }

    static hasValidLength(value: any): boolean {
        return value !== null && typeof value.length === 'number';
    }

    static isEmptyInputValue(value: any): boolean {
        return value === null || value.length === 0;
    }

    static removeHtmlTagsFromRichText(text: string): string {
        return text.replace(/(<[^>]*>)|(&nbsp)/g, '');
    }
}
