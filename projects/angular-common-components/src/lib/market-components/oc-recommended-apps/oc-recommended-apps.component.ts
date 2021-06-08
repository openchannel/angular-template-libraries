import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';
import { get } from 'lodash';

@Component({
    selector: 'oc-recommended-apps',
    templateUrl: './oc-recommended-apps.component.html',
    styleUrls: ['./oc-recommended-apps.component.scss'],
})
export class OcRecommendedAppsComponent {
    /**
     *  Array of the Recommended apps.
     *  Must consist of fields: 'name', 'model',
     * 'rating', 'reviewCount', 'summary' or 'description'.
     * @type {FullAppData[]}.
     * Default empty.
     */
    @Input() appList: FullAppData[] = [];

    /**
     * Message that will be shown when no apps.
     * @type {string}.
     * Default empty.
     */
    @Input() noAppMessage: string = '';

    /**
     * Title for the Recommended apps list.
     * @type {string}.
     * Default 'Recommended Apps'.
     */
    @Input() recommendedAppTitle: string = 'Recommended Apps';

    /**
     * Custom template for the app card.
     * @type {FullAppData}.
     */
    @Input() customAppCardTemplate: TemplateRef<FullAppData>;

    /**
     * Router link for one app when clicked.
     * @type {string | any}.
     */
    @Input() routerLinkForOneApp: string | any;

    /**
     * Key name of the App object which will be chosen like navigation parameter for the Router link.
     * @type {string}.
     */
    @Input() appNavigationParam: string;

    /**
     * Emitter for click on App card.
     * @type {FullAppData}.
     */
    @Output() readonly clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

    constructor() {}

    /**
     * Uses to get a part of an app router link.
     * Returns app navigation param or empty string value.
     */
    getAppValueByParameter(app: FullAppData): string {
        if (this.appNavigationParam) {
            return get(app, this.appNavigationParam);
        }
        return '';
    }
}
