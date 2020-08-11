import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelcase'
})
export class CamelcasePipe implements PipeTransform {

  transform(input: string): string {
    if (!input) {
      return '';
    } else {
      return input.split(/(?=[A-Z])/).join(' ');
    }
  }

}
