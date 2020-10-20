import {Component, Input, OnInit} from '@angular/core';
import { FullAppData } from 'oc-ng-common-service';

@Component({
  selector: 'oc-app-gallery',
  templateUrl: './oc-app-galary.component.html',
  styleUrls: ['./oc-app-galary.component.scss']
})
export class OcAppGalleryComponent implements OnInit {

  /**
   * The array of the apps what will be shown
   */
  @Input() appsArr: FullAppData[] = [];
  /** Message that will be shown when no apps */
  @Input() noAppMessage: string = '';
  /** Redirect link for the 'See All' */
  @Input() seeAllUrl: string | any;
  /** Title for the app list preview */
  @Input() appGalleryTitle: string = '';
  /** Description for the app list preview */
  @Input() appGalleryDescription: string = '';
  /** Router link for one app click, will contain 'appId' field */
  @Input() routerLinkForOneApp: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
