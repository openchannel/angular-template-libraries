import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OCReviewDetails} from 'oc-ng-common-service';

@Component({
  selector: 'oc-review-list',
  templateUrl: './oc-review-list.component.html',
  styleUrls: ['./oc-review-list.component.scss']
})
export class OcReviewListComponent implements OnInit {

  @Input() reviewsList: OCReviewDetails[] = [];

  @Input() reviewListTitle = 'Most recent reviews';

  @Input() totalReview: number;

  @Input() maxReviewDisplay = 3;

  @Input() canWriteReview = false;

  @Input() noReviewMessage = 'There is no review for this app.';

  @Output() writeAReview = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.setReviewsDisplayList();
  }

  writeReview() {
    this.writeAReview.emit();
  }

  setReviewsDisplayList() {
    if (this.reviewsList && this.reviewsList.length > this.maxReviewDisplay) {
      this.reviewsList.splice(this.maxReviewDisplay);
    }
  }
}
