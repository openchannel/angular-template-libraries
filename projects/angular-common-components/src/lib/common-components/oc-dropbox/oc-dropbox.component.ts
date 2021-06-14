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
    styleUrls: ['./oc-dropbox.component.scss'],
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
     * ` <oc-dropbox [customNgStyle]="{'width': widthValueVariable}"></oc-dropbox> `
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
     * selectedItem - return currently selected item.
     */
    @Output() selectedItem: EventEmitter<string> = new EventEmitter<string>();

    /**
     * inputChange - return text from input.
     */
    @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('dropBox', { static: false })
    dropBox: ElementRef<HTMLInputElement>;

    focus$: Subject<string> = new Subject<string>();
    click$: Subject<string> = new Subject<string>();

    outputSelectedItem: string;
    disabled: boolean = false;

    constructor() {}

    ngOnInit(): void {
        if (!this.customSearch) {
            this.customSearch = this.defaultSearch;
        }
    }

    search = (text$: Observable<string>) => {
        return of(text$, this.focus$, this.click$).pipe(mergeAll(3), e => this.customSearch(e));
    };

    defaultSearch = (text$: Observable<string>) => {
        return text$.pipe(map(searchTag => this.filterItems(searchTag, this.items)));
    };

    filterItems(searchItem: string, items: string[]): string[] {
        if (items && searchItem) {
            const lowerTag = searchItem.toLowerCase();
            return this.items.filter(v => v && `${v}`.toLowerCase().indexOf(lowerTag) > -1);
        }
        return items;
    }

    selectItem(itemEvent: NgbTypeaheadSelectItemEvent): void {
        this.outputSelectedItem = itemEvent.item;
        this.selectedItem.emit(this.outputSelectedItem);
        this.onChange(this.outputSelectedItem);
        this.clearForm(itemEvent);
        this.clearFocus();
    }

    clearForm(itemEvent: NgbTypeaheadSelectItemEvent): void {
        if (this.clearFormAfterSelect) {
            itemEvent.preventDefault();
            this.outputSelectedItem = '';
        }
    }

    onFocus(): void {
        this.onTouched();
    }

    clearFocus(): void {
        this.dropBox.nativeElement.blur();
    }

    registerOnChange(onChange: (value: any) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    writeValue(obj: any): void {
        this.outputSelectedItem = obj ? obj : '';
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    clearSelectedValue(event: any): void {
        if (this.outputSelectedItem !== event.target.value) {
            this.onChange('');
        }
    }

    private onTouched = () => {};

    private onChange: (value: any) => void = () => {};
}
