/** Model for the App Listing component configuration */
import {FullAppData} from '../api/app-data-model';
import {Page} from '../api/page.model';

export interface AppListing {
  layout: 'table';
  data: Page<FullAppData>;
  options: AppListingOptions [];
  previewTemplate?: string;
}

export type AppListingOptions =
  string |
  'EDIT' |
  'PREVIEW' |
  'PUBLISH' |
  'SUBMIT'  |
  'SUSPEND' |
  'UNSUSPEND' |
  'DELETE';

export interface AppListMenuAction {
  action: AppListingOptions;
  appId: string;
  appVersion: number;
  isChild?: boolean;
}
