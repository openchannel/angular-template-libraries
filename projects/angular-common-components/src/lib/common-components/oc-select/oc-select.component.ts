import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'oc-select',
    templateUrl: './oc-select.component.html',
    styleUrls: ['./oc-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcSelectComponent),
            multi: true,
        },
    ],
})
export class OcSelectComponent implements OnInit, ControlValueAccessor {

    /** Set selected value */
    @Input() set value(val) {
        this.selectedValue = val;
        this.changeInputLabel();
        this.onChange(this.selectedValue);
    }
    /** Placeholder */
    @Input() placeholder: string;
    /** Array of the select items */
    @Input() selectValArr: any | object[] = [];
    /** Set object field name using as label */
    @Input() labelField: string;
    /** Disable select for user input */
    @Input() disabled: boolean = false;
    /** Add string of public classes to the existed */
    @Input() class: string = '';

    selectedValue: any;
    inputLabel: string;

    ngOnInit(): void {
        this.changeInputLabel();
    }

    onSelectionChange(event: any): void {
        this.selectedValue = event;
        this.changeInputLabel();
        this.onChange(this.selectedValue);
    }

    onblur(): void {
        this.onTouched();
    }

    changeInputLabel(): void {
        if (this.selectedValue) {
            this.inputLabel = this.labelField ? this.selectedValue[this.labelField] : this.selectedValue;
        } else {
            this.inputLabel = this.placeholder;
        }
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
        this.selectedValue = obj;
        this.changeInputLabel();
    }

    private onTouched = () => {};
    private onChange: (value: any) => void = () => {};
}
