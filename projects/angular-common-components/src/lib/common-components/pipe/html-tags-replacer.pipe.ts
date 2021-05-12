import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replaceHtmlTags',
})
export class HtmlTagsReplacerPipe implements PipeTransform {
    transform(value: string): string {
        if (typeof value === 'string' && value.includes('</')) {
            const tmp = document.createElement('div');
            tmp.innerHTML = value;
            return tmp.textContent || tmp.innerText || '';
        }
        return value;
    }
}
