import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OcButtonType } from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-text-search',
    templateUrl: './oc-text-search.component.html',
    styleUrls: ['./oc-text-search.component.css'],
})
export class OcTextSearchComponent {
    /**
     * Type of clear all tags button.
     * @type OcButtonType.
     * @default 'link'.
     */
    @Input() clearAllButtonType: OcButtonType = 'link';

    /**
     * An input, that defines whether to show clear all tags button.
     * @type {boolean}.
     * @default true.
     */
    @Input() isShowClearAllTagsButton: boolean = true;

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
     * List of tags titles to show under search input.
     * @type {string[]}.
     * @default [].
     */
    @Input() tagsTitles: string[] = [];

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

    /**
     * Output that emits a click on tag close button.
     * @type {number}
     */
    @Output() readonly tagDeleted: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Output that emits a click on clear all tags button.
     * @type {boolean}.
     */
    @Output() readonly allTagsDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Emits search text value on enter key down or search icon click */
    enterAction(): void {
        this.enterSearch.emit(this.searchText);
    }

    /** Emits clear all tags button clicked */
    deleteAllTags(): void {
        this.allTagsDeleted.emit();
    }

    /** Emits delete of tag */
    deleteTag(tagIndex: number): void {
        this.tagDeleted.emit(tagIndex);
    }

    /** Clears search text value on button click */
    clearInput(): void {
        this.searchText = '';
    }
}
