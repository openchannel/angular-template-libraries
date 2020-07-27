import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
    selector: '[whiteSpaceValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: WhiteSpaceValidatorDirective, multi: true }]
})
export class WhiteSpaceValidatorDirective implements Validator {
    validate(c: FormControl): ValidationErrors {
        const isWhitespace = c.value ? (c.value.trim().length === 0 ? true : false) : false;
        const message = {
            whiteSpaceValidator: {
                message: 'Please fill out this field '
            }
        };
        return !isWhitespace ? null : message;
    }
}
