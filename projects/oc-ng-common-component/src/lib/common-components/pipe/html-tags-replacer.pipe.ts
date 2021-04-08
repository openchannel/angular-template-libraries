import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceHtmlTags'
})
export class HtmlTagsReplacerPipe implements PipeTransform {

  transform(value: string): string {
    if (value.includes('</')) {
     value = value.replace(/<[^>]*>/g, '');
    }
    return value;
  }

}
