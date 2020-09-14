import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'oc-form',
  templateUrl: './oc-form.component.html',
  styleUrls: ['./oc-form.component.scss']
})
export class OcFormComponent implements OnInit {

  @Input() formJsonData: any;
  public customForm: FormGroup;
  public formData: any;
  public arrForSelect: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
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
              inputTemplate?.defaultValue : ['']);
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          default:
            break;
        }
      });
      this.customForm = new FormGroup(group);
    }
  }

  setValidators(control: AbstractControl, attributes) {
    Object.keys(attributes).forEach(key => {
      switch (key) {
        case 'required':
          if (attributes.required) {
            control.setValidators(Validators.required);
          }
          break;
        case 'maxChars':
          if (attributes.maxChars) {
            control.setValidators(Validators.minLength(attributes.maxChars));
          }
          break;
        case 'minChars':
          if (attributes.minChars) {
            control.setValidators(Validators.minLength(attributes.minChars));
          }
          break;
        case 'minCount':
          if (attributes.minCount) {
            control.setValidators(Validators.minLength(attributes.minCount));
          }
          break;
        case 'maxCount':
          if (attributes.maxCount) {
            control.setValidators(Validators.minLength(attributes.maxCount));
          }
          break;
        default:
          break;
      }
    });
  }
  showData(): void {
    this.formData = this.customForm.getRawValue();
  }
}
