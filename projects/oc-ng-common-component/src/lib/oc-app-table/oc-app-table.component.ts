import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppListing, AppListingOptions, AppListMenuAction } from 'oc-ng-common-service';

export interface SortChosen {
  by: 'name' | 'date' | 'status';
  ascending: boolean;
}
@Component({
  selector: 'oc-app-table',
  templateUrl: './oc-app-table.component.html',
  styleUrls: ['./oc-app-table.component.scss']
})
export class OcAppTableComponent implements OnInit {

  /**
   * Configuration of the component,
   * must consist fields:
   * 'layout' -  Changes the layout of how
   * the component is displayed. Default 'table';
   * 'data' - pages with an array of the apps;
   * 'options' - The available options of the hidden menu to show;
   * 'previewTemplate' - A URL template for the preview.
   * Example: https://mysite.com/apps/{appId}/{version}
   */
  @Input() properties: AppListing;
  /**
   * Message that will be shown if no apps in the data array.
   * Default: empty
   */
  @Input() noAppMessage: string = '';
  /**
   * Path to the custom icon for the hidden menu toggle button.
   * Default: empty
   */
  @Input() menuUrl: string = 'assets/img/dots-menu.svg';
  /**
   * Path to the custom icon for the 'sort' button when ascending sorting chosen.
   * Default: empty
   */
  @Input() ascendingSortIcon: string = '';
  /**
   * Path to the custom icon for the 'sort' button when descending sorting chosen.
   * Default: empty
   */
  @Input() descendingSortIcon: string = '';
  /**
   * Set default app icon that will be
   * shown when icon of the app is not present
   */
  @Input() defaultAppIcon: string = '';
  /**
   * Output of menu list item clicked action.
   * Contains an action name, app ID, app version
   */
  @Output() menuClicked: EventEmitter<AppListMenuAction> = new EventEmitter<AppListMenuAction>();
  /**
   * Output with page number for new apps request
   * Start number = 1
   */
  @Output() pageScrolled: EventEmitter<number> = new EventEmitter<number>();
  /**
   * Returns clicked sorting type.
   * Contains fields 'by' - chosen sorting type, can be 'name', 'date' or 'status';
   * ascending - true or false
   */
  @Output() sortChosen: EventEmitter<SortChosen> = new EventEmitter<SortChosen>();

  public displayChildrenId: string = null;
  public sortingObjects: SortChosen [] = [
    {
      by: 'name',
      ascending: false
    },
    {
      by: 'date',
      ascending: false
    },
    {
      by: 'status',
      ascending: false
    }
  ];

  private pageNumber: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  action(menu: AppListingOptions, appId: string, appVersion: number, isChild?: boolean): void {
    const appAction: AppListMenuAction = {
      action: menu,
      appId,
      appVersion,
      isChild
    };
    this.menuClicked.emit(appAction);
  }

  needToShowItem(item: AppListingOptions, status: string): boolean {
    if (status.includes(item.toLowerCase())) {
      return false;
    } else {
      switch (item) {
        case 'PREVIEW':
          return !!this.properties.previewTemplate;
        case 'PUBLISH':
        case 'SUBMIT':
          return status === 'inDevelopment' || status === 'suspended';
        case 'SUSPEND':
          return status !== 'inDevelopment' && status !== 'pending';
        default:
          return true;
      }
    }
  }

  onScrollDown(): void {
    this.pageNumber++;
    this.pageScrolled.emit(this.pageNumber);
  }

  sortAppsBy(by: 'name' | 'date' | 'status'): void {
    this.sortingObjects.filter(sorting => sorting.by !== by).forEach(obj => {
      obj.ascending = false;
    });
    const sort = this.sortingObjects.find(sorting => sorting.by === by);
    sort.ascending = !sort.ascending;
    this.sortChosen.emit(sort);
  }

  statusColor(status: string): string {
    switch (status) {
      case 'inDevelopment':
        return 'in-development';
      case 'inReview':
        return 'in-review';
      default:
        return status;
    }
  }
}
