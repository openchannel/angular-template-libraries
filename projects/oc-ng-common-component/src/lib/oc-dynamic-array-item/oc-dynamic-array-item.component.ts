import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OcFormModalComponent } from '../oc-form-modal/oc-form-modal.component';

@Component({
  selector: 'oc-dynamic-array-item',
  templateUrl: './oc-dynamic-array-item.component.html',
  styleUrls: ['./oc-dynamic-array-item.component.scss']
})
export class OcDynamicArrayItemComponent implements OnInit {

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
  /** Info about field deletion with field id */
  @Output() deleteField: EventEmitter<boolean> = new EventEmitter<boolean>();
  /** Info about field copy with subFieldDefinition data */
  @Output() copyField: EventEmitter<any> = new EventEmitter<any>();
  /** Sending data from */
  @Output() sendFieldData: EventEmitter<any> = new EventEmitter<any>();

  public subFieldDefinition: any [] = [];

  constructor() { }

  ngOnInit(): void {
  }

  deleteCurrentItem() {
    this.deleteField.emit(false);
  }

  editFieldsData() {
    this.sendFieldData.emit(this.updateFieldsDefinitions());
  }

  updateFieldsDefinitions() {
    const newFields = JSON.parse(JSON.stringify(this.subFieldDefinition));
    return newFields.map((field) => {
      field.defaultValue = this.formFieldsData[field.id];
      return field;
    });
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
}
