import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';
import { get } from 'lodash';

@Component({
    selector: 'oc-app-gallery',
    templateUrl: './oc-app-gallery.component.html',
    styleUrls: ['./oc-app-gallery.component.scss'],
})
export class OcAppGalleryComponent {
    /**
     * The array of the apps what will be shown
     */
    @Input() appsArr: FullAppData[] = [];
    /**
     * Message that will be shown when no apps
     */
    @Input() noAppMessage: string = '';
    /**
     * More apps.
     */
    @Input() moreAppsTitle: string = '';
    /**
     * Emitter for click by moreAppsTitle.
     */
    @Output() clickMoreApps: EventEmitter<void> = new EventEmitter<void>();
    /**
     * Title for the app list preview
     */
    @Input() appGalleryTitle: string = '';
    /**
     * Description for the app list preview
     */
    @Input() appGalleryDescription: string = '';
    /**
     * Path to the custom icon near 'See All'
     */
    @Input() routerIcon: string = 'assets/angular-common-components/arrow.svg';
    /**
     * Custom template for the app card
     */
    @Input() customAppCardTemplate: TemplateRef<FullAppData>;
    /**
     * Router link for the more apps navigation
     */
    @Input() seeAllUrl: string | any;
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
    @Output() clickAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

    getAppValueByParameter(app: FullAppData): string {
        if (this.appNavigationParam) {
            return get(app, this.appNavigationParam);
        }
        return '';
    }
}
