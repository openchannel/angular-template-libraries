import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
    transform(value: string, limit: number = 25, ellipsis: string = '...'): string {
        return value.length > limit ? value.substr(0, limit) + ellipsis : value;
    }
}
