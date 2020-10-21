import {Component, Input, OnInit} from '@angular/core';
import {OverallRatingSummary} from 'oc-ng-common-service';

@Component({
  selector: 'oc-overall-rating',
  templateUrl: './oc-overall-rating.component.html',
  styleUrls: ['./oc-overall-rating.component.scss']
})
export class OcOverallRatingComponent implements OnInit {

  rates: number[] = [5, 4, 3, 2, 1];

  @Input() overallReviewLabel = 'Overall rating';

  @Input() allReviewSummary: OverallRatingSummary = new OverallRatingSummary();

  constructor() {
  }

  ngOnInit(): void {
  }

  // getStarCount(starNumber: number): number {
  //   switch (starNumber) {
  //     case 5:
  //       return this.allReviewSummary.fiveStarCount;
  //     case 4:
  //       return this.allReviewSummary.fourStarCount;
  //     case 3:
  //       return this.allReviewSummary.threeStarCount;
  //     case 2:
  //       return this.allReviewSummary.twoStarCount;
  //     case 1:
  //       return this.allReviewSummary.oneStarCount;
  //     default:
  //       return 5;
  //   }
  // }

}
