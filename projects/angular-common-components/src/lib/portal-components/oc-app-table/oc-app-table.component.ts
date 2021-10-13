import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Directive,
    EventEmitter,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChildren,
} from '@angular/core';
import {
    AppListing,
    AppListingOptions,
    AppListMenuAction,
    AppsNotFoundTemplateContext,
    ColumnTemplateContext,
    FieldPathConfig,
    ModifyColumnConfig,
    ModifyColumnId,
} from '../models/app-listing.model';

/**
 * Interface for the sorting apps in the table.
 */
export interface SortChosen {
    /** fields by which sorting will be implemented */
    by: 'name' | 'created' | 'status';
    /** ascending or descending sort */
    ascending: boolean;
}

interface ColumnPattern {
    columnId: ModifyColumnId;
    headerCellTemplate: TemplateRef<any>;
    rowCellTemplate: TemplateRef<ColumnTemplateContext>;
}

@Directive({
    selector: 'ng-template[name]',
})
export class OcAppTableCellPattern {
    @Input() name: ModifyColumnId;
    @Input() type: 'header-cell' | 'row-cell';

    constructor(public template: TemplateRef<any>) {}
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
export class OcAppTableComponent implements AfterViewInit {
    /** Used for getting text field for default 'Status' column. */
    readonly statusPattern = {
        inDevelopment: { style: 'in-development', text: 'Draft' },
        inReview: { style: 'in-review', text: 'In review' },
        pending: { style: 'pending', text: 'Pending' },
        approved: { style: 'approved', text: 'Approved' },
        rejected: { style: 'rejected', text: 'Rejected' },
        suspended: { style: 'suspended', text: 'Suspended' },
    };

    /**
     * Configuration of the component.
     * By this configuration view and content of the component will be built.
     */
    @Input() properties: AppListing;
    /**
     * Message that will be shown if no apps in the data array..
     * @default empty
     */
    @Input() noAppMessage: string = 'You have no apps in your list';
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

    /** List of columns ID for displaying. Columns will display by this ordering. */
    @Input() activeColumns: ModifyColumnId[] = [
        'left-placeholder',
        'name',
        'summary',
        'create-date',
        'status',
        'app-options',
        'right-placeholder',
    ];

    /** Modify default table cells or add a new column. */
    @Input() modifyColumns: ModifyColumnConfig = {};

    /** This is table bottom area (after all apps), by default used for showing message 'You have no apps in your list' */
    @Input() tableBottomRowTemplate: TemplateRef<AppsNotFoundTemplateContext>;

    /**
     * Modify getting text data for default cells ('Name' & 'Summary').<br>
     * Default value: {@link fieldsPathConfig}.<br>
     * @param config Specific paths for getting a text value from {@link FullAppData}.
     */
    @Input() set selectAppFieldByPathConfig(config: FieldPathConfig) {
        this.fieldsPathConfig = { ...this.fieldsPathConfig, ...(config || {}) };
    }

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

    @ViewChildren(OcAppTableCellPattern) _cellPatterns: QueryList<OcAppTableCellPattern>;

    /** Default app paths for getting text fields. */
    fieldsPathConfig: FieldPathConfig = {
        appIconPath: 'customData.icon',
        appDescriptionPath: 'customData.summary',
    };

    private _defaultColumnsPattern: ModifyColumnConfig = {
        'left-placeholder': {},
        name: {},
        summary: {},
        'create-date': {},
        status: {},
        'app-options': {},
        'right-placeholder': {},
    };

    /** All columns for displaying. */
    columnsPattern: ColumnPattern[] = [];

    /** Sort apps by specific fields. */
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

    constructor(private cdRef: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.fillDefaultColumnsPattern();

        this.columnsPattern = this.mapColumnsConfigToColumnsArray(
            this.activeColumns,
            this.modifyColumnsConfigByUserConfig(this.modifyColumns, this._defaultColumnsPattern),
        );

        // run detect changes, because some component field changed after view.
        this.cdRef.detectChanges();
    }

    fillDefaultColumnsPattern(): void {
        const temp: any = {
            headerCell: {},
            rowCell: {},
        };
        this._cellPatterns.forEach(p => (temp[p.type][p.name] = p.template));
        for (const columnId in this._defaultColumnsPattern) {
            this._defaultColumnsPattern[columnId].rowCellTemplate = temp.rowCell[columnId];
            this._defaultColumnsPattern[columnId].headerCellTemplate = temp.headerCell[columnId];
        }
    }

    modifyColumnsConfigByUserConfig(newConfig: ModifyColumnConfig, oldConfig: ModifyColumnConfig): ModifyColumnConfig {
        const resultConfig: ModifyColumnConfig = { ...oldConfig };
        for (const columnId in newConfig) {
            if (newConfig[columnId]) {
                resultConfig[columnId] = {
                    headerCellTemplate: newConfig[columnId]?.headerCellTemplate || resultConfig[columnId].headerCellTemplate,
                    rowCellTemplate: newConfig[columnId]?.rowCellTemplate || resultConfig[columnId].rowCellTemplate,
                };
            }
        }
        return resultConfig;
    }

    mapColumnsConfigToColumnsArray(columnsActive: ModifyColumnId[], config: ModifyColumnConfig): ColumnPattern[] {
        return (columnsActive || [])
            .map(columnId => ({
                columnId,
                headerCellTemplate: config[columnId]?.headerCellTemplate,
                rowCellTemplate: config[columnId]?.rowCellTemplate,
            }))
            .filter(column => column.columnId && column.headerCellTemplate && column.rowCellTemplate);
    }

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
     * Trigger {@link pageScrolled} when user use down scroll.
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
}
