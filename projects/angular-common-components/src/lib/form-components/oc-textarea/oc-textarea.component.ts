import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'oc-textarea',
  templateUrl: './oc-textarea.component.html',
  styleUrls: ['./oc-textarea.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OcTextareaComponent),
    multi: true
  }],
})
export class OcTextareaComponent implements ControlValueAccessor {

  /**
   * Placeholder text
   * Default: empty
   */
  placeholderValue: string = '';
  @Input() set placeholder(placeholder: string) {
    if(placeholder) {
      this.placeholderValue = placeholder;
    }
  }
  /**
   * Add class list to the current class list
   * Required string with class names
   * separated by space
   */
  @Input() customClass: string = '';
  /**
   * Disable this field for user input.
   * Default: false
   */
  @Input() disabled: boolean = false;
  /**
   * Set field required. Default: false
   */
  @Input() required: boolean = false;
  /**
   * rows of textarea. Default: 5
   */
  @Input() rows: number = 5;
  @Input()
  set value(val) {
    this.textAreaValue = val;
    this.onChange(this.textAreaValue);
  }

  public textAreaValue: string;

  private onTouched = () => {};
  private onChange: (value: any) => void = () => {};


  /**
   * set value to control on value changing
   */
  changeModelVal(): void {
    this.onChange(this.textAreaValue);
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
    this.textAreaValue = obj;
  }
}
