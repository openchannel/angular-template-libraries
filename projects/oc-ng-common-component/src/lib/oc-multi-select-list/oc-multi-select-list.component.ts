import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'oc-multi-select-list',
  templateUrl: './oc-multi-select-list.component.html',
  styleUrls: ['./oc-multi-select-list.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OcMultiSelectListComponent),
    multi: true
  }]
})
export class OcMultiSelectListComponent implements OnInit, ControlValueAccessor, OnChanges {

  /** Label of the Component */
  @Input() label: string = '';
  /**
   * Description for all list items.
   * Default: empty
   */
  @Input() description: string = '';
  /**
   * (Required)
   * List of available items to choose in dropbox
   * Default: empty string []
   */
  @Input() set availableItemsList(value: any[]) {
    if (value && value.length > 0) {
      this.availableItems = value;
    } else {
      throw Error('availableItemsList is required!');
    }
  }
  /**
   * (optional)
   * List of items for automatically adding to the user tags list.
   * Default: empty string []
   */
  @Input() defaultItems = [];
  /**
   * Set result items array value
   */
  @Input()
  set value(val) {
    this.resultItems = val;
    this.onChange(this.resultItems);
  }

  public availableItems: string [] = [];
  public resultItems: any [] = [];
  // tags for DropBox
  public dropBoxItems = [];

  private onTouched = () => {};
  private onChange: (value: any) => void = () => {};

  constructor() { }

  ngOnInit(): void {
    this.applyDefaultItems();
    this.dropBoxItems = this.findAvailableDropBoxItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.availableTags && changes.availableTags.previousValue !== changes.availableTags.currentValue) {
      this.dropBoxItems = this.findAvailableDropBoxItems();
    }
  }

  /**
   * Set default items list to the result list
   */
  applyDefaultItems(): void {
    this.defaultItems.forEach(tag => this.addTagToResultList(tag));
  }
  /**
   * Remove item from selected items list by index
   * @param index index of the chosen item
   */
  removeItem(index: number) {
    this.resultItems.splice(index, 1);
    this.updateComponentData();
  }

  /**
   * Adding Selected item to the result item list array
   * @param item selected item
   */
  addTagToResultList(item: string) {
    const itemNormalized = item.trim();
    if (!this.existTagInResultList(itemNormalized)) {
      this.resultItems = [...this.resultItems, item];
      this.updateComponentData();
    }
  }

  findAvailableDropBoxItems(): string [] {
    return this.availableItems.filter(tag => !this.existTagInResultList(tag));
  }

  existTagInResultList(currentTag: string): boolean {
      const tagNormalized = currentTag.toLowerCase();
      return this.resultItems.filter(t => tagNormalized === t.toLowerCase()).length > 0;
  }
  /**
   * Update component filters and result value
   */
  updateComponentData(): void {
    this.dropBoxItems = this.findAvailableDropBoxItems();
    this.onChange(this.resultItems);
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
    if (obj && obj.length > 0) {
        this.resultItems = obj.filter(tag => tag && tag.trim().length > 0);
    } else {
      this.resultItems = [];
    }
  }
}
