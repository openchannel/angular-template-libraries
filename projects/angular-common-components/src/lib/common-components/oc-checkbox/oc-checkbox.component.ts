import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    /** Set value from AbstractControl */
    @Input() set value(val) {
        this.checked = val;
        this.onChange(this.checked);
    }
    /** Text near checkbox */
    @Input() labelText: string;
    /** Set 'required' indicator near the label */
    @Input() requiredIndicator: boolean = false;
    /** Disable checkbox */
    @Input() disabled: boolean = false;
    /**
     * Output event with checkbox state.
     * Use it when a checkbox isn't a part of the form
     */
    @Output() isCheckedChange = new EventEmitter<any>();
    /** Checkbox state value. Can be true or false */
    checked: boolean = false;

    constructor() {}

    ngOnInit(): void {}

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

    private onTouched = () => {};
    private onChange: (value: any) => void = () => {};
}
