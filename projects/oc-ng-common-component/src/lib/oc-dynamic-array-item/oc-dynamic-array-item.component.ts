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
      this.subFieldDefinition = value;
    } else {
      throw Error('Required @Input : subFields');
    }
  }
  /** Index of the current item. Default: 0 */
  @Input() index: number = 0;
  /** data from form fields */
  @Input() formFieldsData: any;

  /** Info about field deletion with field id */
  @Output() deleteField: EventEmitter<boolean> = new EventEmitter<boolean>();
  /** Info about field copy with subFieldDefinition data */
  @Output() copyField: EventEmitter<any> = new EventEmitter<any>();
  /** Sending data from */
  @Output() sendFieldData: EventEmitter<any> = new EventEmitter<any>();

  /** show fields values */
  public showDetail: boolean = false;
  public subFieldDefinition: any [] = [];

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
  }

  changeDetailStatus(): void {
    this.showDetail = !this.showDetail;
  }

  copyCurrentItem() {
    this.updateFieldsDefinitions();
    this.copyField.emit(this.subFieldDefinition);
  }

  deleteCurrentItem() {
    this.deleteField.emit(true);
  }

  editFieldsData() {
    this.updateFieldsDefinitions();
    const modalRef = this.modal.open(OcFormModalComponent, {size: 'lg'});
    modalRef.componentInstance.formJSONData = {
      fields: this.subFieldDefinition
    };
    modalRef.result.then(result => {
      if (result.status === 'success') {
        this.sendFieldData.emit(result.data);
      }
    });
  }

  updateFieldsDefinitions() {
    this.subFieldDefinition.forEach((field) => {
      field.defaultValue = this.formFieldsData[field.id];
    });
  }
}
