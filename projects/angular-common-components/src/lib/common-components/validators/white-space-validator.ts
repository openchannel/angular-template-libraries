import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    selector: '[ocWhiteSpaceValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: WhiteSpaceValidatorDirective, multi: true }],
})
export class WhiteSpaceValidatorDirective implements Validator {
    validate(c: FormControl): ValidationErrors {
        const isWhitespace = c.value ? c.value.trim().length === 0 : false;
        const message = {
            whiteSpaceValidator: {
                message: 'Please fill out this field ',
            },
        };
        return !isWhitespace ? null : message;
    }
}
