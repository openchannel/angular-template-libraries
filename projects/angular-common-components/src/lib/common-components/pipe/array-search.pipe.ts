import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash';

@Pipe({
    name: 'arraySearch',
})
export class ArraySearchPipe implements PipeTransform {
    transform<T>(array: T[], pathToValue: string, searchValue: any): T {
        if (!array) {
            return null;
        }
        return array.find(item => get(item, pathToValue) === searchValue);
    }
}
