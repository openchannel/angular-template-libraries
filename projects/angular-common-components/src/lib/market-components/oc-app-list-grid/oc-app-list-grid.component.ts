import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';
import { get } from 'lodash';

/**
 * Shows vertical list of the apps
 */
@Component({
    selector: 'oc-app-list-grid',
    templateUrl: './oc-app-list-grid.component.html',
    styleUrls: ['./oc-app-list-grid.component.css'],
})
export class OcAppListGridComponent {
    /**
     * The array of the apps what will be shown in this component.
     * @default FullAppData[]
     */
    @Input() appList: FullAppData[] = [];
    /**
     * Message that will be shown when appList array is empty.
     * This input required if you want to show the message for case with no apps in component.
     */
    @Input() noAppMessage: string = '';
    /**
     * (Optional)
     * Path to the custom Default App Icon that will be shown when the app has no icon.
     * @default: standard-app-icon.svg
     */
    @Input() defaultAppIcon: string = 'assets/angular-common-components/standard-app-icon.svg';
    /**
     * (Optional)
     * Custom template for the app card. If not set, default app card will be shown.
     * @default null
     */
    @Input() customAppCardTemplate: TemplateRef<FullAppData>;
    /**
     * (Optional)
     * Base routerLink for one app. Path to the page to which will be redirected, by click on the app card.
     *
     * ### Example:
     * ``
     * "app-details" | "apps/details"
     * ``
     *
     * @example
     * 'app-details'
     * 'apps/details'
     */
    @Input() baseLinkForOneApp: string | any;
    /**
     * (Optional)
     * Key name of the App object which will be chosen like navigation parameter for the Router link.
     * If not set, no special parameter would be applied for routerLink.
     */
    @Input() appNavigationParam: string = '';
    /**
     * The emitter reports that current app card has been clicked. Return current app object data.
     */
    @Output() readonly gotoDetails: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

    /**
     * Function which getting data about current App of the app card and emit it to parent.
     * @param app app of the current app card
     */
    viewDetails(app: FullAppData): void {
        this.gotoDetails.emit(app);
    }

    /**
     * Function which returns data from the App object by key {@link appNavigationParam}.
     * If key does not applied - will return empty string.
     * @param app app of the current app card
     */
    getAppValueByParameter(app: FullAppData): string {
        if (this.appNavigationParam) {
            return get(app, this.appNavigationParam);
        }
        return '';
    }
}
