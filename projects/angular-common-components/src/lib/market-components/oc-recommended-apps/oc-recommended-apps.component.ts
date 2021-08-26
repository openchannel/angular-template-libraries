import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';
import { get } from 'lodash';
import {HeadingTag} from "@openchannel/angular-common-components/src/lib/common-components";

/**
 * Recommended apps component. Renders a list of applications, tha are recommended for a user.
 * Located on the single application page after its description.
 * Shows brief information via app cards.
 */
@Component({
    selector: 'oc-recommended-apps',
    templateUrl: './oc-recommended-apps.component.html',
    styleUrls: ['./oc-recommended-apps.component.css'],
})
export class OcRecommendedAppsComponent {
    /**
     *  Array of the Recommended apps.
     *  Must contains of fields: `name`, `model`,
     * `rating`, `reviewCount`, `summary` or `description`.
     * @type {FullAppData[]}.
     */
    @Input() appList: FullAppData[] = [];

    /**
     * Message that will be shown when no apps.
     * @type {string}.
     */
    @Input() noAppMessage: string = '';

    /**
     * Title for the Recommended apps list.
     * @type {string}.
     * @default 'Recommended Apps'.
     */
    @Input() recommendedAppTitle: string = 'Recommended Apps';

    /**
     * Heading tag of title
     * @type {HeadingTag}.
     * @example.
     * 'h2'.
     */
    @Input() headingTag: HeadingTag = 'h2';

    /**
     * Custom template for the app card.
     * @type {FullAppData}.
     */
    @Input() customAppCardTemplate: TemplateRef<FullAppData>;

    /**
     * Router link for one app when clicked.
     * Using for the default app card. If you are using the custom card - you must
     * create your own router link on the card template.
     * @type {string | any}.
     * @example
     * '/details'.
     */
    @Input() routerLinkForOneApp: string | any;

    /**
     * Key name of the App object which will be chosen like navigation parameter for the Router link.
     * Using only with the default app card template.
     * @type {string}.
     * @example
     * 'appId'.
     */
    @Input() appNavigationParam: string;

    /**
     * @deprecated
     * Emitter for click on App card. It is deprecated. If you want to get data for redirect only - use
     * {@link routerLinkForOneApp} with {@link appNavigationParam}.
     * @type {FullAppData}.
     */
    @Output() readonly clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

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
