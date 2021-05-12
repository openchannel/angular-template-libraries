import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FullAppData } from 'oc-ng-common-component/src/lib/common-components';
import { get } from 'lodash';

@Component({
    selector: 'oc-recommended-apps',
    templateUrl: './oc-recommended-apps.component.html',
    styleUrls: ['./oc-recommended-apps.component.scss'],
})
export class OcRecommendedAppsComponent {
    /**
     *  Array of the Recommended apps
     *  Must consists fields: 'name', 'model',
     * 'rating', 'reviewCount', 'summary' or 'description'
     */
    @Input() appList: FullAppData[] = [];
    /**
     * Message that will be shown when no apps
     */
    @Input() noAppMessage: string = '';
    /**
     * Title for the Recommended apps list. Default 'Recommended Apps'
     */
    @Input() recommendedAppTitle: string = 'Recommended Apps';
    /**
     * Custom template for the app card
     */
    @Input() customAppCardTemplate: TemplateRef<FullAppData>;
    /**
     * Router link for one app click
     */
    @Input() routerLinkForOneApp: string | any;
    /**
     * Key name of the App object which will be chosen like navigation parameter for the Router link.
     */
    @Input() appNavigationParam: string;
    /**
     * Emitter for click by App card.
     */
    @Output() clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

    constructor() {}

    getAppValueByParameter(app: FullAppData): string {
        if (this.appNavigationParam) {
            return get(app, this.appNavigationParam);
        }
        return '';
    }
}
