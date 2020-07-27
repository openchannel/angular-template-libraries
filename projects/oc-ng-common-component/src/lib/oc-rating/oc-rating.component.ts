import { Component, OnInit, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'oc-rating',
  templateUrl: './oc-rating.component.html',
  styleUrls: ['./oc-rating.component.scss']
})
export class OcRatingComponent implements OnInit {

  @Input() type;
  @Input() rating = 0;
  @Input() reviewCount = 0;

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
  }

}
