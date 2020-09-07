import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'removeHtmlTags'
})
export class RemoveHtmlTagsPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(html) {
    return html ? String(html).replace(/<[^>]*>/g, '').replace('&nbsp', ' ') : '';
  }

}
