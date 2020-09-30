import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'oc-dynamic-array-item',
  templateUrl: './oc-dynamic-array-item.component.html',
  styleUrls: ['./oc-dynamic-array-item.component.scss']
})
export class OcDynamicArrayItemComponent implements OnInit {

  /** Data of form fields. Required parameter */
  @Input() set subFields(value) {
    if (value) {
      this.subFieldDefinition = value;
    } else {
      throw Error('Required @Input : subFields');
    }
  }
  /** Index of the current item. Default: 0 */
  @Input() index: number = 0;
  /** data from form fields */
  @Input() formFieldsData = {
    field1: 'Name',
    'long-text': 'Here supposed to be a description',
    ololo: 'meow',
  };

  /** Info about field deletion with field id */
  @Output() deleteField: EventEmitter<boolean> = new EventEmitter<boolean>();
  /** Info about field copy with subFieldDefinition data */
  @Output() copyField: EventEmitter<any> = new EventEmitter<any>();
  /** Sending data from */
  @Output() sendFieldData: EventEmitter<any> = new EventEmitter<any>();

  /** show fields values */
  public showDetail: boolean = false;
  public subFieldDefinition: any [] = [];

  constructor() { }

  ngOnInit(): void {
  }

  changeDetailStatus(): void {
    this.showDetail = !this.showDetail;
  }

  copyCurrentItem() {
    this.copyField.emit(this.subFieldDefinition);
  }

  deleteCurrentItem() {
    this.deleteField.emit(true);
  }

  editFieldsData() {
    this.updateFieldsDefinitions();
    // todo Open form modal for data edition
    this.sendFieldData.emit(this.formFieldsData);
  }

  updateFieldsDefinitions() {
    this.subFieldDefinition.forEach((field) => {
      field.defaultValue = this.formFieldsData[field.label];
    });
  }
}
