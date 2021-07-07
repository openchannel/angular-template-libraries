import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'oc-radio-button',
    templateUrl: './oc-radio-button.component.html',
    styleUrls: ['./oc-radio-button.component.scss'],
})
export class OcRadioButtonComponent implements OnInit, ControlValueAccessor {
    /** Set value from AbstractControl, like `ngModel` or `formControl` */
    @Input() set value(val: any) {
        this.radioButtonValue = val;
        this.onChange(this.radioButtonValue);
    }
    /** Set `disable` state for color input. User can not interact with this component */
    @Input() disabled: boolean = false;
    /** Text of the radio button. Will be placed near this input */
    @Input() labelText: string;
    /** Sets asterisk near the label text. Which means that this control is required */
    @Input() requiredIndicator: boolean = false;
    @Input() radioButtonGroupName: string = '';

    radioButtonValue: any;
    constructor() {}

    ngOnInit(): void {}
    /**
     * Sending data to the formControl when this radio button has been clicked.
     */
    onChosenRadio(): void {
        this.onChange(this.radioButtonValue);
    }
    /**
     * Register blur action. This is necessary for form control validation.
     */
    onBlur(): void {
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
        if (obj || obj === 0) {
            this.radioButtonValue = obj;
        }
    }

    /**
     * @ignore
     */
    private onTouched = () => {};
    /**
     * @ignore
     */
    private onChange: (value: any) => void = () => {};
}
