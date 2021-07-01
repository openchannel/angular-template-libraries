import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { DropdownItem, DropdownItemType } from '../model/multi-select-checkbox.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface LocalDropdownItem extends DropdownItem {
    selected: boolean;
}

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
    @Input('itemsArray') set setItemsArray(items: DropdownItemType[]) {
        this.itemsArray = this.mapToArrayWithDropdownItem(items);
    }

    @Input('defaultItemsArray') set setDefaultItemsArray(items: DropdownItemType[]) {
        this.defaultItemsArray = this.mapToArrayWithDropdownItem(items);
    }

    /**
     * Set result items array value
     */
    @Input() set value(items: DropdownItemType[]) {
        this.itemsArray.forEach(item => (item.selected = false));
        this.mapToArrayWithDropdownItem(items).forEach(selectedItem => this.selectItemStatus(selectedItem, false));
        this.updateComponentData();
    }

    @Output() readonly selectedItemsOutput: EventEmitter<DropdownItemType[]> = new EventEmitter<DropdownItemType[]>();

    itemsArray: LocalDropdownItem[] = [];
    defaultItemsArray: LocalDropdownItem[] = [];

    ngOnInit(): void {
        if (this.defaultItemsArray.length > 0) {
            this.defaultItemsArray.forEach(defaultItem => this.selectItemStatus(defaultItem));
        }
        this.updateComponentData();
    }

    mapToArrayWithDropdownItem(rawItems: DropdownItemType[] = []): LocalDropdownItem[] {
        return (rawItems || []).map(item => this.createDropDownItem(item));
    }

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
     * Update component filters and result value
     */
    updateComponentData(): void {
        const selectedItems = this.itemsArray.filter(item => item.selected).map(item => item.value);
        this.onChange(selectedItems);
        this.selectedItemsOutput.emit(selectedItems);
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
    }

    /**
     * this method will be called by the control to pass the value to our component.
     * It is used if the value is changed through the code outside
     * (setValue or changing the variable that ngModel is tied to),
     * as well as to set the initial value.
     */
    writeValue(value: any[]): void {
        this.mapToArrayWithDropdownItem(value).forEach(item => this.selectItemStatus(item));
    }

    private onTouched = () => {
    };

    private onChange: (value: any) => void = () => {
    };
}
