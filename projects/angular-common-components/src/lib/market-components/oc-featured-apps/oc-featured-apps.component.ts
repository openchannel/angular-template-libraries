import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';
import { get } from 'lodash';

/**
 * Featured apps component. Renders a list of applications, that are featured by a user.
 * Located on the main page.
 * Shows a list with featured apps, which are clickable for more detailed description.
 */
@Component({
    selector: 'oc-featured-apps',
    templateUrl: './oc-featured-apps.component.html',
    styleUrls: ['./oc-featured-apps.component.scss'],
})
export class OcFeaturedAppsComponent {
    /**
     * List of Featured apps. Must contain the fields: "icon", "name", "summary", "appId".
     * @type {FullAppData[]}.
     * Default empty.
     */
    @Input() data: FullAppData[] = [];

    /**
     * A title of the featured apps.
     * @type {string}.
     * @default: 'Featured'
     */
    @Input() label: string = 'Featured';

    /**
     * The message that will be shown when there are no featured apps.
     * @type {string}.
     * @default: 'No Featured App'.
     */
    @Input() emptyDataMessage: string = 'No Featured App';

    /**
     * List of classes that will be added to the default class list.
     * @type {string}.
     * @default: ''.
     */
    @Input() customClasses: string = '';

    /**
     * Custom template for the featured app card.
     * @type {FullAppData}.
     */
    @Input() customFeaturedAppCardTemplate: TemplateRef<FullAppData>;

    /**
     * Router link for each app card.
     * Will end with chosen navigation parameter.
     * @type {string}.
     * @default: ''.
     * @example.
     * '/details/ap-application-regression-14may'.
     */
    @Input() mainRouterLink: string = '';

    /**
     * Key name of the App object which will be chosen like navigation parameter for the Router link.
     * @type {string}.
     * @example.
     * 'appId'.
     */
    @Input() navigationParam: string;

    /**
     * Emitter for click by App card.
     * @type {FullAppData}.
     */
    @Output() readonly clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

    /**
     * It is used to get a part of an app router link.
     * Returns app navigation param or empty string value.
     */
    getAppValueByParameter(app: FullAppData): string {
        if (this.navigationParam) {
            return get(app, this.navigationParam);
        }
        return '';
    }
}
