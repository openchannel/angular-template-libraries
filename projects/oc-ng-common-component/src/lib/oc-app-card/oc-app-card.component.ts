import {Component, Input, OnInit} from '@angular/core';
import { AppModel, FullAppData } from 'oc-ng-common-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'oc-app-card',
  templateUrl: './oc-app-card.component.html',
  styleUrls: ['./oc-app-card.component.scss']
})
export class OcAppCardComponent implements OnInit {

  /**
   * One App to show. Must consists fields: 'name', 'model',
   * 'rating', 'reviewCount', 'summary' or 'description'
   */
  @Input() app: FullAppData;
  /** Router link for one app click, will contain 'appId' field */
  @Input() appRouterLink: any | string;

  private isoCurrencyCode = {
    USD: '$',
    EUR: '€',
    CNY: '¥',
    GBP: '£'
  };
  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  safeLink(sourceUrl): SafeResourceUrl {
    return  this.sanitizer.bypassSecurityTrustResourceUrl(sourceUrl);
  }

  parsePrice(priceModel: AppModel): string {
    let price: string = '';
    if (priceModel.type === 'free') {
       price = 'Free';
    } else {
       price += priceModel.currency ? Object.keys(this.isoCurrencyCode).includes(priceModel.currency) ?
         this.isoCurrencyCode[priceModel.currency] : '$' : '';

       price += priceModel.price;
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
