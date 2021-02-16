import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OcSidebarSelectModel, SidebarValue} from 'oc-ng-common-service';

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
  @Output() sidebarChange: EventEmitter<OcSidebarSelectModel> = new EventEmitter<OcSidebarSelectModel>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClickSidebar(parentSidebar: SidebarValue, childSidebar?: SidebarValue) {
    this.sidebarChange.emit({parent: parentSidebar, child: childSidebar});
  }
}
