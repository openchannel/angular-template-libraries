import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppListing, AppListingOptions, AppListMenuAction } from '../models/app-listing.model';

/**
 * Interface for the sorting apps in the table.
 */
export interface SortChosen {
    /** fields by which sorting will be implemented */
    by: 'name' | 'created' | 'status';
    /** ascending or descending sort */
    ascending: boolean;
}

/**
 * Component represents table with apps, demonstrates subversion of app.
 * Shows title, summary, date of creation ans status of the app.
 * Also has a dropdown menu with actions for each app in the table.
 */
@Component({
    selector: 'oc-app-table',
    templateUrl: './oc-app-table.component.html',
    styleUrls: ['./oc-app-table.component.css'],
})
export class OcAppTableComponent {
    /**
     * Configuration of the component.
     * By this configuration view and content of the component will be built.
     */
    @Input() properties: AppListing;

    /**
     * Message that will be shown if no apps in the data array..
     * @default empty
     */
    @Input() noAppMessage: string = '';

    /**
     * Path to the custom icon for the hidden menu toggle button.
     * @default icon with three horizontal dots
     */
    @Input() menuUrl: string = 'assets/angular-common-components/dots-menu.svg';

    /**
     * Path to the custom icon for the `sort` button when ascending sorting chosen.
     * @default empty
     */
    @Input() ascendingSortIcon: string = '';

    /**
     * Path to the custom icon for the `sort` button when descending sorting chosen.
     * @default empty
     */
    @Input() descendingSortIcon: string = '';

    /**
     * Set default app icon that will be
     * shown when icon of the app is not present
     * @default no icon
     */
    @Input() defaultAppIcon: string = '';

    /**
     * Output of menu list item clicked action.
     * Contains an action name, app ID, app version
     */
    @Output() readonly menuClicked: EventEmitter<AppListMenuAction> = new EventEmitter<AppListMenuAction>();

    /**
     * Output with page number for new apps request
     * Start number = 1
     */
    @Output() readonly pageScrolled: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Returns clicked sorting type.
     * Contains fields:
     *
     * `by` - chosen sorting type, can be `name`, `created` or `status`;
     *
     * `ascending` - `true` for ascending sort or `false` for descending sort.
     */
    @Output() readonly sortChosen: EventEmitter<SortChosen> = new EventEmitter<SortChosen>();

    displayChildrenId: string = null;
    sortingObjects: SortChosen[] = [
        {
            by: 'name',
            ascending: false,
        },
        {
            by: 'created',
            ascending: false,
        },
        {
            by: 'status',
            ascending: false,
        },
    ];

    /**
     * Click on dropdown menu of the app.
     * @param menu chosen menu option
     * @param appId ID of the current app
     * @param appVersion version of the current app
     * @param isChild is the the current app a subversion of the main app
     */
    action(menu: AppListingOptions, appId: string, appVersion: number, isChild?: boolean): void {
        const appAction: AppListMenuAction = {
            action: menu,
            appId,
            appVersion,
            isChild,
        };
        this.menuClicked.emit(appAction);
    }

    /**
     * Parser for the dropdown menu options. Shows only items which has been appropriate for current app.
     * @param item menu item for check
     * @param status status of the app
     * @param modifiedBy what type of user was last who modified the app
     */
    needToShowItem(item: AppListingOptions, status: string, modifiedBy: string): boolean {
        if (status.includes(item.toLowerCase())) {
            return false;
        } else {
            switch (item) {
                case 'PREVIEW':
                    return !!this.properties.previewTemplate;
                case 'PUBLISH':
                case 'SUBMIT':
                    return status === 'inDevelopment';
                case 'UNSUSPEND':
                    return status === 'suspended' && modifiedBy === 'developer';
                case 'SUSPEND':
                    return status === 'approved';
                default:
                    return true;
            }
        }
    }

    /**
     * Function for scroll event
     */
    onScrollDown(): void {
        this.pageScrolled.emit();
    }

    /**
     * Sorts apps by chosen option
     * @param {'name' | 'created' | 'status'} by option for sort
     */
    sortAppsBy(by: 'name' | 'created' | 'status'): void {
        this.sortingObjects
            .filter(sorting => sorting.by !== by)
            .forEach(obj => {
                obj.ascending = false;
            });
        const sort = this.sortingObjects.find(sorting => sorting.by === by);
        sort.ascending = !sort.ascending;
        this.sortChosen.emit(sort);
    }

    /**
     * Parser for special classes for app status color
     * @param status status of the app
     */
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
