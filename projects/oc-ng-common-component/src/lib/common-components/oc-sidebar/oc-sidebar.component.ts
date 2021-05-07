import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OcSidebarSelectModel } from '../model/oc-sidebar-model';
import { SidebarValue } from '../model/components-basic.model';

@Component({
    selector: 'oc-sidebar',
    templateUrl: './oc-sidebar.component.html',
    styleUrls: ['./oc-sidebar.component.scss'],
})
export class OcSidebarComponent {
    /** title of the sidebar */
    @Input() title: string;
    /** Sidebar config */
    @Input() sidebarModel: SidebarValue[];
    /** Path to the custom toggle icon up */
    @Input() toggleIconDown: string = 'assets/oc-ng-common-component/down-arrow.svg';
    /** Path to the custom toggle icon down */
    @Input() toggleIconUp: string = 'assets/oc-ng-common-component/select-up.svg';
    /** Base url for the Router link */
    @Input() baseNavigation: string;
    /** Return changed model */
    @Output() sidebarChange: EventEmitter<OcSidebarSelectModel> = new EventEmitter<OcSidebarSelectModel>();

    constructor() {}

    onClickSidebar(parentSidebar: SidebarValue, childSidebar?: SidebarValue): void {
        this.sidebarChange.emit({ parent: parentSidebar, child: childSidebar });
    }
}
