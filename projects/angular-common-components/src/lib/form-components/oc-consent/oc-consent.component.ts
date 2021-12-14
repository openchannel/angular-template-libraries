import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
//todo create a story for this component
@Component({
    selector: 'oc-consent',
    templateUrl: './oc-consent.component.html',
    styleUrls: ['./oc-consent.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcConsentComponent),
            multi: true,
        },
    ],
})
export class OcConsentComponent implements ControlValueAccessor {
    /** Set value from AbstractControl */
    @Input() set value(val: boolean) {
        this.checked = val;
        this.onChange(this.checked);
    }
    /** Disable current checkbox. User can't interact with this component */
    @Input() disabled: boolean = false;
    @Input() termsUrl: string;
    @Input() policyUrl: string;
    /**
     * Output event with checkbox state.
     * Use it when a consent isn't a part of the form or not used as `ngModel`.
     */
    @Output() readonly checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /** Checkbox state value. Can be true or false */
    checked: boolean = false;
    /**
     * Catching changes in the checkbox and updating control.
     */
    changeModelVal(): void {
        this.onTouched();
        this.onChange(this.checked);
        this.checkedChange.emit(this.checked);
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
