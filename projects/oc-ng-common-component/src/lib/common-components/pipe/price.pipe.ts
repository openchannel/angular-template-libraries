import {Pipe, PipeTransform} from '@angular/core';
import {AppModel} from '../model/app-data.model';

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
      price = model.currency ?  this.getCurrency(model.currency) : '';
      price += model.price / 100;
      if (model.type === 'recurring') {
        price += '/' + model.billingPeriod.substring(0, 3);
      }
    }
    return price;
  }

  private getCurrency(currency): string {
    if (Object.keys(this.isoCurrencyCode).includes(currency)) {
      return this.isoCurrencyCode[currency];
    } else {
      return '$';
    }
  }
}
