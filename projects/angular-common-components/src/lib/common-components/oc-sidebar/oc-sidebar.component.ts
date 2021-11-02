import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { OcSidebarSelectModel } from '../model/oc-sidebar-model';
import { SidebarValue } from '../model/components-basic.model';
import { HeadingTag } from '../model/heading-tag.interface';

/**
 * Sidebar component. It is used as a tool for quick search of applications.
 * Component represents a block with an unordered list of links,
 * which set filters to the search apps request.
 *
 * @example
 * <oc-sidebar baseNavigation="browse"
 *             [title]="sidebar.name"
 *             [sidebarModel]="sidebar.values"
 *             [threshold]="12"
 *             toggleListButtonType="button"></oc-sidebar>
 */
@Component({
    selector: 'oc-sidebar',
    templateUrl: './oc-sidebar.component.html',
    styleUrls: ['./oc-sidebar.component.css'],
})
export class OcSidebarComponent implements AfterViewInit, OnChanges {
    /**
     * Title of the sidebar.
     * @type {string}.
     * Default empty.
     */
    @Input() title: string;

    /**
     * Heading tag of [title]{@link title}
     * @type {HeadingTag}.
     */
    @Input() titleHeadingTag: HeadingTag = 'h2';
    /**
     * Sidebar config, contains array of sidebar list items.
     * @type {SidebarValue[]}.
     */
    @Input() set sidebarModel(model: SidebarValue[]) {
        this.mainSidebarModel = [...model];
        this.updateThreshold();
    }
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
     * @example
     * // returns '/browse/collections/allApps'.
     */
    @Input() baseNavigation: string;
    /**
     * The limit for the shown items. They will be shown always,
     * the rest will be hidden until the user clicked a toggle button.
     * If a threshold value is bigger than the length of items - the toggle button will be not shown.
     * Default value: 10.
     * @default 10
     */
    @Input() threshold: number = 10;
    /**
     *  Text that will be shown on the toggle button when the rest of the items are collapsed.
     */
    @Input() expandText: string = 'Show more';
    /**
     * Text that will be shown on the toggle button when the rest of the items are expanded.
     */
    @Input() collapseText: string = 'Show less';
    /**
     * Type of the toggle button. Can be `button` or `link`.
     * `link` type will be shown by default.
     * @type {'button' | 'link'}.
     */
    @Input() toggleListButtonType: 'primary' | 'link' = 'link';
    /**
     * Emits sidebar model changes and passes to the parent component.
     */
    @Output() readonly sidebarChange: EventEmitter<OcSidebarSelectModel> = new EventEmitter<OcSidebarSelectModel>();
    /**
     * @ignore
     * Collapsing list. Necessary for the collapse animation.
     */
    @ViewChild('collapsingList', { static: false }) collapsingList;
    /**
     * @ignore
     * All items of the sidebar
     */
    mainSidebarModel: SidebarValue[];
    /**
     * @ignore
     * Always showed list of the sidebar items.
     */
    showedSidebarModel: SidebarValue[];
    /**
     * @ignore
     * List of the sidebar items that can be collapsed.
     */
    hiddenSidebarModel: SidebarValue[] = [];
    /**
     * The flag that controls the showed status of the rest of the items.
     */
    collapseList: boolean = false;
    /**
     * A height of the collapsing list. That need for the smooth transition animation.
     */
    listHeight: number;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.threshold && changes.threshold.previousValue !== changes.threshold.currentValue) {
            this.updateThreshold();
        }
    }

    ngAfterViewInit(): void {
        if (this.hiddenSidebarModel.length > 0) {
            this.listHeight = this.collapsingList.nativeElement.offsetHeight;
            this.collapseList = true;
        }
    }
    /**
     * This method runs by click on the sidebar list item.
     * Checks for the sidebar changes.
     * Emits parent sidebar model and child sidebar model.
     */
    onClickSidebar(parentSidebar: SidebarValue, childSidebar?: SidebarValue): void {
        if (parentSidebar.values?.length > 0 && !childSidebar) {
            parentSidebar.expanded = !parentSidebar.expanded;
        } else {
            this.sidebarChange.emit({ parent: parentSidebar, child: childSidebar });
        }
    }

    /**
     * Updating lists on threshold value changes.
     */
    updateThreshold(): void {
        this.showedSidebarModel = [...this.mainSidebarModel];
        // tslint:disable-next-line:prefer-conditional-expression
        if (this.threshold && this.threshold < this.mainSidebarModel.length - 1) {
            this.hiddenSidebarModel = [...this.showedSidebarModel.splice(this.threshold, this.showedSidebarModel.length - 1)];
        } else {
            this.hiddenSidebarModel = [];
        }
    }
}
