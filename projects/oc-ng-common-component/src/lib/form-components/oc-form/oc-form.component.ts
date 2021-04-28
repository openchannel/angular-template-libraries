import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {OcFormGenerator} from './oc-form-generator';
import {AppFormModel} from '../model/app-form-model';

@Component({
  selector: 'oc-form',
  templateUrl: './oc-form.component.html',
  styleUrls: ['./oc-form.component.scss']
})
export class OcFormComponent implements OnInit, OnDestroy {

  /**
   * JSON with all form data to generate dynamic form
   */
  @Input() formJsonData: AppFormModel;
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
   * Already generated Form Group
   */
  @Input() generatedForm: FormGroup;
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
  constructor() {}

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
    if (this.generatedForm) {
      this.customForm = this.generatedForm;
    } else if (this.formJsonData.fields) {
      this.removeJSONDots();
      this.customForm = new FormGroup(OcFormGenerator.getFormByConfig(this.formJsonData.fields));
    }
    if (!this.showButton) {
      this.subscribeToForm();
    }
    if (this.setFormDirty) {
      this.setDirty();
    }
    this.createdForm.emit(this.customForm);
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
    this.isFormInvalid.emit(this.customForm.invalid);
    this.sendData();

    this.formSubscription.add(this.customForm.valueChanges.subscribe(() => {
      this.isFormInvalid.emit(this.customForm.invalid);
      this.sendData();
    }));
  }

  trackByFieldId(index: number, formElement: any): string {
    return formElement.id;
  }

  getDfaError(dfaControl: AbstractControl, label: string): string {
    return dfaControl.touched && dfaControl.invalid ? 'Please, check all fields inside ' + label : '';
  }

  private setDirty(): void {
    (Object as any).values(this.customForm.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }
}
