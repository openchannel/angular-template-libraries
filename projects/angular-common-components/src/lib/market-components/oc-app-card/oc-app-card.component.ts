import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { AppModel, FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-app-card',
    templateUrl: './oc-app-card.component.html',
    styleUrls: ['./oc-app-card.component.css'],
})
export class OcAppCardComponent implements OnInit {
    /**
     * The index of the price model in the array, default is 0
     */
    @Input() priceModelIndex: number = 0;

    /**
     * One App to show. Must contain fields: "name", "model",
     * "rating", "reviewCount", "summary" or "description"
     * @type FullAppData
     */
    @Input() set app(appData: FullAppData) {
        this.appData = appData;
        if (this.appData?.icon) {
            this.appIcon = this.appData?.icon;
        }
    }
    /**
     * Emitting click by App card. Works only when appRedirectLink does not applied.
     * Emmit Full App Data
     */
    @Output() readonly clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

    appIcon: SafeResourceUrl | string = 'assets/angular-common-components/standard-app-icon.svg';

    appData: FullAppData;

    currentModel: AppModel;
    // prettier-ignore
    constructor() {} // NOSONAR

    ngOnInit(): void {
        this.currentModel = this.appData.model[this.priceModelIndex] || this.appData.model[0];
    }

    clickByApp(): void {
        this.clickByAppCard.emit(this.appData);
    }
}
