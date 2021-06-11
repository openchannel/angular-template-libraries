import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';

/**
 * Represents the one App Card for the vertical list of apps.
 */
@Component({
    selector: 'oc-app-short-info',
    templateUrl: './oc-app-short-info.component.html',
    styleUrls: ['./oc-app-short-info.component.scss'],
})
export class OcAppShortInfoComponent {
    /**
     * (Required)
     * App data object for current component.
     */
    @Input() set appData(app: FullAppData) {
        if (!app) {
            console.error('@Input() appData is required!');
        } else {
            this.cardApp = app;
            this.cardApp.icon = app.icon ? this.sanitizer.bypassSecurityTrustResourceUrl(app.icon as string) : '';
        }
    }

    /**
     * (Optional)
     * Template for the dropdown menu. If not set - no dropdown menu will appear.
     */
    @Input() customDropdown: TemplateRef<any>;
    /**
     * (Optional)
     *  Path to the custom Default App Icon that will be shown when the app has no icon.
     *
     *  Default: default app icon
     */
    @Input() defaultAppIcon: string = 'assets/angular-common-components/standard-app-icon.svg';
    /**
     *  The emitter reports that current app card has been clicked. Return current app object data.
     */
    @Output() readonly clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

    cardApp: FullAppData;

    constructor(private sanitizer: DomSanitizer) {}
}
