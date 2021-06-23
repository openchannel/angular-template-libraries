import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-app-card',
    templateUrl: './oc-app-card.component.html',
    styleUrls: ['./oc-app-card.component.scss'],
})
export class OcAppCardComponent {
    /**
     * One App to show. Must contain fields: "name", "model",
     * "rating", "reviewCount", "summary" or "description"
     * @type FullAppData
     */
    @Input() set app(appData: FullAppData) {
        this.appData = appData;
        if (this.appData?.icon) {
            this.appIcon = this.sanitizer.bypassSecurityTrustResourceUrl(this.appData.icon as string);
        }
    }
    /**
     * The RouterLink will lead to another page by click on the App card.
     */
    @Input() appRedirectLink: any[] | string | null | undefined = null;
    /**
     * Emitting click by App card. Works only when appRedirectLink does not applied.
     * Emmit Full App Data
     */
    @Output() clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

    appIcon: SafeResourceUrl = 'assets/angular-common-components/standard-app-icon.svg';
    appData: FullAppData;

    constructor(private sanitizer: DomSanitizer) {}

    clickByApp(): void {
        this.clickByAppCard.emit(this.appData);
    }
}
