import { Component, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'oc-number',
  templateUrl: './oc-number.component.html',
  styleUrls: ['./oc-number.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OcNumberComponent),
    multi: true
  }],
})
export class OcNumberComponent implements OnInit, ControlValueAccessor {
  @Input()
  set value(val) {
    this.inputNumber = this.parseNumber(val);
    this.onChange(this.inputNumber);
  }

  constructor(private el: ElementRef) { }

  @Input() autocomplete;
  /** Set autofocus on input. Default: false */
  @Input() autoFocus: boolean = false;
  /** Placeholder text for input */
  @Input() placeholder: string = '';
  /**
   * List of the custom classes which
   *  can be added to the current classes
   */
  @Input() customClass: string = '';
  /** Style object for input */
  @Input() customStyle: any;
  /** Set disable state for input */
  @Input() disabled: boolean = false;
  /** Value in the input */
  public inputNumber: number;

  private regex = new RegExp(/[^\d.]/g);

  private onTouched = () => {};
  private onChange: (value: any) => void = () => {};

  ngOnInit(): void {
    if (this.autocomplete) {
      this.el.nativeElement.children[0].autocomplete = this.autocomplete;
    }
    if (this.autoFocus) {
      setTimeout(() => this.el.nativeElement.children[0].focus(), 0);
    }
  }

  changeModelVal() {
    this.onChange(this.inputNumber);
  }
  /**
   * Register touch action
   */
  onFocus(): void {
    this.onTouched();
  }
  /**
   * Register paste action
   */
  onPaste(event: ClipboardEvent) {
    const newData = event.clipboardData.getData('text');
    setTimeout(() => {
      this.inputNumber = this.parseNumber(newData);
      this.onChange(this.inputNumber);
    }, 0);
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
    this.inputNumber = this.parseNumber(obj);
  }

  parseNumber(inputString): number {
    if ( typeof inputString  === 'string') {
      return Number(inputString.replace(this.regex, ''));
    } else {
      return inputString;
    }
  }
}
