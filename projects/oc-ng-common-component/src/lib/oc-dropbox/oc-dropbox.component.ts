import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
     * selectedItem - return currently selected item.
     */
    @Output() selectedItem = new EventEmitter<string>()

    @ViewChild('dropBox', {static: false})
    dropBox: ElementRef<HTMLInputElement>;

    constructor() {
    }

    search = (text$: Observable<string>) => {
        return text$.pipe(map(searchTag => {
            if (searchTag && this.items) {
                const lowerTag = searchTag.toLowerCase();
                return this.items.filter(v => v && v.toLowerCase().indexOf(lowerTag) > -1);
            } else {
                return this.items;
            }
        }))
    };

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

    clearForm(itemEvent: NgbTypeaheadSelectItemEvent): void {
        if (this.clearFormAfterSelect) {
            itemEvent.preventDefault();
        }
    }

    clearFocus(): void {
        this.dropBox.nativeElement.blur();
    }
}
