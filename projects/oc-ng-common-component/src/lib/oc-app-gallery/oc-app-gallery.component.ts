import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FullAppData} from 'oc-ng-common-service';

@Component({
  selector: 'oc-app-gallery',
  templateUrl: './oc-app-gallery.component.html',
  styleUrls: ['./oc-app-gallery.component.scss']
})
export class OcAppGalleryComponent implements OnInit {

  /**
   * The array of the apps what will be shown
   */
  @Input() appsArr: FullAppData[] = [];
  /**
   * Message that will be shown when no apps
   */
  @Input() noAppMessage: string = '';
  /**
   * Redirect link for the 'See All'
   */
  @Input() seeAllUrl: string;
  /**
   * Object with router link query parameters.
   * Example: {'some-query': 'some-value'}
   */
  @Input() seeAllLinkQuery: any;
  /**
   * Title for the app list preview
   */
  @Input() appGalleryTitle: string = '';
  /**
   * Description for the app list preview
   */
  @Input() appGalleryDescription: string = '';
  /**
   * Emitter for click by App card.
   */
  @Output() clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();
  /**
   * Path to the custom icon near 'See All'
   */
  @Input() routerIcon: string = 'assets/oc-ng-common-component/arrow.svg';

  constructor() {
  }

  ngOnInit(): void {
  }
}
