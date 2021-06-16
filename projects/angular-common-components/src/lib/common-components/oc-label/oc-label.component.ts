import { Component, Input } from '@angular/core';

@Component({
  selector: 'oc-label',
  templateUrl: './oc-label.component.html',
  styleUrls: ['./oc-label.component.scss']
})
export class OcLabelComponent {
  /** Label text */
  @Input() text: string = '';
  /** Show indicator of required field */
  @Input() required: boolean = false;
  /** Set global classes for label */
  @Input() class: string = '';
}
