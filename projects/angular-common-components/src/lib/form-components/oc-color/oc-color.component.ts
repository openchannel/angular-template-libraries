import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Component represents input for color data. User can choose a color from the color picker palette.
 * Or color value can be written into the input field. Component has demonstration square for chosen color.
 * Also this component supports `Abstract Control` format, so it can work with `ngModel` or `formControl`.
 */
@Component({
    selector: 'oc-color',
    templateUrl: './oc-color.component.html',
    styleUrls: ['./oc-color.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcColorComponent),
            multi: true,
        },
    ],
})
export class OcColorComponent implements ControlValueAccessor {
    /** Set value from AbstractControl, like `ngModel` or `formControl` */
    @Input() set value(val: string) {
        this.colorValue = val;
        this.onChange(this.colorValue);
    }
    /** Set `disable` state for color input. User can not interact with this component */
    @Input() disabled: boolean = false;
    /** Placeholder text for input field */
    @Input() placeholder: string = '';
    /**
     * Set position for the color picker button.
     * @default: 'bottom-left'
     */
    @Input() colorPickerPosition: 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' =
        'bottom-left';
    /** Chosen color value */
    colorValue: string;
    /** Toggle Open or Close of the color picker dialog */
    toggleDialog: boolean = false;

    /**
     * Sending data to the formControl when
     * color is chosen
     */
    onValueChange(): void {
        this.onChange(this.colorValue);
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
        this.colorValue = obj;
    }

    /**
     * @ignore
     */
    // prettier-ignore
    private onTouched = () => {}; // NOSONAR
    /**
     * @ignore
     */
    // prettier-ignore
    private onChange: (value: any) => void = () => {}; // NOSONAR
}
