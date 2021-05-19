import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {OnChanges} from '@angular/core';

@Component({
  selector: 'oc-app-description',
  templateUrl: './oc-app-description.component.html',
  styleUrls: ['./oc-app-description.component.scss']
})
export class OcAppDescriptionComponent implements OnInit, OnChanges {

  @ViewChild('description', { static: true }) description: HTMLParagraphElement;

  /** App Description text */
  @Input() appDescription: string = '';
  /** Header of the App Description section */
  _header : string = '';
  @Input() set header(header: string) {
    if (header) {
      this._header = header;
    }
  }

  /** Show full description always. Text for expand description will not be shown */
  @Input() showFullDescription: boolean = false;
  /** String with classes that will be applied to the header */
  @Input() headerClass: string;
  /** Threshold number to truncate text if 'show more' logic available */
  @Input() threshold: number;
  /** Boolean variable to allow 'show more' logic */
  @Input() allowTruncateLogic = true;

  pureText: string;
  head: string;
  tail: string;

  constructor() { }

  ngOnInit(): void {
    this.rerenderDescription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appDescription.currentValue !== changes.appDescription.previousValue) {
      this.rerenderDescription();
    }
  }

  rerenderDescription(): void {
    let tagsRegExp = /(<([^>]+)>)/ig;
    let tagsArray: string[] = this.appDescription.match(tagsRegExp);
    this.pureText = this.appDescription.replace(tagsRegExp, '');
    this.head = tagsArray.slice(0, tagsArray.length/2).join('');
    this.tail = tagsArray.slice(tagsArray.length/2, tagsArray.length-1).join('');
    if (this.description.offsetHeight < 120 || this.appDescription.length < this.threshold) {
      this.showFullDescription = true;
    }
  }
}
