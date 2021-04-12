import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {OCReviewDetails} from 'oc-ng-common-component/src/lib/common-components/interfaces/oc-review-details-model';

@Component({
  selector: 'oc-review-list',
  templateUrl: './oc-review-list.component.html',
  styleUrls: ['./oc-review-list.component.scss']
})
export class OcReviewListComponent implements OnChanges {

  baseReviewsList: OCReviewDetails[] = [];

  @Input() reviewListTitle = 'Most recent reviews';

  @Input() totalReview: number;

  @Input() maxReviewDisplay: number = 3;

  @Input() canWriteReview = false;

  @Input() noReviewMessage = 'There is no review for this app.';

  @Input()
  set reviewsList(list: OCReviewDetails[]) {
    if (list) {
      this.baseReviewsList = list;
      this.displayedReviews = [...list];
    }
    if (this.baseReviewsList && this.baseReviewsList.length > 0) {
      this.toggleDisplay();
    }
  }

  @Output() writeAReview = new EventEmitter<any>();

  displayedReviews: OCReviewDetails[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.maxReviewDisplay && this.maxReviewDisplay) {
      if (changes.maxReviewDisplay.previousValue !== changes.maxReviewDisplay.currentValue) {
        this.displayedReviews = [...this.baseReviewsList];
        this.toggleDisplay();
      }
    }
  }

  writeReview() {
    this.writeAReview.emit();
  }

  toggleDisplay(): void {
    if (this.displayedReviews.length === this.maxReviewDisplay) {
      this.displayedReviews = [...this.baseReviewsList];
    } else {
      this.displayedReviews.splice(this.maxReviewDisplay);
    }
  }
}
