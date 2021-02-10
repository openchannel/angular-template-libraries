import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FullAppData} from 'oc-ng-common-service';

@Component({
  selector: 'oc-recommended-apps',
  templateUrl: './oc-recommended-apps.component.html',
  styleUrls: ['./oc-recommended-apps.component.scss']
})
export class OcRecommendedAppsComponent implements OnInit {

  /**
   *  Array of the Recommended apps
   *  Must consists fields: 'name', 'model',
   * 'rating', 'reviewCount', 'summary' or 'description'
   */
  @Input() appList: FullAppData[] = [];
  /**
   * Message that will be shown when no apps
   */
  @Input() noAppMessage: string = '';
  /**
   * Title for the Recommended apps list. Default 'Recommended Apps'
   */
  @Input() recommendedAppTitle: string = 'Recommended Apps';
  /**
   * Emitter for click by App card.
   */
  @Output() clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
