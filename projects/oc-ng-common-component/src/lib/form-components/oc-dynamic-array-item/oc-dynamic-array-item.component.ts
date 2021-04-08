import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'oc-dynamic-array-item',
  templateUrl: './oc-dynamic-array-item.component.html',
  styleUrls: ['./oc-dynamic-array-item.component.scss']
})
export class OcDynamicArrayItemComponent {

  /** Data of form fields. Required parameter */
  @Input() set subFields(value) {
    if (value) {
      this.subFieldDefinition = [...value];
    } else {
      throw Error('Required @Input : subFields');
    }
  }
  /** Index of the current item. Default: 0 */
  @Input() index: number = 0;
  /** data from form fields */
  @Input() formFieldsData: any;
  /**
   * ID of the form field which data
   * will be set for array item label.
   * Default: empty
   */
  @Input() fieldLabelId: string = '';
  /**
   * Generated form for the item
   */
  @Input() dfaForm: FormGroup;
  /** Info about field deletion with field id */
  @Output() deleteField: EventEmitter<boolean> = new EventEmitter<boolean>();
  /** Sending data from */
  @Output() sendFieldData: EventEmitter<any> = new EventEmitter<any>();

  public subFieldDefinition: any [] = [];

  constructor() { }

  deleteCurrentItem() {
    this.deleteField.emit(true);
  }

  editFieldsData() {
    this.sendFieldData.emit(null);
  }

  getFieldData(fieldData): string | 'object' [] {
    if (Array.isArray(fieldData)) {
      if (typeof fieldData[0] === 'object') {
        return 'object';
      } else {
        return fieldData.join();
      }
    } else {
      return fieldData;
    }
  }

  getSubFieldsOfItem(fieldId: string) {
    return this.subFieldDefinition.find(field => field.id === fieldId && field.type === 'dynamicFieldArray');
  }

  trackByFieldKey(index: number, field): string {
    return Object.keys(field)[0];
  }
}
