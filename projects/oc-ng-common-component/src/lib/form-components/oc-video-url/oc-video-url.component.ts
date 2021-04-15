import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'oc-video-url',
  templateUrl: './oc-video-url.component.html',
  styleUrls: ['./oc-video-url.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OcVideoUrlComponent),
    multi: true
  }],
})
export class OcVideoUrlComponent implements ControlValueAccessor {

  @Input() modelName;
  @Input() autoFocus;
  /** Placeholder text for input */
  @Input() placeholder: string = '';
  /**
   * List of classes which can be
   * attached to the current list
   */
  @Input() class: string = '';
  /** Set 'disable' state for input */
  @Input() disabled: boolean = false;
  /** Type of the input. Can be 'text' or 'email' */
  @Input() inputType: string = 'text';
  @Input()
  set value(val) {
    this.videoUrl = val;
    this.onChange(this.videoUrl);
    this.verifyVideoUrl();
  }

  videoUrl: string;
  isValidUrl: boolean = false;

  private onTouched = () => {};
  private onChange: (value: any) => void = () => {};

  constructor() {}

  emitChanges(): void {
    this.onChange(this.videoUrl);
    this.verifyVideoUrl();
  }

  verifyVideoUrl(): void {
    const reg = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
    this.isValidUrl = reg.test(this.videoUrl);
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
    this.videoUrl = obj;
    this.verifyVideoUrl();
  }
}
