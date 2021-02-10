import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FullAppData} from 'oc-ng-common-service';

@Component({
  selector: 'oc-featured-apps',
  templateUrl: './oc-featured-apps.component.html',
  styleUrls: ['./oc-featured-apps.component.scss']
})
export class OcFeaturedAppsComponent implements OnInit {

  /**
   *  List of Featured apps. Must contain the fields: 'icon',
   * 'name', 'summary', 'appId'
   */
  @Input() data: FullAppData[] = [];
  /**
   * Title of the featured apps
   * Default: 'Featured'
   */
  @Input() label: string = 'Featured';
  /**
   * The message that will be shown when no featured apps
   */
  @Input() emptyDataMessage: string = 'No Featured App';
  /**
   * List of classes that will be added to the default class list
   */
  @Input() customClasses: string = '';
  /**
   * Emitter for click by App card.
   */
  @Output() clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
