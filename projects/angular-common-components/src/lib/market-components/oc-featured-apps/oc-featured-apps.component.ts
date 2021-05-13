import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';
import { get } from 'lodash';

@Component({
    selector: 'oc-featured-apps',
    templateUrl: './oc-featured-apps.component.html',
    styleUrls: ['./oc-featured-apps.component.scss'],
})
export class OcFeaturedAppsComponent {
    /**
     *  List of Featured apps. Must contain the fields: 'icon',
     * 'name', 'summary', 'appId'
     */
    @Input() data: FullAppData[] = [];
    /**
     * Title of the featured apps
     * Default: 'Featured'
     */
    @Input() label: string = 'Featured';
    /**
     * The message that will be shown when no featured apps
     */
    @Input() emptyDataMessage: string = 'No Featured App';
    /**
     * List of classes that will be added to the default class list
     */
    @Input() customClasses: string = '';
    /**
     * Custom template for the feature app card
     */
    @Input() customFeaturedAppCardTemplate: TemplateRef<FullAppData>;
    /**
     * Router link for each app card. Will end with chosen navigation parameter.
     */
    @Input() mainRouterLink: string = '';
    /**
     * Key name of the App object which will be chosen like navigation parameter for the Router link.
     */
    @Input() navigationParam: string;
    /**
     * Emitter for click by App card.
     */
    @Output() clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

    constructor() {}

    getAppValueByParameter(app: FullAppData): string {
        if (this.navigationParam) {
            return get(app, this.navigationParam);
        }
        return '';
    }
}
