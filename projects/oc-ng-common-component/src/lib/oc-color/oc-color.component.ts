import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'oc-color',
  templateUrl: './oc-color.component.html',
  styleUrls: ['./oc-color.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OcColorComponent),
    multi: true
  }]
})
export class OcColorComponent implements OnInit, ControlValueAccessor {

  /** Set 'disable' state for color input */
  @Input() disabled: boolean = false;
  /** Placeholder text for input */
  @Input() placeholder: string = '';
  /** Set position for the color picker. Default: 'bottom-left' */
  @Input() colorPickerPosition: 'auto' | 'top' | 'bottom' | 'left' | 'right' |
  'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'bottom-left';
  @Input()
  set value(val) {
    this.colorValue = val;
    this.onChange(this.colorValue);
  }
  /** Chosen color value */
  public colorValue: string;
  public toggleDialog: boolean = false;

  private onTouched = () => {};
  private onChange: (value: any) => void = () => {};

  constructor() { }

  ngOnInit(): void {
  }
  /**
   * Sending data to the formControl when
   * color is chosen
   */
  onValueChange(): void {
   this.onChange(this.colorValue);
  }
  /**
   * Register touch action
   */
  onFocus(): void {
    this.onTouched();
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
    this.disabled = isDisabled;
  }
  /**
   * this method will be called by the control to pass the value to our component.
   * It is used if the value is changed through the code outside
   * (setValue or changing the variable that ngModel is tied to),
   * as well as to set the initial value.
   */
  writeValue(obj: any): void {
    this.colorValue = obj;
  }
}
