import { Component, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'oc-input',
    templateUrl: './oc-input.component.html',
    styleUrls: ['./oc-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcInputComponent),
            multi: true,
        },
    ],
})
export class OcInputComponent implements OnInit, ControlValueAccessor {
    @Input()
    set value(val) {
        this.inputValue = val;
        this.onChange(this.inputValue);
    }
    @Input() modelName;
    @Input() autoFocus;
    @Input() autocomplete;
    /** Placeholder text for input */
    @Input() placeholder: string = '';
    /**
     * List of classes which can be
     * attached to the current list
     */
    @Input() class: string = '';
    /** Set 'disable' state for input */
    @Input() disabled: boolean = false;
    /** Type of the input. Can be 'text', 'password' or 'email' */
    @Input() inputType: 'text' | 'email' | 'password' = 'text';

    inputValue: string;

    constructor(private el: ElementRef) {}

    onTouched = () => {};

    ngOnInit(): void {
        if (this.autocomplete) {
            this.el.nativeElement.children[0].autocomplete = this.autocomplete;
        }
    }

    changeModelVal(): void {
        this.onChange(this.inputValue);
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
        this.inputValue = obj;
    }
    private onChange: (value: any) => void = () => {};
}
