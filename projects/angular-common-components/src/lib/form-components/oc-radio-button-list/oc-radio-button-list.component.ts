import { Component, forwardRef, Input, OnInit, TemplateRef } from '@angular/core';
import { DropdownModel, RadioItemValue } from '@openchannel/angular-common-components/src/lib/common-components';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'oc-radio-button-list',
    templateUrl: './oc-radio-button-list.component.html',
    styleUrls: ['./oc-radio-button-list.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcRadioButtonListComponent),
            multi: true,
        },
    ],
})
export class OcRadioButtonListComponent implements OnInit, ControlValueAccessor {
    @Input() set value(value: RadioItemValue) {
        this.componentValue = value;
    }
    /**
     * (Optional)
     * Custom template for the radio list item. If not set, default radio list item will be shown.
     * @default null
     */
    @Input() customRadioItemRef: TemplateRef<DropdownModel<RadioItemValue>> = null;
    /** Set `disable` state for this component. User can not interact with it and change the value */
    @Input() disabled: boolean = false;
    /** Array which will be used for generating a group of the radio buttons */
    @Input() itemsArray: DropdownModel<RadioItemValue>[] = [];
    /** Name of the radio button group */
    @Input() radioButtonGroup: string = '';

    componentValue: RadioItemValue = null;

    constructor() {}

    ngOnInit(): void {}

    onValueChanged(value: RadioItemValue): void {
        if (value !== this.componentValue) {
            this.componentValue = value;
        }
    }
    /**
     * Register touch action
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
        if (obj) {
            this.componentValue = obj;
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
