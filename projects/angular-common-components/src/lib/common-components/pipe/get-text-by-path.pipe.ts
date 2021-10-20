import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash';
import { replaceHTMLTags } from '../model/utils.model';

/**
 * Select text value from object by path.
 * @example without default value.
 * <h1>{{ {myObject: {textField: 'myTextValue'}} | getTextByPath: 'myObject.textField' }}</h1>
 *
 * @example with default value.
 * <h1>{{ {myObject: {textField: 'myTextValue'}} | getTextByPath: 'myObject.textField' : 'My default text'}}</h1>
 */
@Pipe({
    name: 'getTextByPath',
})
export class GetTextByPathPipe implements PipeTransform {
    transform(value: any, path: string, defaultValue: string = '', replaceHtmlTags: boolean = true): any {
        const text = get(value || {}, path);
        if (text === null || text === undefined) {
            return defaultValue;
        }
        switch (typeof text) {
            case 'boolean':
            case 'bigint':
            case 'number':
            case 'symbol':
                return String(text);
            case 'string':
                return (replaceHtmlTags ? replaceHTMLTags(text) : text) || defaultValue;
            default:
                console.warn(`Detected invalid path. Can\'t convert this value to string. path: ${path}, valueByPath: ${text}`);
                return defaultValue;
        }
    }
}
