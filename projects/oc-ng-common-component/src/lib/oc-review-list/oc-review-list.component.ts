import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OCReviewDetails} from 'oc-ng-common-service';

@Component({
  selector: 'oc-review-list',
  templateUrl: './oc-review-list.component.html',
  styleUrls: ['./oc-review-list.component.scss']
})
export class OcReviewListComponent {

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
  baseReviewsList: OCReviewDetails[] = [];

  @Input() reviewListTitle = 'Most recent reviews';

  @Input() totalReview: number;

  @Input() maxReviewDisplay = 3;

  @Input() canWriteReview = false;

  @Input() noReviewMessage = 'There is no review for this app.';

  @Output() writeAReview = new EventEmitter<any>();

  displayedReviews: OCReviewDetails[] = [];

  constructor() {
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
