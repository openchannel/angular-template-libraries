import { ComponentsPage, FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';

/** Configuration model for the App Listing component */
export interface AppListing {
    /** layout of the component. Default: 'table' */
    layout: 'table';
    /** data response with list of apps, pagination, etc. */
    data: ComponentsPage<FullAppData>;
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
