import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {OcFormGenerator} from '../oc-form/oc-form-generator';
import {FormArrayItem} from 'oc-ng-common-component/src/lib/common-components';
import {AppFormField} from '../model/app-form-model';

@Component({
  selector: 'oc-dynamic-field-array',
  templateUrl: './oc-dynamic-field-array.component.html',
  styleUrls: ['./oc-dynamic-field-array.component.scss'],
})
export class OcDynamicFieldArrayComponent implements OnInit {

  /**
   * Fields definition config necessary for the DFA generation
   * @param value fields definition config
   */
  @Input() set fieldDefinitionData(value: AppFormField) {
    if (value) {
      this.fieldDefinition = value;
    } else {
      throw Error('FieldDefinitionData is required @Input() parameter');
    }
  }
  /**
   * Generated Form Array for the DFA
   */
  @Input() dfaFormArray: FormArray;

  public formsArrayConfig: FormArrayItem [] = [];
  public fieldDefinition: AppFormField;

  constructor() { }

  ngOnInit(): void {
    this.generateConfigForCreatedForms();
  }

  generateConfigForCreatedForms() {
    if (this.dfaFormArray && this.dfaFormArray.controls.length > 0) {
      this.dfaFormArray.controls.forEach((control) => {
        this.formsArrayConfig.push({
          isEdit: false,
          new: false,
          formData: control.value
        });
      });
    }
  }

  saveItemFieldsData(formItem: FormArrayItem, control: AbstractControl): void {
    formItem.isEdit = false;
    formItem.new = false;
    formItem.formData = control.value;
  }

  deleteDynamicItem(isNewItem, index): void {
    this.dfaFormArray.removeAt(index);
    this.formsArrayConfig.splice(index, 1);
  }

  addNewArrayItem(): void {
    const newGroup = new FormGroup(OcFormGenerator.getFormByConfig(this.fieldDefinition.fields));

    if (this.fieldDefinition.attributes.ordering  === 'append') {
      this.formsArrayConfig.push({
        new: true,
        isEdit: true,
        formData: null
      });
      this.dfaFormArray.push(newGroup);
    } else {
      this.formsArrayConfig.splice(0, 0, {
        new: true,
        isEdit: true,
        formData: null
      });
      this.dfaFormArray.insert(0, newGroup);
    }
  }

  cancelArrayItemAdding(index: number, isNewItem: boolean, formControl: AbstractControl) {
    if (!isNewItem) {
      formControl.setValue({...this.formsArrayConfig[index].formData});
      this.formsArrayConfig[index].isEdit = false;
    } else {
      this.formsArrayConfig.splice(index, 1);
      this.dfaFormArray.removeAt(index);
    }
  }

  editDFAItemData(fieldsDefinitions, index) {
    this.formsArrayConfig[index] = {
      ...this.formsArrayConfig[index],
      isEdit: true
    };
  }

  getLabelValue(dataObject, rowLabel) {
    return dataObject[rowLabel];
  }

  trackByFieldIndex(index: number, item): number {
    return index;
  }
}
