import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComponentsDropdownModel} from 'oc-ng-common-component/src/lib/common-components/interfaces/components-basic.model';

@Component({
  selector: 'oc-dropdown-button',
  templateUrl: './oc-dropdown-button.component.html',
  styleUrls: ['./oc-dropdown-button.component.scss']
})
export class OcDropdownButtonComponent implements OnInit {

  @Output()
  selectedChange: EventEmitter<ComponentsDropdownModel<any>> = new EventEmitter<ComponentsDropdownModel<any>>();

  @Input()
  selected: ComponentsDropdownModel<any>;

  @Input()
  title: string = 'Sort by';

  @Input()
  options: ComponentsDropdownModel<any>[];

  minWidthModel = {};

  @Input()
  set minDropdownWidth(minWidth: string) {
    this.minWidthModel = minWidth ? {'min-width': minWidth} : {};
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(selected: ComponentsDropdownModel<any>) {
    this.selected = selected;
    this.selectedChange.emit(selected);
  }
}
