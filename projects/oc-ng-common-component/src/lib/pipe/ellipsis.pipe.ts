import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, limit = 25, ellipsis = '...') {
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }

}
