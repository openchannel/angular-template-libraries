import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'oc-tooltip-label',
  templateUrl: './oc-tooltip-label.component.html',
  styleUrls: ['./oc-toltip-label.component.scss']
})
export class OcTooltipLabelComponent implements OnInit {
  /** Label text */
  @Input() text: string = '';
  /** Show indicator of required field */
  @Input() required: boolean = false;
  /**
   * description (optional) - Description for title.
   * Open small modal panel to the right side with this description text.
   */
  @Input() description: string = '';
  /**
   * infoTitleIconCsv (optional) - icon for showing description.
   */
  @Input() infoTitleIconCsv: string = null;
  /** Set global classes for label */
  @Input() labelClass: string = '';
  constructor() {
  }

  ngOnInit(): void {
  }

}
