import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subject } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgStyle } from '@angular/common';

/**
 * A component represents a dropdown list and input field which acts as a search for items from this list.
 * For functional of this component was used [Angular Bootstrap Typeahead]{@link https://ng-bootstrap.github.io/#/components/typeahead/examples}
 * @example
 * <oc-dropbox #dropBox
 *    [items]="dropBoxItems"
 *    placeHolder="Placeholder text"
 *    [clearFormAfterSelect]="true"
 *    [dropElementTemplate]="dropElementTemplateExample"
 *    (inputChange)="onInputChange($event)"
 *    (selectedItem)="addTagToResultList($event)">
 * </oc-dropbox>
 */
@Component({
    selector: 'oc-dropbox',
    templateUrl: './oc-dropbox.component.html',
    styleUrls: ['./oc-dropbox.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcDropboxComponent),
            multi: true,
        },
    ],
})
export class OcDropboxComponent implements OnInit, ControlValueAccessor {
    /**
     * (Optional)
     * Placeholder text of the search input field.
     */
    @Input() placeHolder: string = '';

    /**
     * (Optional)
     * Items of the dropdown list.
     */
    @Input() items: string[] = [];

    /**
     * Clear/not clear input text form, after the user, chooses an item.
     * Form will not be cleared by default.
     * @default false
     */
    @Input() clearFormAfterSelect: boolean = false;

    /**
     * Custom style for the search input field.
     * Implements [ngStyle]{@link NgStyle}
     * ## Usage example
     * ` <oc-dropbox [customNgStyle]="{"width": widthValueVariable}"></oc-dropbox> `
     * @example
     * <oc-dropbox [customNgStyle]="{'width': widthValueVariable}"></oc-dropbox>
     */
    @Input() customNgStyle: NgStyle;

    /**
     * String of classes will be added to the general class of the search input field.
     * ## Usage example
     * ` <oc-dropbox customClassStyle="custom-class another-class"></oc-dropbox> `
     * @example
     * <oc-dropbox customClassStyle="custom-class another-class"></oc-dropbox>
     */
    @Input() customClassStyle: string;

    /**
     * The template to override the way resulting items are displayed in the dropdown.
     * @example
     * <ng-template #dropElementTemplate let-result="resultItem">
     *     <span> {{result}}</span>
     * </ng-template>
     */
    @Input() dropElementTemplate: TemplateRef<any>;

    /**
     * Custom function for searching items of the [items array]{@link items}.
     */
    @Input() customSearch: (text: Observable<string>) => Observable<readonly any[]>;

    /**
     * Flag, that determines whether to add custom items by 'Enter' key up (from input).
     * @default false
     */
    @Input() disableAddCustomItemsByEnter: boolean = false;

    /**
     * Emit currently selected item from dropdown to the parent component.
     */
    @Output() readonly selectedItem: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Emit text from the input field to the parent component.
     */
    @Output() readonly inputChange: EventEmitter<string> = new EventEmitter<string>();
    /**
     * Getting the dropbox input element.
     */
    @ViewChild('dropBox', { static: false }) dropBox: ElementRef<HTMLInputElement>;
    /** Listener of the `focus` event */
    focus$: Subject<string> = new Subject<string>();
    /** Listener of the `click` event */
    click$: Subject<string> = new Subject<string>();
    /** Selected item from the dropdown */
    outputSelectedItem: string;
    /** Variable for disable state */
    disabled: boolean = false;

    ngOnInit(): void {
        if (!this.customSearch) {
            this.customSearch = this.defaultSearch;
        }
    }

    /**
     * Toggles dropdown results list. Used by arrow icon.
     */
    toggleResultsDropdown(): void {
        if (this.disabled) {
            return;
        }

        const isListOpened = this.dropBox.nativeElement.getAttribute('aria-expanded') === 'true';
        if (isListOpened) {
            this.clearFocus();
        } else {
            // Simulate input click with latest input value to trigger ngbTypeahead search
            this.click$.next(this.outputSelectedItem);
        }
    }

    /**
     * Launch of the search function
     * @param text$ observable text from the input field
     */
    search = (text$: Observable<string>) => {
        return of(text$, this.focus$, this.click$).pipe(mergeAll(3), e => this.customSearch(e));
    };
    /**
     * Default search function.
     * @param text$ observable text from the input field
     */
    defaultSearch = (text$: Observable<string>) => {
        return text$.pipe(map(searchTag => this.filterItems(searchTag, this.items)));
    };

    /**
     * Filter items from the dropdown list.
     * @param searchItem string from the input field
     * @param items array of the items from the dropdown list
     */
    filterItems(searchItem: string, items: string[]): string[] {
        if (items && searchItem) {
            const lowerTag = searchItem.toLowerCase();
            return this.items.filter(v => v && `${v}`.toLowerCase().indexOf(lowerTag) > -1);
        }
        return items;
    }

    /**
     * Catching selected item from the dropdown list.
     * @param itemEvent item from the [NgbTypeaheadSelectItemEvent]{@link https://ng-bootstrap.github.io/#/components/typeahead/api#NgbTypeaheadSelectItemEvent}
     */
    selectItem(itemEvent?: NgbTypeaheadSelectItemEvent): void {
        if (itemEvent) {
            this.outputSelectedItem = itemEvent.item;
        }
        this.selectedItem.emit(this.outputSelectedItem);
        this.onChange(this.outputSelectedItem);
        this.clearForm(itemEvent);
        this.clearFocus();
    }

    /**
     * Clearing of the search input field.
     * @param itemEvent item from the [NgbTypeaheadSelectItemEvent]{@link https://ng-bootstrap.github.io/#/components/typeahead/api#NgbTypeaheadSelectItemEvent}
     */
    clearForm(itemEvent?: NgbTypeaheadSelectItemEvent): void {
        if (this.clearFormAfterSelect) {
            itemEvent?.preventDefault();
            this.outputSelectedItem = '';
        }
    }

    /**
     * Catching `focus` event.
     * This is necessary for the custom form controls validation.
     */
    onFocus(): void {
        this.onTouched();
    }

    /**
     * Removing focus from the search input field.
     */
    clearFocus(): void {
        this.dropBox.nativeElement.blur();
    }

    /**
     * Calls this function with new value. When user wrote something in the component.
     * It needs to know that new data has been entered in the control.
     */
    registerOnChange(onChange: (value: any) => void): void {
        this.onChange = onChange;
    }

    /**
     * Calls this function when user left chosen component.
     * It needs for validation of custom form controls.
     */
    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    /**
     * this method will be called by the control to pass the value to our component.
     * It is used if the value is changed through the code outside
     * (setValue or changing the variable that ngModel is tied to),
     * as well as to set the initial value.
     */
    writeValue(obj: any): void {
        this.outputSelectedItem = obj ? obj : '';
    }

    /**
     * (Optional)
     * the method will be called by the control when the [disabled] state changes.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
     * Clears the previous value if the user writes a new value.
     * @param event input event from the search field
     */
    clearSelectedValue(event: any): void {
        if (this.outputSelectedItem !== event.target.value) {
            this.onChange('');
        }
    }

    private onTouched = () => {
        // nothing to do
    };

    private onChange: (value: any) => void = () => {
        // nothing to do
    };
}
