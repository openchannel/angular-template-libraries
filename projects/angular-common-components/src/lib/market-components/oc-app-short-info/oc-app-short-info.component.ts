import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppModel, FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-app-short-info',
    templateUrl: './oc-app-short-info.component.html',
    styleUrls: ['./oc-app-short-info.component.scss'],
})
export class OcAppShortInfoComponent implements OnInit {
    /**
     * One App to show. Must consists fields: 'name', 'model',
     * 'rating', 'reviewCount', 'summary' or 'description'
     */
    @Input() app: FullAppData;
    @Input() customDropdown: TemplateRef<any>;

    @Output() clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

    private isoCurrencyCode = {
        USD: '$',
        EUR: '€',
        CNY: '¥',
        GBP: '£',
    };

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit(): void {}

    safeLink(sourceUrl): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(sourceUrl);
    }

    parsePrice(priceModel: AppModel): string {
        let price = '';
        if (priceModel.type === 'free') {
            price = 'Free';
        } else {
            price += priceModel.currency
                ? Object.keys(this.isoCurrencyCode).includes(priceModel.currency)
                    ? this.isoCurrencyCode[priceModel.currency]
                    : '$'
                : '';

            price += priceModel.price / 100;
            if (priceModel.billingPeriod) {
                price += '/' + priceModel.billingPeriod.substring(0, 2);
            }
        }

        return price;
    }

    parseRating(rating): number {
        return Number(rating) * 0.01;
    }
}
