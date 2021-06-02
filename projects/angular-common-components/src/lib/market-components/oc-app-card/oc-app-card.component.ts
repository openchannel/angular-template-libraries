import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {AppModel, FullAppData} from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-app-card',
    templateUrl: './oc-app-card.component.html',
    styleUrls: ['./oc-app-card.component.scss'],
})
export class OcAppCardComponent implements OnInit {

    /**
     * The index of the price model in the array, default is 0
     */
    @Input() priceModelIndex: number = 0;

    /**
     * One App to show. Must consists fields: 'name', 'model',
     * 'rating', 'reviewCount', 'summary' or 'description'
     */
    @Input() set app(appData: FullAppData) {
        this.appData = appData;
        if (this.appData?.icon) {
            this.appIcon = this.sanitizer.bypassSecurityTrustResourceUrl(this.appData.icon as string);
        }
    }
    /**
     * Router link for the more apps navigation
     */
    @Input() appRedirectLink: string | any;
    /**
     * Emitter for click by App card.
     */
    @Output() clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

    appIcon: SafeResourceUrl = 'assets/angular-common-components/standard-app-icon.svg';
    appData: FullAppData;

    currentModel: AppModel;

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.currentModel = this.appData.model[this.priceModelIndex] || this.appData.model[0];
    }

    safeLink(sourceUrl): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(sourceUrl);
    }

    parseRating(rating): number {
        return Number(rating) * 0.01;
    }

    clickByApp(): void {
        this.clickByAppCard.emit(this.appData);
    }
}
