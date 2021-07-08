import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { DropdownItem, DropdownItemType } from '../model/multi-select-checkbox.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface LocalDropdownItem extends DropdownItem {
    selected: boolean;
}

/**
 * Multi select checkbox list component. Represent input for search tags by a list of checkboxes.
 * @example <oc-multi-select-checkbox-list (selectedItemsOutput)="yourFunction($event)" [itemsArray]="['1']" [defaultItemsArray]="['1']">
 */
@Component({
    selector: 'oc-multi-select-checkbox-list',
    templateUrl: './oc-multi-select-checkbox-list.component.html',
    styleUrls: ['./oc-multi-select-checkbox-list.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcMultiSelectCheckboxListComponent),
            multi: true,
        },
    ],
})
export class OcMultiSelectCheckboxListComponent implements OnInit, ControlValueAccessor {
    /**
     * Sets an array which contains all dropdown items.
     * @type {DropdownItemType[]}.
     */
    @Input('itemsArray') set setItemsArray(items: DropdownItemType[]) {
        this.itemsArray = this.mapToArrayWithDropdownItem(items);
    }

    /**
     * Sets an array which contains all default dropdown items.
     * @type {DropdownItemType[]}.
     */
    @Input('defaultItemsArray') set setDefaultItemsArray(items: DropdownItemType[]) {
        this.defaultItemsArray = this.mapToArrayWithDropdownItem(items);
    }

    /**
     * Sets result items array value.
     * Updates component data.
     */
    @Input() set value(items: DropdownItemType[]) {
        this.itemsArray.forEach(item => (item.selected = false));
        this.mapToArrayWithDropdownItem(items).forEach(selectedItem => this.selectItemStatus(selectedItem, false));
        this.updateComponentData();
    }

    /**
     * Event emitter, passes checked items when components updates.
     */
    @Output() readonly selectedItemsOutput: EventEmitter<DropdownItemType[]> = new EventEmitter<DropdownItemType[]>();

    itemsArray: LocalDropdownItem[] = [];
    defaultItemsArray: LocalDropdownItem[] = [];
    disabled: boolean = false;

    ngOnInit(): void {
        if (this.defaultItemsArray.length > 0) {
            this.defaultItemsArray.forEach(defaultItem => this.selectItemStatus(defaultItem));
        }
        this.updateComponentData();
    }

    /**
     * Takes itemsArray or defaultItemsArray as a parameter.
     * Calls createDropDownItem method for each item.
     * Returns an array of items with LocalDropdownItem type.
     */
    mapToArrayWithDropdownItem(rawItems: DropdownItemType[] = []): LocalDropdownItem[] {
        return (rawItems || []).map(item => this.createDropDownItem(item));
    }

    /**
     * Checks for existing values of each item.
     * Sets 'selected' property as false.
     */
    createDropDownItem(item: DropdownItemType | any): LocalDropdownItem {
        if (item !== null && item !== undefined) {
            if (item.hasOwnProperty('label') && item.hasOwnProperty('value')) {
                return {
                    ...item,
                    selected: false,
                };
            } else if (typeof item === 'number' || typeof item === 'string') {
                return {
                    label: item,
                    value: item,
                    selected: false,
                };
            }
        }
    }

    /**
     * A group of methods to check changes of selected values.
     * updateSelectValueForItem method - finds a current selected item if it exists.
     * Checks if current item is selected.
     */
    switchItemStatus(item: LocalDropdownItem, withOnChange: boolean = true): void {
        this.updateSelectValueForItem(item, !item.selected, withOnChange);
    }

    selectItemStatus(item: LocalDropdownItem, withOnChange: boolean = true): void {
        this.updateSelectValueForItem(item, !item.selected, withOnChange);
    }

    updateSelectValueForItem(item: DropdownItem, selectedValue: boolean, withOnChange: boolean = true): void {
        const selectItem = this.itemsArray.find(resultItem => resultItem.label === item.label);
        if (selectItem) {
            selectItem.selected = selectedValue;
            if (withOnChange) {
                this.updateComponentData();
            }
        }
    }

    /**
     * Calls this function with new value.
     * When user writes something in the component, it needs to know that new data has entered the control.
     */
    registerOnChange(onChange: (value: any) => void): void {
        this.onChange = onChange;
    }

    /**
     * Calls this function when user leaves chosen component.
     * It is needed for validation.
     */
    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    /**
     * (Optional)
     * The method will be called by the control when the [disabled] state changes.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
     * This method will be called by the control to pass the value to our component.
     * It is used if the value is changed through the code outside
     * (setValue or changing the variable that ngModel is tied to),
     * as well as to set the initial value.
     */
    writeValue(value: any[]): void {
        this.mapToArrayWithDropdownItem(value).forEach(item => this.selectItemStatus(item));
    }

    /**
     * Updates component filters and result value.
     */
    private updateComponentData(): void {
        const selectedItems = this.itemsArray.filter(item => item.selected).map(item => item.value);
        this.onChange(selectedItems);
        this.selectedItemsOutput.emit(selectedItems);
    }

    private onTouched = () => {};

    private onChange: (value: any) => void = () => {};
}
