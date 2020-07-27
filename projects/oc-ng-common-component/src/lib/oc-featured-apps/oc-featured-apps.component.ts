import { Component, OnInit, Input } from '@angular/core';
import { FeaturedApp } from 'oc-ng-common-service';

@Component({
  selector: 'oc-featured-apps',
  templateUrl: './oc-featured-apps.component.html',
  styleUrls: ['./oc-featured-apps.component.scss']
})
export class OcFeaturedAppsComponent implements OnInit {
  
  @Input() data: FeaturedApp[] = [];

  @Input() label;

  @Input() emptyDataMessage: string;
  constructor() { }

  ngOnInit(): void {
  }

}
