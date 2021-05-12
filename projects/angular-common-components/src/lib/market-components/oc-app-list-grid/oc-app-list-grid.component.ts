import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';
import { get } from 'lodash';

@Component({
    selector: 'oc-app-list-grid',
    templateUrl: './oc-app-list-grid.component.html',
    styleUrls: ['./oc-app-list-grid.component.scss'],
})
export class OcAppListGridComponent {
    /**
     * The array of the apps what will be shown
     */
    @Input() appList: FullAppData[] = [];
    /**
     * Message that will be shown when no apps
     */
    @Input() noAppMessage = '';
    /**
     * App icon that will be shown when the app has no icon
     */
    @Input() defaultAppIcon = 'assets/angular-common-components/standard-app-icon.svg';
    /**
     * Custom template for the app card
     */
    @Input() customAppCardTemplate: TemplateRef<FullAppData>;
    /**
     * Router link for one app click, will contain 'appId' field
     */
    @Input() baseLinkForOneApp: string | any;
    /**
     * Key name of the App object which will be chosen like navigation parameter for the Router link.
     */
    @Input() appNavigationParam: string;
    /**
     * Emitter for click on App card.
     */
    @Output() gotoDetails = new EventEmitter<FullAppData>();

    constructor() {}

    viewDetails(app: FullAppData): void {
        this.gotoDetails.emit(app);
    }

    getAppValueByParameter(app: FullAppData): string {
        if (this.appNavigationParam) {
            return get(app, this.appNavigationParam);
        }
        return '';
    }
}
