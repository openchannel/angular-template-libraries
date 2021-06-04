import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OcSidebarSelectModel } from '../model/oc-sidebar-model';
import { SidebarValue } from '../model/components-basic.model';

@Component({
    selector: 'oc-sidebar',
    templateUrl: './oc-sidebar.component.html',
    styleUrls: ['./oc-sidebar.component.scss'],
})
export class OcSidebarComponent {
    /**
     * Title of the sidebar.
     * @type {string}.
     * Default empty.
     */
    @Input() title: string;

    /**
     * Sidebar config, contains array of sidebar list items.
     * @type {SidebarValue[]}.
     */
    @Input() sidebarModel: SidebarValue[];

    /**
     * Path to the custom toggle icon down.
     * @type {string}.
     * Default 'assets/angular-common-components/down-arrow.svg'.
     */
    @Input() toggleIconDown: string = 'assets/angular-common-components/down-arrow.svg';

    /**
     * Path to the custom toggle icon up.
     * @type {string}.
     * Default 'assets/angular-common-components/select-up.svg'.
     */
    @Input() toggleIconUp: string = 'assets/angular-common-components/select-up.svg';

    /**
     * Base url for the Router links in the sidebar component.
     * @type {string}.
     * Default empty.
     */
    @Input() baseNavigation: string;

    /**
     * Emits sidebar model changes and passes to the parent component.
     */
    @Output() readonly sidebarChange: EventEmitter<OcSidebarSelectModel> = new EventEmitter<OcSidebarSelectModel>();

    constructor() {}

    /**
     * This method runs by click on the sidebar list item.
     * Checks for the sidebar changes.
     * Emits parent sidebar model and child sidebar model.
     */
    onClickSidebar(parentSidebar: SidebarValue, childSidebar?: SidebarValue): void {
        this.sidebarChange.emit({ parent: parentSidebar, child: childSidebar });
    }
}
