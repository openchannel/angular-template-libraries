import { Pipe, PipeTransform } from '@angular/core';
import { TransformTextType } from '../model/text-transfrom-pipe.model';

@Pipe({
    name: 'transformText',
})
export class TransformTextPipe implements PipeTransform {
    transform(text: any, type: TransformTextType = null): string | any {
        if (typeof text === 'string') {
            if (type === 'titleCase') {
                return this.toTitleCase(text);
            }
        }
        return text;
    }

    /**
     * The first character will be in uppercase, other characters will be in lower case.
     * 'my text' => 'My text'
     */
    private toTitleCase(text: string): string {
        return `${text.substring(0, 1).toUpperCase()}${text.substring(1).toLowerCase()}`;
    }
}
