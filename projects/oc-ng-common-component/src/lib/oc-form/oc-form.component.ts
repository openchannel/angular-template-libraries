import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {FileDetails} from 'oc-ng-common-service';
import {Observable, of} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'oc-form',
  templateUrl: './oc-form.component.html',
  styleUrls: ['./oc-form.component.scss']
})
export class OcFormComponent implements OnInit {

  /**
   * JSOM with all form data to generate dynamic form
   */
  @Input() formJsonData: any;

  @Input() anotherInvalidResult = false;

  /**
   * Returning all form fields value to the parent component
   */
  @Output() formSubmitted = new EventEmitter<any>();

  public customForm: FormGroup;
  public formData: any;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.generateForm();
  }

  /**
   * Generating form by JSON data
   */
  generateForm(): void {
    const group = {};
    if (this.formJsonData?.fields) {
      this.formJsonData?.fields.forEach(inputTemplate => {
        switch (inputTemplate?.type) {
          case 'text':
          case 'richText':
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
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
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
            break
          default:
            break;
        }
      });
      this.customForm = new FormGroup(group);
    }
  }

  /**
   * Setting validators array to the chosen control
   */
  setValidators(control: AbstractControl, attributes): void {
    const validators: ValidatorFn [] = [];
    Object.keys(attributes).forEach(key => {
      switch (key) {
        case 'required':
          if (attributes.required) {
            validators.push(Validators.required);
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
            validators.push(this.validatorMinLengthArray(attributes.minCount));
          }
          break;
        case 'maxCount':
          if (attributes.maxCount) {
            validators.push(Validators.maxLength(attributes.maxCount));
          }
          break;
        default:
          break;
      }
    });
    control.setValidators(validators);
  }

  trackByFieldId(index: number, formElement: any): string {
    return formElement.id;
  }

  /**
   * Return 'minLength' validation error, when array length < min.
   */
  validatorMinLengthArray(min: number) {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c.value?.length >= min) {
        return null;
      } else {
        return {
          'minLength': {valid: false}
        };
      }
    }
  }

  /**
   * Output event which returns form value
   */
  sendData(): void {
    this.formSubmitted.emit(this.customForm.getRawValue());
  }

  mockUploadingFile(): FileDetails {
    const currentDate = new Date().getDate();
    const fileDetails = new FileDetails();
    fileDetails.uploadDate = currentDate;
    fileDetails.fileId = `file_id_${currentDate}`
    fileDetails.fileUploadProgress = 100;
    fileDetails.fileUrl = 'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2015/04/irkutsk_and_lake_baikal/15342550-1-eng-GB/Irkutsk_and_Lake_Baikal.jpg';
    return fileDetails;
  }
}
