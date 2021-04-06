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
  /**
   * Text that will be shown on expand description button
   * Default: 'Show full description'
   */
  @Input() expandDescriptionText: string = 'Show full description';
  /** Show full description always. Text for expand description will not be shown */
  @Input() showFullDescription: boolean = false;
  /** String with classes that will be applied to the header */
  @Input() headerClass: string;

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
    if (this.description.offsetHeight < 120) {
      this.showFullDescription = true;
    }
  }
}
