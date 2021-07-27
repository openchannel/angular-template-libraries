import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'oc-text-search',
    templateUrl: './oc-text-search.component.html',
    styleUrls: ['./oc-text-search.component.css'],
})
export class OcTextSearchComponent {
    /**
     * A model for search text value which is entered by a user.
     * @type {string}.
     */
    @Input() searchText: string;

    /**
     * (Optional)
     * Input placeholder text.
     * @type {string}.
     * @default 'search'.
     */
    @Input() placeHolder: string = 'Search';

    /**
     * An input, that defines whether an input has a magnifier icon or a search button.
     * @type {boolean}.
     * @default true
     */
    @Input() hasMagnifier: boolean = true;

    /**
     * An input, that defines, whether an input has `clear text` button or no.
     * @type {boolean}.
     * @default false.
     */
    @Input() hasClearTextControl: boolean = false;

    /**
     * Describes the text in a `clear` button.
     * @type {string}.
     * @default 'Clear'.
     */
    @Input() clearButtonText: string = 'Clear';

    /**
     * Describes the text int the `search` button.
     * @type {string}.
     * @default 'Search'.
     */
    @Input() searchButtonText: string = 'Search';

    /**
     * Output that emits search input value on `ngModel` changes.
     * Passes a current input value to a parent component.
     * @type {string}.
     */
    @Output() readonly searchTextChange: EventEmitter<string> = new EventEmitter();

    /**
     * Output that emits a search event on `enter` keydown or search icon click.
     * Passes a searchable value to a parent component.
     * @type {string}.
     */
    @Output() readonly enterSearch: EventEmitter<string> = new EventEmitter<string>();

    /** Emits search text value on enter key down or search icon click */
    enterAction(): void {
        this.enterSearch.emit(this.searchText);
    }

    /** Clears search text value on button click */
    clearInput(): void {
        this.searchText = '';
    }
}
