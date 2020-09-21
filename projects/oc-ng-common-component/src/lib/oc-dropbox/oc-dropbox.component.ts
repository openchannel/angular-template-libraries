import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbTypeaheadSelectItemEvent} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
    selector: 'oc-dropbox',
    templateUrl: './oc-dropbox.component.html',
    styleUrls: ['./oc-dropbox.component.scss']
})
export class OcDropboxComponent implements OnInit {

    /**
     * https://ng-bootstrap.github.io/#/components/typeahead/examples
     */

    /**
     * placeHolder (optional) - show text inside dropbox.
     */
    @Input() placeHolder: string;

    /**
     * items (optional) - items for selecting.
     */
    @Input() items: string [];

    /**
     * clearFormAfterSelect - clear input text form, when the user chooses an item.
     * Default: false.
     */
    @Input() clearFormAfterSelect: boolean = false;

    /**
     * customNgStyle - customize drop box style by [ngStyle].
     */
    @Input() customNgStyle: {};

    /**
     * customClassStyle - customize drop box style by [class]
     */
    @Input() customClassStyle: string;

    /**
     * dropElementTemplate - need for showing one dropbox element.
     */
    @Input() dropElementTemplate: TemplateRef<any>;

    /**
     * currentText - user text.
     */
    @Output() currentText = new EventEmitter<string>();

    /**
     * existsItems - current items of dropbox after searching.
     */
    @Output() existsItems = new EventEmitter<string[]>();

    /**
     * selectedItem - return currently selected item.
     */
    @Output() selectedItem = new EventEmitter<string>()

    @ViewChild('dropBox', {static: false})
    dropBox: ElementRef<HTMLInputElement>;

    constructor() {
    }

    search = (text$: Observable<string>) => {
        return text$.pipe(map(searchTag => {
            let newItems = this.filterItems(searchTag, this.items);
            this.emmitExistsItems(newItems)
            return newItems;
        }))
    };

    filterItems(searchItem: string, items: string[]) {
        if(items) {
            if (searchItem) {
                const lowerTag = searchItem.toLowerCase();
                return this.items.filter(v => v && v.toLowerCase().indexOf(lowerTag) > -1);
            }
        }
        return items;
    }

    ngOnInit(): void {
    }

    /** show all dropbox items by click event */
    onFocus(event: FocusEvent) {
        event.stopPropagation();
        event.target.dispatchEvent(new Event('input'));
    }

    selectItem(itemEvent: NgbTypeaheadSelectItemEvent): void {
        this.selectedItem.emit(itemEvent.item);
        this.clearForm(itemEvent);
        this.clearFocus();
    }

    emmitExistsItems(items: string[]) {
        this.existsItems.emit(items);
    }

    emmitCurrentText(event: any) {
        this.currentText.emit(event.target.value);
    }

    clearForm(itemEvent: NgbTypeaheadSelectItemEvent): void {
        if (this.clearFormAfterSelect) {
            itemEvent.preventDefault();
        }
    }

    clearFocus(): void {
        this.dropBox.nativeElement.blur();
    }
}
