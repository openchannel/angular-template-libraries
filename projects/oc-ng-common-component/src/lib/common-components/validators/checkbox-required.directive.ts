import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[ocCheckboxRequired]',
  providers: [{provide: NG_VALIDATORS, useExisting: CheckboxRequiredDirective, multi: true}]
})
export class CheckboxRequiredDirective implements Validator {

  validate(c: FormControl): ValidationErrors {

    return c.value === true ? null : {
      required: {
        message: 'Required checkbox!'
      }
    };
  }
}
