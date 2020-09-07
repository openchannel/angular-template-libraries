import {Component, Input, OnInit} from '@angular/core';
import {BasicAppDetails} from 'oc-ng-common-service';

@Component({
  selector: 'oc-recommended-apps',
  templateUrl: './oc-recommended-apps.component.html',
  styleUrls: ['./oc-recommended-apps.component.scss']
})
export class OcRecommendedAppsComponent implements OnInit {

  @Input() appList: BasicAppDetails[] = [];

  @Input() noAppMessage: string = '';

  @Input() recommendedAppTitle: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
