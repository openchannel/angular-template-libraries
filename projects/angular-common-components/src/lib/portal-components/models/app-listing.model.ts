import { ComponentsPage, FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';
import { TemplateRef } from '@angular/core';

/** Default column IDs. */
export type ModifyColumnId =
    | 'left-placeholder'
    | 'name'
    | 'summary'
    | 'create-date'
    | 'status'
    | 'app-options'
    | 'right-placeholder'
    | string;

/**
 * Context for table cells, will added to your TemplateRef.<br>
 * Used only for {@link ModifyColumnConfig.rowCellTemplate}.<br>
 */
export interface ColumnTemplateContext {
    app: any;
    isChild: boolean;
    index: number;
}

/**
 * Context for bottom table area.<br>
 * Used only for {@link OcAppTableComponent#tableBottomRowTemplate}.
 */
export interface AppsNotFoundTemplateContext {
    /** Count of table columns. */
    columnCount: number;
}

export interface FieldPathConfig {
    /**
     * By this path will be get icon url from {@link FullAppData}.<br>
     * Used for showing image in column 'Name'. Look: {@link ModifyColumnId}.<br>
     */
    appIconPath?: 'customData.icon' | string;
    /**
     * By this path will be get icon text from {@link FullAppData}.<br>
     * Used for showing app description in column 'Name'. Look: {@link ModifyColumnId}.<br>
     */
    appDescriptionPath?: 'customData.summary' | string;
}

/**
 * This config used for:<br>
 * 1. Overriding default table cells {@link ModifyColumnId}.
 * 2. Adding new table columns.
 */
export type ModifyColumnConfig = {
    [key in ModifyColumnId]: {
        /**
         * Template for header cell.
         * When non null, will be override default cell.
         */
        headerCellTemplate?: TemplateRef<any>;
        /**
         * Template for row cell (showing same app data, like: name, description, date etc.).
         * When non null, will be override default cell.
         */
        rowCellTemplate?: TemplateRef<ColumnTemplateContext>;
    };
};

/** Configuration model for the App Listing component */
export interface AppListing {
    /** layout of the component. Default: 'table' */
    layout: 'table';
    /** data response with list of apps, pagination, etc. */
    data: ComponentsPage<any>;
    /** array of options which will be applied in dropdown menu of the component */
    options: AppListingOptions[];
    /**
     * A URL template for the preview.
     * @example https://mysite.com/apps/{appId}/{version}
     */
    previewTemplate?: string;
}
/** The available options of the dropdown menu */
export type AppListingOptions = string | 'EDIT' | 'PREVIEW' | 'PUBLISH' | 'SUBMIT' | 'SUSPEND' | 'UNSUSPEND' | 'DELETE';
/** Interface for the action from a dropdown menu */
export interface AppListMenuAction {
    /** Which action was chosen */
    action: AppListingOptions;
    /** ID of the app which has been chosen */
    appId: string;
    /** Version of the app which has been chosen */
    appVersion: number;
    /** Marker for apps which has been subversion of the main app */
    isChild?: boolean;
}

// ---- Sorting for app table columns ----

/** Column names for sorting {@link OcAppTableComponent}. */
export type AppGridSortColumn = 'name' | 'created' | 'status';

/**
 * Config for setting current sort icon direction (up or down). Used in {@link OcAppTableComponent#sortOptions}.
 *
 * Values:<br>
 *   -1 => sort icon to down.<br>
 *   null => sort icon to down.<br>
 *   1 => sort icon to up.<br>
 */
export type AppGridSortOptions = {
    [name in AppGridSortColumn]: 1 | -1 | null;
};

export type AppGridSortChosen = {
    /** New sort config. */
    sortOptions: AppGridSortOptions;
    /** Updated column ID. */
    changedSortOption: AppGridSortColumn;
};
