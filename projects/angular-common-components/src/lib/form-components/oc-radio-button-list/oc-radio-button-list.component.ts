import { Component, forwardRef, Input, TemplateRef } from '@angular/core';
import {
    DropdownModel,
    RadioButtonLayout,
    RadioItemValue,
    TransformTextType,
} from '@openchannel/angular-common-components/src/lib/common-components';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Component represents a radio button group where user can choose only one value.
 * This component supports the `ngModel` or `formControl`.
 * @example
 * <oc-radio-button-list [ngModel]="myValue"
 *                       [itemsArray]="[{ label: 'First', value: 1 }, { label: 'Second', value: 2 }]"
 *                       radioButtonGroup="order"></oc-radio-button-list>
 */
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
export class OcRadioButtonListComponent implements ControlValueAccessor {
    @Input() set value(value: RadioItemValue) {
        this.componentValue = value;
    }

    /** Array which will be used for generating a group of the radio buttons */
    @Input('itemsArray') set listItemsArray(value: any[]) {
        this.itemsArray = value.map(item => this.mapToDropdownModel(item));
    }

    /**
     * (Optional)
     * Custom template for the radio list item. If not set, default radio list item will be shown.
     * @default null
     */
    @Input() customRadioItemRef: TemplateRef<DropdownModel<RadioItemValue>> = null;
    /** Set `disable` state for this component. User can not interact with it and change the value */
    @Input() disabled: boolean = false;
    /** Name of the radio button group */
    @Input() radioButtonGroup: string = '';

    @Input() radioButtonLayout: RadioButtonLayout = 'vertical';

    @Input() transformText: TransformTextType = null;

    componentValue: RadioItemValue = null;
    itemsArray: DropdownModel<RadioItemValue>[] = [];

    /**
     * Catching changes of ngModel and setting new value if it has been changed
     * @param {RadioItemValue} value value of the chosen radio button
     */
    onValueChanged(value: RadioItemValue): void {
        if (value !== this.componentValue) {
            this.componentValue = value;
            this.onChange(this.componentValue);
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
     * Transform item of the values array to [Dropdown model]{@link DropdownModel}
     * @param item item of the options array
     * @private
     */
    private mapToDropdownModel(item: any): DropdownModel<RadioItemValue> {
        if (item && !item.hasOwnProperty('label')) {
            return {
                label: item.toString() || '',
                value: item,
            };
        } else {
            return item;
        }
    }

    // tslint:disable-next-line:prettier
    private onTouched = () => { // NOSONAR
    };

    // tslint:disable-next-line:prettier
    private onChange: (value: any) => void = () => { // NOSONAR
    };
}
