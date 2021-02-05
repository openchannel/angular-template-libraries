import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface FormArrayItem {
  fields: any;
  index: number;
  fieldsData: any;
  new: boolean;
}

@Component({
  selector: 'oc-dynamic-field-array',
  templateUrl: './oc-dynamic-field-array.component.html',
  styleUrls: ['./oc-dynamic-field-array.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OcDynamicFieldArrayComponent),
    multi: true
  }],
})
export class OcDynamicFieldArrayComponent implements OnInit, ControlValueAccessor {

  @Input() set fieldDefinitionData(value) {
    if (value) {
      this.fieldDefinition = value;
    } else {
      throw Error('FieldDefinitionData is required @Input() parameter');
    }
  }
  @Input()
  set value(val) {
    this.fieldsDataArray = val;
    this.onChange(this.fieldsDataArray);
  }

  public fieldsDataArray: any [] = [];
  public formsArray: FormArrayItem [] = [];
  public fieldDefinition: any;
  public hiddenItemsIndexArray: number [] = [];

  constructor() { }

  private onTouched = () => {};
  private onChange: (value: any) => void = () => {};

  ngOnInit(): void {
  }

  /**
   * Calls this function with new value. When user wrote something in the component
   * It needs to know that new data has been entered in the control.
   */
  registerOnChange(onChange: (value: any) => void): void {
    this.onChange = onChange;
  }
  /**
   * Calls this function when user left chosen component.
   * It needs for validation
   */
  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }
  /**
   * (Optional)
   * the method will be called by the control when the [disabled] state changes.
   */
  setDisabledState(isDisabled: boolean): void {
  }
  /**
   * this method will be called by the control to pass the value to our component.
   * It is used if the value is changed through the code outside
   * (setValue or changing the variable that ngModel is tied to),
   * as well as to set the initial value.
   */
  writeValue(obj: any): void {
    this.fieldsDataArray = obj;
  }

  saveItemFieldsData(formItem: FormArrayItem, index?: number): void {
    if (formItem.new) {
      this.addDataToDFA(formItem.fieldsData);
    } else {
      this.fieldsDataArray[formItem.index] = formItem.fieldsData;
      this.hiddenItemsIndexArray.splice(this.hiddenItemsIndexArray.indexOf(formItem.index), 1);
    }
    this.cancelArrayItemAdding(index);
    this.onChange(this.fieldsDataArray);
  }

  deleteDynamicItem(isNewItem, index): void {
    if (!isNewItem) {
      this.fieldsDataArray.splice(index, 1);
    }
    this.cancelArrayItemAdding(index);
    this.onChange(this.fieldsDataArray);
  }

  addNewArrayItem(): void {
    this.formsArray.push({
      fields: this.fieldDefinition.subFieldDefinitions,
      index: this.fieldsDataArray.length,
      fieldsData: null,
      new: true
    });
  }

  cancelArrayItemAdding(index: number) {
    this.formsArray.splice(index, 1);
  }

  onFieldDataUpdates(data, form) {
    form.fieldsData = data;
  }

  editDFAItemData(fieldsDefinitions, index) {
    this.formsArray.push({
      fields: fieldsDefinitions,
      index,
      fieldsData: this.fieldsDataArray[index],
      new: false
    });

    this.hiddenItemsIndexArray.push(index);
  }

  addDataToDFA(fieldsData) {
    if (this.fieldDefinition.attributes.ordering  === 'append') {
      this.fieldsDataArray.push(fieldsData);
    } else {
      this.fieldsDataArray.splice(0, 0, fieldsData);
    }
    this.onChange(this.fieldsDataArray);
  }

  getHiddenItemIndex(index: number): boolean {
    return !!this.formsArray.find(form => form.index === index);
  }

  getLabelValue(dataObject, rowLabel) {
    return dataObject[rowLabel];
  }
}
