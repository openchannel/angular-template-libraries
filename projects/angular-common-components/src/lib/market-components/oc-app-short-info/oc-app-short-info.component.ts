import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AppModel, FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';

/**
 * Represents the one App Card for the vertical list of apps.
 */
@Component({
    selector: 'oc-app-short-info',
    templateUrl: './oc-app-short-info.component.html',
    styleUrls: ['./oc-app-short-info.component.css'],
})
export class OcAppShortInfoComponent implements OnInit {
    /**
     * (Required)
     * App data object for current component.
     */
    @Input() set app(app: FullAppData) {
        if (!app) {
            console.error('@Input() app is required!');
        } else {
            this.cardApp = app;
            this.cardApp.icon = app.icon || '';
        }
    }
    /**
     * The index of the price model in the array, default is 0
     */
    @Input() priceModelIndex: number = 0;
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
    currentModel: AppModel;

    constructor() {}

    ngOnInit(): void {
        this.currentModel = this.cardApp.model[this.priceModelIndex] || this.cardApp.model[0];
    }
}
