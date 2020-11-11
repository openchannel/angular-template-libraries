import {Pipe, PipeTransform} from '@angular/core';
import {AppModel} from 'oc-ng-common-service';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  private isoCurrencyCode = {
    USD: '$',
    EUR: '€',
    CNY: '¥',
    GBP: '£'
  };

  transform(model: AppModel): string {
    let price: string = '';

    if (!model || model.type === 'free') {
      price = 'Free';
    } else  {
      price = model.currency ? Object.keys(this.isoCurrencyCode).includes(model.currency) ?
        this.isoCurrencyCode[model.currency] : '$' : '';
      price += model.price;
      if (model.type === 'recurring') {
        price += '/' + model.billingPeriod.substring(0, 3);
      }
    }
    return price;
  }
}
