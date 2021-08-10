import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';
import { get } from 'lodash';
import {HeadingTag} from "@openchannel/angular-common-components/src/lib/common-components";

@Component({
    selector: 'oc-app-gallery',
    templateUrl: './oc-app-gallery.component.html',
    styleUrls: ['./oc-app-gallery.component.css'],
})
export class OcAppGalleryComponent {
    /**
     * The array of the apps what will be shown in this component.
     *
     * Default: empty
     */
    @Input() appsArr: FullAppData[] = [];
    /**
     * Message that will be shown if the array of apps is empty.
     *
     * Default: empty string
     */
    @Input() noAppMessage: string = '';
    /**
     * Title for the more apps link.
     */
    @Input() moreAppsTitle: string = 'More';
    /**
     * Title for the app list preview. Main title of the component.
     */
    @Input() appGalleryTitle: string = '';
    /**
     * Description for the app list preview. Will appear under title.
     */
    @Input() appGalleryDescription: string = '';
    /**
     * Path to the custom icon for a link to the more apps to show.
     *
     * Default: arrow icon.
     */
    @Input() routerIcon: string = 'assets/angular-common-components/arrow.svg';
    /**
     * Custom template for the app card to show.
     * If not applied - default app card will be shown.
     */
    @Input() customAppCardTemplate: TemplateRef<FullAppData>;
    /**
     * Router link for the navigation to page with more apps.
     * @example
     * '/apps/all'
     * ['/apps', appsCategory]
     */
    @Input() seeAllUrl: string | any[];
    /**
     * Router link which will be used for navigation by app card click.
     * @example
     * '/apps'
     */
    @Input() routerLinkForOneApp: string;
    /**
     * Key name of the App object which will be chosen like navigation parameter for the Router link.
     * @default 'appId'
     */
    @Input() appNavigationParam: string = 'appId';

    /**
     * Heading tag of label
     * @type {HeadingTag}.
     * @example.
     * 'h2'.
     */
    @Input() headingTag: HeadingTag = 'h2';

    /**
     * Sending current app data on click by App card.
     *
     * Return {FullAppData}
     */
    @Output() clickAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();
    /**
     * Emitter for click by moreAppsTitle.
     */
    @Output() clickMoreApps: EventEmitter<void> = new EventEmitter<void>();

    getAppValueByParameter(app: FullAppData): string {
        if (this.appNavigationParam) {
            return get(app, this.appNavigationParam);
        }
        return '';
    }
}
