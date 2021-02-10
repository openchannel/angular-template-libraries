import {Component, Input, OnInit} from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'oc-rating',
  templateUrl: './oc-rating.component.html',
  styleUrls: ['./oc-rating.component.scss']
})
export class OcRatingComponent implements OnInit {

  /**
   * Type of Rating to show. Can be 'multi-star' or 'multi-star'.
   * Default: 'single-star'
   */
  @Input() type: 'single-star' | 'multi-star' = 'single-star';
  /** Rating number */
  @Input() rating: number = 0;
  /** Count of the reviews */
  @Input() reviewCount: number = 0;
  /** Text that can be added near the review count */
  @Input() label: string = '';
  /** List of the public classes that can be added to the label */
  @Input() labelClass: string = 'font-m font-med';

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
  }

}
