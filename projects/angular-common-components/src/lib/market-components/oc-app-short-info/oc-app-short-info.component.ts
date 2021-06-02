import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AppModel, FullAppData} from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-app-short-info',
    templateUrl: './oc-app-short-info.component.html',
    styleUrls: ['./oc-app-short-info.component.scss'],
})
export class OcAppShortInfoComponent implements OnInit {
    /**
     * One App to show. Must contain fields: 'name', 'model',
     * 'rating', 'reviewCount', 'summary' or 'description'
     */
    @Input() app: FullAppData;

    /**
     * The index of the price model in the array, default is 0
     */
    @Input() priceModelIndex: number = 0;
    @Input() customDropdown: TemplateRef<any>;

    @Output() clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

    currentModel: AppModel;

    private isoCurrencyCode = {
        USD: '$',
        EUR: '€',
        CNY: '¥',
        GBP: '£',
    };

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.currentModel = this.app.model[this.priceModelIndex] || this.app.model[0];
    }

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
