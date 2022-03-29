import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

export const passwordValidator = (c: FormControl): ValidationErrors => {
    const isValidPassword = c.value ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%!^&]).{8,}$/.test(c.value) : true;
    const message = {
        passwordValidator: {
            message:
                'Password must contains 1 uppercase, 1 lowercase, 1 digit, 1 special char (one of @#$%!^&) and at least 8 character long',
        },
    };
    return isValidPassword ? null : message;
};

@Directive({
    selector: '[ocPasswordValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true }],
})
export class PasswordValidatorDirective implements Validator {
    validate(c: FormControl): ValidationErrors {
        return passwordValidator(c);
    }
}
