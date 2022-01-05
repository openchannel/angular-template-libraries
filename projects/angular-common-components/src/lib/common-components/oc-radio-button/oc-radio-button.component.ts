import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TransformTextType } from '../model/text-transfrom-pipe.model';

/**
 * Represents the simple radio button component. It supports the `ngModel` and `formControl`.
 * @example
 * <oc-radio-button [value]="myValue"
 *                  labelText="Test label"
 *                  [ngModel]="resultValue"
 *                  (ngModelChange)="onValueChanged($event)"
 *                  [requiredIndicator]="true"></oc-radio-button>
 */
@Component({
    selector: 'oc-radio-button',
    templateUrl: './oc-radio-button.component.html',
    styleUrls: ['./oc-radio-button.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcRadioButtonComponent),
            multi: true,
        },
    ],
})
export class OcRadioButtonComponent implements ControlValueAccessor {
    /** Set value from AbstractControl, like `ngModel` or `formControl` */
    @Input() set value(val: any) {
        this.radioButtonValue = val;
    }
    /** Set `disable` state for color input. User can not interact with this component */
    @Input() disabled: boolean = false;
    /** Text of the radio button. Will be placed near this input */
    @Input() labelText: string;
    /** Sets asterisk near the label text. Which means that this control is required */
    @Input() requiredIndicator: boolean = false;
    /** Set radio button group name property for the Radio Button, this is necessary for creation of a radio button group */
    @Input() radioButtonGroupName: string = '';

    @Input() transformText: TransformTextType = null;

    radioButtonValue: any;
    isChecked: boolean = false;

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
        this.isChecked = obj === this.radioButtonValue;
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
