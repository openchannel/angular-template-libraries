import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AppTypeFieldModel } from '@openchannel/angular-common-components/src/lib/common-components';
import { cloneDeep, isNumber } from 'lodash';
import { AppFormField, DropdownFormField, TrimFormFieldType } from '../model/app-form-model';
import { OcFormValidator } from './oc-form-validator';
import { OcDropdownFormUtils } from '../oc-dropdown-form/oc-dropdown-form.service';

export class OcFormGenerator {
    // tslint:disable-next-line:typedef
    static getFormByConfig(fieldsDefinitions: AppFormField[], trimTextFields?: TrimFormFieldType[]) {
        let group = {};
        // tslint:disable-next-line:prettier
        fieldsDefinitions.forEach(inputTemplate => { // NOSONAR
            const isTrimText = trimTextFields?.includes(inputTemplate?.type);

            switch (inputTemplate?.type) {
                case 'richText':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue || '');
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isRichText: true, isTrimText });
                    break;
                case 'text':
                case 'longText':
                case 'dropdownList':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue || '');
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isTrimText });
                    break;
                case 'password':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue || '');
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isPassword: true });
                    break;
                case 'tags':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue?.length > 0 ? inputTemplate?.defaultValue : []);
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isList: true, isTrimText });
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
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue || false);
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isCheckbox: true });
                    break;
                case 'number':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue || null);
                    this.setValidators(group[inputTemplate?.id], inputTemplate);
                    break;
                case 'emailAddress':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue || '');
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isEmail: true, isTrimText });
                    break;
                case 'websiteUrl':
                case 'videoUrl':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue || '');
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isUrl: true, isTrimText });
                    break;
                case 'color':
                    group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue || '');
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
                            const arrayFormGroup = new FormGroup(this.getFormByConfig(form, trimTextFields));
                            group[inputTemplate.id].push(arrayFormGroup);
                        });
                    }
                    this.setValidators(group[inputTemplate?.id], inputTemplate, { isList: true, isDFA: true });
                    break;
                case 'dropdownForm':
                    const fields = OcDropdownFormUtils.getFormFields(inputTemplate as DropdownFormField, inputTemplate.defaultValue);
                    const formConfig = OcFormGenerator.getFormByConfig(fields, trimTextFields);
                    const formGroup = new FormGroup(formConfig);
                    group = { ...group, ...formGroup.controls };
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
    // prettier-ignore
    static setValidators( // NOSONARA
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
            isTrimText?: boolean;
        },
    ): void {
        const validators: ValidatorFn[] = [];
        const { attributes = {} } = inputTemplate;
        const isTrimText = additional?.isTrimText;

        Object.keys(attributes).forEach(key => {
            switch (key) {
                case 'required':
                    if (attributes.required) {
                        if (additional?.isCheckbox) {
                            validators.push(Validators.requiredTrue);
                        } else {
                            validators.push(OcFormValidator.required(inputTemplate.type, isTrimText));
                        }
                    }
                    break;
                case 'maxChars':
                    if (isNumber(attributes.maxChars)) {
                        if (additional?.isRichText) {
                            validators.push(OcFormValidator.richTextMaxCharactersValidator(attributes.maxChars, isTrimText));
                        } else {
                            validators.push(OcFormValidator.maxLength(attributes.maxChars, isTrimText));
                        }
                    }
                    break;
                case 'minChars':
                    if (isNumber(attributes.minChars)) {
                        if (additional?.isRichText) {
                            validators.push(OcFormValidator.richTextMinCharactersValidator(attributes.minChars, isTrimText));
                        } else {
                            validators.push(OcFormValidator.minLength(attributes.minChars, isTrimText));
                        }
                    }
                    break;
                case 'minCount':
                    if (isNumber(attributes.minCount)) {
                        validators.push(
                            OcFormValidator.validatorMinLengthArray(attributes.minCount, inputTemplate.label, additional?.isList || false),
                        );
                    }
                    break;
                case 'maxCount':
                    if (isNumber(attributes.maxCount)) {
                        validators.push(
                            OcFormValidator.validatorMaxLengthArray(attributes.maxCount, inputTemplate.label, additional?.isList || false),
                        );
                    }
                    break;
                case 'min':
                    if (isNumber(Number(attributes.min))) {
                        validators.push(Validators.min(Number(attributes.min)));
                    }
                    break;
                case 'max':
                    if (isNumber(Number(attributes.max))) {
                        validators.push(Validators.max(Number(attributes.max)));
                    }
                    break;
                default:
                    break;
            }
        });
        if (additional) {
            if (additional.isEmail) {
                validators.push(OcFormValidator.emailValidator(isTrimText));
            }
            if (additional.isUrl) {
                validators.push(OcFormValidator.urlValidator(isTrimText));
            }
            if (additional.isColor) {
                validators.push(OcFormValidator.colorValidator());
            }
            if (additional.isPassword) {
                validators.push(OcFormValidator.passwordValidator());
            }
            if (additional.isNumberTags) {
                validators.push(OcFormValidator.numberTagsValidator(inputTemplate.label));
            }
            if (additional.isBooleanTags) {
                validators.push(OcFormValidator.booleanTagsValidator(inputTemplate.label));
            }
            if (additional.isDFA) {
                validators.push(OcFormValidator.childDFAFieldValidator(inputTemplate));
            }
        }
        control.setValidators(validators);
    }
}
