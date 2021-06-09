import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropdownModel} from '../model/components-basic.model';

@Component({
  selector: 'oc-dropdown',
  templateUrl: './oc-dropdown.component.html',
  styleUrls: ['./oc-dropdown.component.scss']
})
export class OcDropdownComponent {

  @Output()
  selectedChange: EventEmitter<DropdownModel<any>> = new EventEmitter<DropdownModel<any>>();

  @Input()
  selected: DropdownModel<any>;

  @Input()
  title: string = 'Sort by';

  @Input()
  options: DropdownModel<any>[];

  onSelect(selected: DropdownModel<any>) {
    this.selected = selected;
    this.selectedChange.emit(selected);
  }
}
