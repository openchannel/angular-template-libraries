import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownModel } from '../model/components-basic.model';

/**
 * Dropdown button component. Represents button and dropdown list that drops on click.
 *
 * @example <oc-dropdown-button [selected]="{
 *                                  label: 'item 1',
 *                                  value: 1
 *                              }"
 *                              [options]="[
 *                                {
 *                                  label: 'item 1',
 *                                  value: 1
 *                                },
 *                                {
 *                                  label: 'item 2',
 *                                  value: 2
 *                                }
 *                              ]"
 *                              [minDropdownWidth]="100"
 *                              (selectedChange)="onChange($event)"
 * >
 */
@Component({
    selector: 'oc-dropdown-button',
    templateUrl: './oc-dropdown-button.component.html',
    styleUrls: ['./oc-dropdown-button.component.scss'],
})
export class OcDropdownButtonComponent {
    /**
     * Defined selected dropdown model item in dropdown list
     */
    @Input() selected: DropdownModel<any>;

    /**
     * List of dropdown model items
     */
    @Input() options: DropdownModel<any>[];

    /**
     * Min-width CSS value for the dropdown
     */
    @Input() set minDropdownWidth(minWidth: string) {
        this.minWidthModel = minWidth ? { 'min-width': minWidth } : {};
    }

    @Input() title: string = 'Sort by';

    /**
     * Output event that emits when some item in the list was selected
     */
    @Output() readonly selectedChange: EventEmitter<DropdownModel<any>> = new EventEmitter<DropdownModel<any>>();

    minWidthModel = {};

    /**
     * Function that executes on click to item in dropdown list. Set selected item and emits it.
     * @param {DropdownModel<any>} selected
     */
    onSelect(selected: DropdownModel<any>): void {
        this.selected = selected;
        this.selectedChange.emit(selected);
    }
}
