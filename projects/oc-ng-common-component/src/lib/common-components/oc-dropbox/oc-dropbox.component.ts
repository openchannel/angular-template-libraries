import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {Observable, of, Subject} from 'rxjs';
import {map, mergeAll} from 'rxjs/operators';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'oc-dropbox',
    templateUrl: './oc-dropbox.component.html',
    styleUrls: ['./oc-dropbox.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OcDropboxComponent),
        multi: true
    }]
})
export class OcDropboxComponent implements OnInit, ControlValueAccessor {

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
     * searchFunction - (required) need for searching contains items.
     */
    @Input() customSearch: (text: Observable<string>) => Observable<readonly any[]>;

    /**
     * selectedItem - return currently selected item.
     */
    @Output() selectedItem: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('dropBox', {static: false})
    dropBox: ElementRef<HTMLInputElement>;

    focus$: Subject<string> = new Subject<string>();
    click$: Subject<string> = new Subject<string>();

    outputSelectedItem: string;
    disabled: boolean = false;

    private onTouched = () => {};

    private onChange: (value: any) => void = () => {};

    constructor() {
    }

    ngOnInit(): void {
        if (!this.customSearch) {
            this.customSearch = this.defaultSearch;
        }
    }

    search = (text$: Observable<string>) => {
        return of(text$, this.focus$, this.click$)
            .pipe(mergeAll(3), e => this.customSearch(e));
    }

    defaultSearch = (text$: Observable<string>) => {
        return text$.pipe(map(searchTag => this.filterItems(searchTag, this.items)));
    }

    filterItems(searchItem: string, items: string[]) {
        if (items && searchItem) {
            const lowerTag = searchItem.toLowerCase();
            return this.items.filter(v => v && v.toLowerCase().indexOf(lowerTag) > -1);
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

    onFocus() {
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

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    clearSelectedValue(event: any) {
        if (this.outputSelectedItem !== event.target.value) {
            this.onChange('');
        }
    }
}
