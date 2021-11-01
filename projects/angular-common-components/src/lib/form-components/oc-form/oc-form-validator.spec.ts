import { OcFormValidator } from './oc-form-validator';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

describe('OcFormValidator', () => {

    it('[Required] validator with empty objects.', () => {
        expect(setValidatorAndValidate(new FormControl(null), OcFormValidator.required(null, false))).toBe(false);
        expect(setValidatorAndValidate(new FormControl(''), OcFormValidator.required(null, false))).toBe(false);
        expect(setValidatorAndValidate(new FormControl([]), OcFormValidator.required(null, false))).toBe(false);
    });

    it('[Required] validator with not empty objects.', () => {
        expect(setValidatorAndValidate(new FormControl('a'), OcFormValidator.required(null, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl(['a']), OcFormValidator.required(null, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl(true), OcFormValidator.required(null, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl(false), OcFormValidator.required(null, false))).toBe(true);
    });

    it('[Required] validator for [text] without trimming.', () => {
        expect(setValidatorAndValidate(new FormControl(' '), OcFormValidator.required('text', false))).toBe(true);
    });

    it('[Required] validator for [text] with trimming.', () => {
        expect(setValidatorAndValidate(new FormControl(' '), OcFormValidator.required('text', true))).toBe(false);
    });

    it('[Required] validator for [richText] without trimming.', () => {
        expect(setValidatorAndValidate(new FormControl('<a>    <a>'), OcFormValidator.required('richText', false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl(null), OcFormValidator.required('richText', false))).toBe(false);
    });

    it('[Required] validator for [richText] with trimming.', () => {
        expect(setValidatorAndValidate(new FormControl('<a>    <a>'), OcFormValidator.required('richText', true))).toBe(false);
    });

    it('[Url] validator without trimming.', () => {
        expect(setValidatorAndValidate(new FormControl('https://aaa.aaa.aaa/aaa'), OcFormValidator.urlValidator(false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('  https://aaa.aaa.aaa/aaa'), OcFormValidator.urlValidator(false))).toBe(false);
        // Note: Valid, because used with 'required' validator
        expect(setValidatorAndValidate(new FormControl(null), OcFormValidator.urlValidator(false))).toBe(true);

        // todo invalid regex, created ticket AT-1575.
        // expect(setValidatorAndValidate(new FormControl('https---aaa.aaa.aaa/aaa'), OcFormValidator.urlValidator(false))).toBe(false);
    });

    it('[Url] validator with trimming.', () => {
        expect(setValidatorAndValidate(new FormControl('https://aaa.aaa.aaa/aaa'), OcFormValidator.urlValidator(true))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('  https://aaa.aaa.aaa/aaa'), OcFormValidator.urlValidator(true))).toBe(true);
    });

    it('[Rich text min characters] validator without trimming.', () => {
        expect(setValidatorAndValidate(new FormControl('<a>123<a>'), OcFormValidator.richTextMinCharactersValidator(3, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('<a>1234<a>'), OcFormValidator.richTextMinCharactersValidator(3, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('<a>   <a>'), OcFormValidator.richTextMinCharactersValidator(3, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('<a>12<a>'), OcFormValidator.richTextMinCharactersValidator(3, false))).toBe(false);

        // Note: Valid, because used with 'required' validator
        expect(setValidatorAndValidate(new FormControl(null), OcFormValidator.richTextMinCharactersValidator(3, false))).toBe(true);
    });

    it('[Rich text min characters] validator with trimming.', () => {
        expect(setValidatorAndValidate(new FormControl('<a> 123 <a>'), OcFormValidator.richTextMinCharactersValidator(3, true))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('<a> 1234 <a>'), OcFormValidator.richTextMinCharactersValidator(3, true))).toBe(true);
        // Note: Removed all tags and spaces. Valid, because used with 'required' validator
        expect(setValidatorAndValidate(new FormControl(null), OcFormValidator.richTextMinCharactersValidator(3, true))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('<a>    <a>'), OcFormValidator.richTextMinCharactersValidator(3, true))).toBe(true);
    });

    it('[Rich text max characters] validator without trimming.', () => {
        expect(setValidatorAndValidate(new FormControl('<a>123<a>'), OcFormValidator.richTextMaxCharactersValidator(3, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('<a>   <a>'), OcFormValidator.richTextMaxCharactersValidator(3, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('<a>1234<a>'), OcFormValidator.richTextMaxCharactersValidator(3, false))).toBe(false);
        expect(setValidatorAndValidate(new FormControl('<a>    <a>'), OcFormValidator.richTextMaxCharactersValidator(3, false))).toBe(false);

        // Note: Removed all tags and spaces. Valid, because used with 'required' validator
        expect(setValidatorAndValidate(new FormControl(null), OcFormValidator.richTextMaxCharactersValidator(3, false))).toBe(true);
    });

    it('[Rich text max characters] validator with trimming.', () => {
        expect(setValidatorAndValidate(new FormControl('<a>123<a>'), OcFormValidator.richTextMaxCharactersValidator(3, true))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('<a>1234<a>'), OcFormValidator.richTextMaxCharactersValidator(3, true))).toBe(false);
        expect(setValidatorAndValidate(new FormControl('<a>  123  <a>'), OcFormValidator.richTextMaxCharactersValidator(3, true))).toBe(true);

        // Note: Removed all tags and spaces. Valid, because used with 'required' validator
        expect(setValidatorAndValidate(new FormControl(null), OcFormValidator.richTextMaxCharactersValidator(3, true))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('<a>    <a>'), OcFormValidator.richTextMaxCharactersValidator(3, true))).toBe(true);
    });

    it('[Min length] validator without trimming.', () => {
        expect(setValidatorAndValidate(new FormControl('123'), OcFormValidator.minLength(3, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('1234'), OcFormValidator.minLength(3, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('   '), OcFormValidator.minLength(3, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('    '), OcFormValidator.minLength(3, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('12'), OcFormValidator.minLength(3, false))).toBe(false);
        expect(setValidatorAndValidate(new FormControl('  '), OcFormValidator.minLength(3, false))).toBe(false);

        // Note: Valid, because used with 'required' validator
        expect(setValidatorAndValidate(new FormControl(null), OcFormValidator.minLength(3, false))).toBe(true);
    });

    it('[Min length] validator with trimming.', () => {
        expect(setValidatorAndValidate(new FormControl('123'), OcFormValidator.minLength(3, true))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('   123  '), OcFormValidator.minLength(3, true))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('12  '), OcFormValidator.minLength(3, true))).toBe(false);

        // Note: Valid, because used with 'required' validator
        expect(setValidatorAndValidate(new FormControl(null), OcFormValidator.minLength(3, false))).toBe(true);
    });

    it('[Max length] validator without trimming.', () => {
        expect(setValidatorAndValidate(new FormControl('12'), OcFormValidator.maxLength(3, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('12 '), OcFormValidator.maxLength(3, false))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('12  '), OcFormValidator.maxLength(3, false))).toBe(false);

        // Note: Valid, because used with 'required' validator
        expect(setValidatorAndValidate(new FormControl(null), OcFormValidator.maxLength(3, false))).toBe(true);
    });

    it('[Max length] validator with trimming.', () => {
        expect(setValidatorAndValidate(new FormControl('12    '), OcFormValidator.maxLength(3, true))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('123   '), OcFormValidator.maxLength(3, true))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('1234   '), OcFormValidator.maxLength(3, true))).toBe(false);

        // Note: Valid, because used with 'required' validator
        expect(setValidatorAndValidate(new FormControl(null), OcFormValidator.maxLength(3, true))).toBe(true);
        expect(setValidatorAndValidate(new FormControl('     '), OcFormValidator.maxLength(3, true))).toBe(true);
    });

    it('[Password] validator without trimming.', () => {
        // correct pass
        expect(setValidatorAndValidate(new FormControl('aA@01119'), OcFormValidator.passwordValidator())).toBe(true);
        // special character
        expect(setValidatorAndValidate(new FormControl('aA001119'), OcFormValidator.passwordValidator())).toBe(false);
        // upper case character
        expect(setValidatorAndValidate(new FormControl('aa@01119'), OcFormValidator.passwordValidator())).toBe(false);
        // lower case character
        expect(setValidatorAndValidate(new FormControl('AA@01119'), OcFormValidator.passwordValidator())).toBe(false);
        // numbers
        expect(setValidatorAndValidate(new FormControl('aA@aaaaa'), OcFormValidator.passwordValidator())).toBe(false);
        // test min length
        expect(setValidatorAndValidate(new FormControl('aA@0111'), OcFormValidator.passwordValidator())).toBe(false);

        // Note: Valid, because used with 'required' validator
        expect(setValidatorAndValidate(new FormControl(null), OcFormValidator.passwordValidator())).toBe(true);
        expect(setValidatorAndValidate(new FormControl(''), OcFormValidator.passwordValidator())).toBe(true);
    });

    function setValidatorAndValidate<T extends AbstractControl>(control: T, validator: ValidatorFn): boolean {
        control.setValidators(validator);
        control.updateValueAndValidity();
        return control.valid;
    }
});
