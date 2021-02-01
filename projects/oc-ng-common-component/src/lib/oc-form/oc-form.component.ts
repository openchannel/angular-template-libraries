import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'oc-form',
  templateUrl: './oc-form.component.html',
  styleUrls: ['./oc-form.component.scss']
})
export class OcFormComponent implements OnInit, OnDestroy {

  /**
   * JSON with all form data to generate dynamic form
   */
  @Input() formJsonData: any;
  /**
   * Set disable for button
   * when siblings form is invalid
   */
  @Input() anotherInvalidResult = false;
  /** Show button on form. Default: true */
  @Input() showButton: boolean = true;
  /**
   * Set position of the buttons
   * can be: 'center', 'left', 'right'.
   * default value: 'left'
   */
  @Input() buttonPosition: 'center' | 'left' | 'right' = 'left';
  /** Set custom text to success button. Default: 'Submit' */
  @Input() successButtonText: string = 'Submit';
  /**
   * Set position of the field label
   * can be: 'top', 'left', 'right'.
   * default value: 'top'
   */
  @Input() labelPosition: 'top' | 'left' | 'right' = 'top';
  /**
   * Set form 'dirty' after form init
   */
  @Input() setFormDirty: boolean = false;
  /**
   * Submitting process. 'true' option will lock for
   *  click and start the spinner in the submit button
   */
  @Input() process: boolean = false;
  /**
   * Returning all form fields value to the parent component
   */
  @Output() formSubmitted = new EventEmitter<any>();
  /** Sending true when user cancel form submitting */
  @Output() cancelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  /** When need to get data of the form without buttons */
  @Output() formDataUpdated: EventEmitter<any> = new EventEmitter<any>();
  /** Send form valid status */
  @Output() isFormInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  /** Emit created form */
  @Output() createdForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public customForm: FormGroup;
  /** Result data from form for submission */
  public formData: any;

  private formSubscription: Subscription = new Subscription();
  constructor() {
  }

  ngOnInit(): void {
    this.generateForm();
  }

  ngOnDestroy() {
    if (!this.showButton) {
      this.formSubscription.unsubscribe();
    }
  }

  removeJSONDots(): void {
    this.formJsonData.fields.forEach(field => {
      field.id = field.id.replace('.', '/');
    });
  }

  /**
   * Generating form by JSON data
   */
  generateForm(): void {
    this.removeJSONDots();
    const group = {};
    if (this.formJsonData?.fields) {
      this.formJsonData?.fields.forEach(inputTemplate => {
        switch (inputTemplate?.type) {
          case 'richText':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : '');
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes, {isRichText: true});
            break;
          case 'text':
          case 'longText':
          case 'password':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : '');
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          case 'dropdownList':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : '');
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          case 'tags':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue
            && inputTemplate?.defaultValue.length > 0 ?
              inputTemplate?.defaultValue : []);
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          case 'multiFile':
          case 'singleFile':
          case 'multiImage':
          case 'singleImage':
            group[inputTemplate?.id] = new FormControl(inputTemplate.defaultValue);
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          case 'checkbox':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : false);
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes, {isCheckbox: true});
            break;
          case 'number':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : null);
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          case 'emailAddress':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue :  '');
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes, {isEmail: true});
            break;
          case 'websiteUrl':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : '');
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes, {isUrl: true});
            break;
          case 'color':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : '#00cf9f');
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes, {isColor: true});
            break;
          case 'booleanTags':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : ['true', 'false']);
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          case 'numberTags':
            if (inputTemplate?.attributes.maxCount) {
              group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
                inputTemplate?.defaultValue : []);
              group[inputTemplate?.id].setValue(this.fillArrayForNumberTags(inputTemplate?.attributes.maxCount));
            } else {
              group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue
              && inputTemplate?.defaultValue.length > 0 ?
                inputTemplate?.defaultValue : [1, 2, 3]);
            }
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          case 'videoUrl':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : '');
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes, {isUrl: true});
            break;
          case 'date':
          case 'datetime':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue);
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          case 'multiselectList':
            if (inputTemplate?.attributes.maxCount && inputTemplate?.attributes.maxCount < 2) {
              group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
                inputTemplate?.defaultValue : [inputTemplate?.options[0]]);
            } else {
              group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue
              && inputTemplate?.defaultValue.length > 0 ?
                inputTemplate?.defaultValue : ['item1', 'item2']);
            }
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes, { isList: true});
            break;
          case 'dynamicFieldArray':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : []);
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes, { isList: true});
            break;
          default:
            break;
        }
      });
      this.customForm = new FormGroup(group);
      if (!this.showButton) {
        this.subscribeToForm();
      }
      if (this.setFormDirty) {
        this.setDirty();
      }
      this.createdForm.emit(this.customForm);
    }
  }

  /**
   * Setting validators array to the chosen control
   */
  setValidators(control: AbstractControl, attributes,
                additional?: {isCheckbox?: boolean, isEmail?: boolean, isUrl?: boolean,
                  isColor?: boolean, isList?: boolean, isRichText?: boolean}): void {
    const validators: ValidatorFn [] = [];
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
            validators.push(this.validatorMinLengthArray(attributes.minCount, additional ?
              additional.isList : false));
          }
          break;
        case 'maxCount':
          if (attributes.maxCount) {
            validators.push(this.validatorMaxLengthArray(attributes.maxCount, additional ?
              additional.isList : false));
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
      validators.push(Validators.email);
    }
    if (additional && additional.isUrl) {
      validators.push(this.urlValidator());
    }
    if (additional && additional.isColor) {
      validators.push(this.colorValidator());
    }
    control.setValidators(validators);
  }

  trackByFieldId(index: number, formElement: any): string {
    return formElement.id;
  }

  /**
   * Creation of the number filled array
   * for 'numberTags' component type
   * @param maxCount max count of the tags
   */
  fillArrayForNumberTags(maxCount): number [] {
    const resultArr: number [] = [];
    for (let i = 0; i < maxCount; i++) {
      resultArr.push(i + 1);
    }
    return  resultArr;
  }
  /**
   * Return 'minLength' validation error, when array length < min.
   */
  validatorMinLengthArray(min: number, showLengthErrorText?: boolean) {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c.value?.length >= min) {
        return null;
      } else {
        if (showLengthErrorText) {
          return {
            minElementsCount: {
              requiredCount: min
            }
          };
        } else {
          return {
            minCount: true
          };
        }
      }
    };
  }
  /**
   * Return 'maxLength' validation error, when array length > max.
   */
  validatorMaxLengthArray(max: number, showLengthErrorText?: boolean) {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c.value?.length <= max) {
        return null;
      } else {
        if (showLengthErrorText) {
          return {
            maxElementsCount: {
              requiredCount: max
            }
          };
        } else {
          return {
            maxCount: true
          };
        }
      }
    };
  }

  /**
   * Custom validator
   * for the url type control
   */
  urlValidator() {
    return (c: AbstractControl): { [key: string]: any } => {
      // regex for url validation
      const reg = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
      const value = c.value;
      if (reg.test(value) || value === '') {
        return null;
      } else {
        return {
          websiteValidator: true
        };
      }
    };
  }

  /**
   * Custom validator for color control
   */
  colorValidator() {
    return (c: AbstractControl): { [key: string]: any } => {
      const value = c.value;
      if ((value.charAt(0) === '#' && value.length === 7) || value === '') {
        return null;
      } else {
        return {
          colorValidator: true
        };
      }
    };
  }
  /**
   * Custom validator of min characters for rich text.
   * Check only characters, not tags
   */
  richTextMinCharactersValidator(min: number) {
    return (c: AbstractControl): { [key: string]: any } => {
      const characters = c.value.replace(/<[^>]*>/g, '');
      if (characters.length >= min) {
        return null;
      } else {
        return {
          minlength: {
            requiredLength: min
          }
        };
      }
    };
  }
  /**
   * Custom validator of max characters for rich text.
   * Check only characters, not tags
   */
  richTextMaxCharactersValidator(max: number) {
    return (c: AbstractControl): { [key: string]: any } => {
      const characters = c.value.replace(/<[^>]*>/g, '');
      if (characters.length <= max) {
        return null;
      } else {
        return {
          maxlength: {
            requiredLength: max
          }
        };
      }
    };
  }
  /**
   * Output event which returns form value
   */
  sendData(): void {
    if (!this.anotherInvalidResult && !this.process) {
      const formData = this.customForm.getRawValue();
      Object.keys(formData).forEach(key => {
        if (key.includes('/')) {
          formData[key.replace('/', '.')] = formData[key];
          delete formData[key];
        }
      });
      if (this.customForm.valid && this.showButton) {
        this.formSubmitted.emit(formData);
      } else {
        this.formDataUpdated.emit(formData);
      }
    }
  }

  cancelForm(): void {
    this.cancelSubmit.emit(true);
  }

  /** Listening to value changes of the form if buttons not applied */
  subscribeToForm(): void {
    this.formSubscription.add(this.customForm.valueChanges.subscribe(() => {
      this.isFormInvalid.emit(this.customForm.invalid);
      this.sendData();
    }));
  }

  private setDirty(): void {
    (Object as any).values(this.customForm.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }
}
