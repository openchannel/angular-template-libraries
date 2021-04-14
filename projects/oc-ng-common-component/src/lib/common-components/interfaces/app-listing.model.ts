import {FullAppData} from 'oc-ng-common-component/src/lib/common-components/interfaces/app-data.model';
import {ComponentsPage} from 'oc-ng-common-component/src/lib/common-components/interfaces/components-basic.model';

/** Model for the App Listing component configuration */
export interface AppListing {
  layout: 'table';
  data: ComponentsPage<FullAppData>;
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
