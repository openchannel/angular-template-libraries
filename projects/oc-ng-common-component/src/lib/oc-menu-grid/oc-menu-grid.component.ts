import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppListing, AppListingOptions, AppListMenuAction } from 'oc-ng-common-service';

@Component({
  selector: 'oc-menu-grid',
  templateUrl: './oc-menu-grid.component.html',
  styleUrls: ['./oc-menu-grid.component.scss']
})
export class OcMenuGridComponent implements OnInit {

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
   * Path to the custom icon for the 'sort' button.
   * Default: empty
   */
  @Input() sortIcon: string = '';
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

  public displayChildrenId: string = null;

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
    switch (by) {
      case 'name':
        this.properties.data.list.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'date':
        this.properties.data.list.sort((a, b) => {
          if (a.created < b.created) {
            return -1;
          } else if (a.created > b.created) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'status':
        this.properties.data.list.sort((a, b) => {
          if (a.status.value < b.status.value) {
            return -1;
          } else if (a.status.value > b.status.value) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      default:
        break;
    }
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
