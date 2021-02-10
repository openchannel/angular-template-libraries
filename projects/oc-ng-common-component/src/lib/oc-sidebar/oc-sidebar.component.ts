import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectModel, SidebarValue } from 'oc-ng-common-service';

@Component({
  selector: 'oc-sidebar',
  templateUrl: './oc-sidebar.component.html',
  styleUrls: ['./oc-sidebar.component.scss']
})
export class OcSidebarComponent implements OnInit {

  /** title of the sidebar */
  @Input() title: string;
  /** Sidebar config */
  @Input() sidebarModel: SidebarValue[];
  /** Path to the custom toggle icon up */
  @Input() toggleIconDown: string = 'assets/oc-ng-common-component/down-arrow.svg';
  /** Path to the custom toggle icon down */
  @Input() toggleIconUp: string = 'assets/oc-ng-common-component/select-up.svg';
  /** Return changed model */
  @Output() selectedLabelChange: EventEmitter<SidebarValue> = new EventEmitter<SidebarValue>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(selectedValue: SidebarValue, chosenId: string) {
    this.sidebarModel.forEach(item => {
      item.checked = item.id === chosenId && (!selectedValue.values || selectedValue.values.length === 0);
      if (item.values && item.values.length > 0) {
        item.values.forEach(subItem => {
          subItem.checked = subItem.id === chosenId;
        });
      }
    });
    this.selectedLabelChange.emit(selectedValue);
  }
}
