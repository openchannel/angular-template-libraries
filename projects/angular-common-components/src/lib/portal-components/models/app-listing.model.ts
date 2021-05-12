/** Model for the App Listing component configuration */
import { ComponentsPage, FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';

export interface AppListing {
    layout: 'table';
    data: ComponentsPage<FullAppData>;
    options: AppListingOptions[];
    previewTemplate?: string;
}

export type AppListingOptions = string | 'EDIT' | 'PREVIEW' | 'PUBLISH' | 'SUBMIT' | 'SUSPEND' | 'UNSUSPEND' | 'DELETE';

export interface AppListMenuAction {
    action: AppListingOptions;
    appId: string;
    appVersion: number;
    isChild?: boolean;
}
