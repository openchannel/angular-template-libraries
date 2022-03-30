import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { difference } from 'lodash';

/**
 * Multi select list component. Represent input for search tags by name and tags list.
 *
 * @example <oc-multi-select-list [(ngModel)]="resultList" [availableItemsList]="['1','2','3']" [label]="'LABEL'" [description]="'Description'" [defaultItems]="['1']">
 */
@Component({
    selector: 'oc-multi-select-list',
    templateUrl: './oc-multi-select-list.component.html',
    styleUrls: ['./oc-multi-select-list.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcMultiSelectListComponent),
            multi: true,
        },
    ],
})
export class OcMultiSelectListComponent implements OnInit, ControlValueAccessor, OnChanges {
    /**
     * (Required)
     * List of available items to choose in dropbox
     */
    @Input() set availableItemsList(value: any[]) {
        this.availableItems = value;
    }

    /**
     * Set result items array value
     */
    @Input() set value(val: any[]) {
        this.resultItems = val;
        this.onChange(this.resultItems);
    }

    /** Label of the Component */
    @Input() label: string = '';

    /** Placeholder in oc-dropbox input */
    @Input() placeholder: string = '';

    /** Label text of the Oc-Tag-Component */
    @Input() tagTooltipLabelText: string = '';

    /**
     * Description for all list items.
     */
    @Input() description: string = '';

    /**
     * (optional)
     * List of items for automatically adding to the user tags list.
     * Default: `[]`
     */
    @Input() defaultItems: string[] = [];

    availableItems: string[] = [];
    resultItems: any[] = [];
    // tags for DropBox
    dropBoxItems = [];

    ngOnInit(): void {
        this.applyDefaultItems();
        this.dropBoxItems = this.findAvailableDropBoxItems();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (difference(changes.availableItemsList.currentValue, changes.availableItemsList.previousValue)?.length > 0) {
            this.dropBoxItems = this.findAvailableDropBoxItems();
        }
    }

    /**
     * Set default items list to the result list
     */
    applyDefaultItems(): void {
        this.defaultItems.forEach(tag => this.addTagToResultList(tag));
    }

    /**
     * Remove item from selected items list by index
     * @param index index of the chosen item
     */
    removeItem(index: number): void {
        this.resultItems.splice(index, 1);
        this.updateComponentData();
    }

    /**
     * Adding Selected item to the result item list array
     * @param item selected item
     */
    addTagToResultList(item: string): void {
        const itemNormalized = item.trim();
        if (!this.existTagInResultList(itemNormalized)) {
            this.resultItems = [...this.resultItems, item];
            this.updateComponentData();
        }
    }

    /**
     * Filter drop box items that are not yet selected
     */
    findAvailableDropBoxItems(): string[] {
        return this.availableItems.filter(tag => !this.existTagInResultList(tag));
    }

    /**
     * Check is tag already selected
     */
    existTagInResultList(currentTag: string): boolean {
        const tagNormalized = currentTag.toLowerCase();
        return this.resultItems.filter(t => tagNormalized === t.toLowerCase()).length > 0;
    }

    /**
     * Update component filters and result value
     */
    updateComponentData(): void {
        this.dropBoxItems = this.findAvailableDropBoxItems();
        this.onChange(this.resultItems);
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
    // tslint:disable-next-line:prettier
    setDisabledState(isDisabled: boolean): void { // NOSONAR
    }

    /**
     * this method will be called by the control to pass the value to our component.
     * It is used if the value is changed through the code outside
     * (setValue or changing the variable that ngModel is tied to),
     * as well as to set the initial value.
     */
    writeValue(value: any): void {
        this.resultItems = value && value.length ? value.filter(tag => tag && tag.trim().length > 0) : [];
        this.dropBoxItems = this.findAvailableDropBoxItems();
    }

    // tslint:disable-next-line:prettier
    onTouched = () => { // NOSONAR
    };
    // tslint:disable-next-line:prettier
    private onChange: (value: any) => void = () => { // NOSONAR
    };
}
