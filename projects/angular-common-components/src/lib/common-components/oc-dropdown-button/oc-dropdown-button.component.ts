import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropdownModel} from '../model/components-basic.model';

@Component({
  selector: 'oc-dropdown-button',
  templateUrl: './oc-dropdown-button.component.html',
  styleUrls: ['./oc-dropdown-button.component.scss']
})
export class OcDropdownButtonComponent {

  @Output()
  selectedChange: EventEmitter<DropdownModel<any>> = new EventEmitter<DropdownModel<any>>();

  @Input()
  selected: DropdownModel<any>;

  @Input()
  title: string = 'Sort by';

  @Input()
  options: DropdownModel<any>[];

  minWidthModel = {};

  @Input()
  set minDropdownWidth(minWidth: string) {
    this.minWidthModel = minWidth ? {'min-width': minWidth} : {};
  }

  onSelect(selected: DropdownModel<any>) {
    this.selected = selected;
    this.selectedChange.emit(selected);
  }
}
