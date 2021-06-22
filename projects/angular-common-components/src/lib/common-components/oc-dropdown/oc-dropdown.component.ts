import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownModel } from '../model/components-basic.model';

@Component({
    selector: 'oc-dropdown',
    templateUrl: './oc-dropdown.component.html',
    styleUrls: ['./oc-dropdown.component.scss'],
})
export class OcDropdownComponent {
    /**
     * Defined selected dropdown model item in dropdown list
     */
    @Input() selected: DropdownModel<any>;

    /**
     * Dropdown trigger button title
     */
    @Input() title: string = 'Sort by';

    /**
     * List of dropdown model items
     */
    @Input() options: DropdownModel<any>[];

    /**
     * Output event that emits when some item in the list was selected
     */
    @Output() readonly selectedChange: EventEmitter<DropdownModel<any>> = new EventEmitter<DropdownModel<any>>();

    /**
     * Function that executes on click to item in dropdown list. Set selected item and emits it.
     * @param {DropdownModel<any>} selected
     */
    onSelect(selected: DropdownModel<any>): void {
        this.selected = selected;
        this.selectedChange.emit(selected);
    }
}
