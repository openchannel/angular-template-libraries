import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {FileDetails} from 'oc-ng-common-service';
import { Subscription } from 'rxjs';

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
  constructor(private fb: FormBuilder) {
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
          case 'text':
          case 'richText':
          case 'longText':
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
            group[inputTemplate?.id] = new FormControl([]);
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          case 'multiImage':
            group[inputTemplate?.id] = new FormControl([]);
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
              inputTemplate?.defaultValue : 'myemail@example.com');
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes, {isEmail: true});
            break;
          case 'websiteUrl':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : 'https://my.website.com');
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
              inputTemplate?.defaultValue : 'https://my.website.com');
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
                  isColor?: boolean, isList?: boolean}): void {
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
            validators.push(Validators.maxLength(attributes.maxChars));
          }
          break;
        case 'minChars':
          if (attributes.minChars) {
            validators.push(Validators.minLength(attributes.minChars));
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
   * Output event which returns form value
   */
  sendData(): void {
    const formData = this.customForm.getRawValue();
    Object.keys(formData).forEach(key => {
      if (key.includes('/')) {
        formData[key.replace('/', '.')] = formData[key];
        delete formData[key];
      }
    });
    if (this.showButton) {
      this.formSubmitted.emit(formData);
    } else {
      this.formDataUpdated.emit(formData);
    }
  }

  cancelForm(): void {
    this.cancelSubmit.emit(true);
  }

  mockUploadingFile(): FileDetails {
    const currentDate = new Date().getDate();
    const fileDetails = new FileDetails();
    fileDetails.uploadDate = currentDate;
    fileDetails.fileId = `file_id_${currentDate}`;
    fileDetails.fileUploadProgress = 100;
    fileDetails.fileUrl = 'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2015/04/irkutsk_and_lake_baikal/15342550-1-eng-GB/Irkutsk_and_Lake_Baikal.jpg';
    return fileDetails;
  }
  /** Listening to value changes of the form if buttons not applied */
  subscribeToForm(): void {
    this.formSubscription.add(this.customForm.valueChanges.subscribe(() => {
      this.sendData();
      this.isFormInvalid.emit(this.customForm.invalid);
    }));
  }

  private setDirty(): void {
    (Object as any).values(this.customForm.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }
}
