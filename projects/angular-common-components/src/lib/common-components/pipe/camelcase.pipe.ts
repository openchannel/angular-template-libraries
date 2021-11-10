import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'camelcase',
})
export class CamelcasePipe implements PipeTransform {
    transform(input: string): string {
        if (!input) {
            return '';
        } else {
            const spacedStr = input.split(/(?=[A-Z])/).join(' ');
            return spacedStr.substring(0, 1).toUpperCase() + spacedStr.substring(1, spacedStr.length);
        }
    }
}
