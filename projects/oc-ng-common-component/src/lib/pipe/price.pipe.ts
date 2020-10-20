import {Pipe, PipeTransform} from '@angular/core';
import {AppModel} from 'oc-ng-common-service';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(model: AppModel): string {
    if (!model || model.type === 'free') {
      return 'free';
    } else if (model.type === 'recurring') {
      return `${model.price}${model.billingPeriod ? '/' + model.billingPeriod.slice(0, 3) : ''}`;
    }
    return `${model.price}`;
  }
}
