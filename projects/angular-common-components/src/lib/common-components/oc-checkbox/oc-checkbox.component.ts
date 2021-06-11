import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Openchannel checkbox component. Represents abstract control.
 * Can be used with `ngModel` or `formControl`.
 */
@Component({
    selector: 'oc-checkbox',
    templateUrl: './oc-checkbox.component.html',
    styleUrls: ['./oc-checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcCheckboxComponent),
            multi: true,
        },
    ],
})
export class OcCheckboxComponent implements OnInit, ControlValueAccessor {
    /** Set value from `AbstractControl` */
    @Input() set value(val) {
        this.checked = val;
        this.onChange(this.checked);
    }
    /** Text of the checkbox. Will be placed near checkbox */
    @Input() labelText: string;
    /** Sets asterisk near the label text. Which means that this control is required */
    @Input() requiredIndicator: boolean = false;
    /** Disable current checkbox. User can't interact with this component */
    @Input() disabled: boolean = false;
    /**
     * Output event with checkbox state.
     * Use it when a checkbox isn't a part of the form or not used as `ngModel`.
     */
    @Output() readonly isCheckedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /** Checkbox state value. Can be true or false */
    checked: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    /**
     * Catching changes in the checkbox and updating control.
     */
    changeModelVal(): void {
        this.onTouched();
        this.onChange(this.checked);
        this.isCheckedChange.emit(this.checked);
    }
    /**
     * Register touch/focus action
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
        this.checked = obj;
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
