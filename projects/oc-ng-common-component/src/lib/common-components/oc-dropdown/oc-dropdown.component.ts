import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComponentsDropdownModel} from 'oc-ng-common-component/src/lib/common-components/interfaces/components-basic.model';

@Component({
  selector: 'oc-dropdown',
  templateUrl: './oc-dropdown.component.html',
  styleUrls: ['./oc-dropdown.component.scss']
})
export class OcDropdownComponent implements OnInit {

  @Output()
  selectedChange: EventEmitter<ComponentsDropdownModel<any>> = new EventEmitter<ComponentsDropdownModel<any>>();

  @Input()
  selected: ComponentsDropdownModel<any>;

  @Input()
  title: string = 'Sort by';

  @Input()
  options: ComponentsDropdownModel<any>[];

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(selected: ComponentsDropdownModel<any>) {
    this.selected = selected;
    this.selectedChange.emit(selected);
  }
}
