import {Component, Input, OnInit} from '@angular/core';
import { FullAppData } from 'oc-ng-common-service';
import { Router } from '@angular/router';

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
  @Input() seeAllUrl: string;
  /**
   * Object with router link query parameters.
   * Example: {'some-query': 'some-value'}
   */
  @Input() seeAllLinkQuery: any;
  /** Title for the app list preview */
  @Input() appGalleryTitle: string = '';
  /** Description for the app list preview */
  @Input() appGalleryDescription: string = '';
  /** Router link for one app click, will contain 'appId' field */
  @Input() routerLinkForOneApp: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }
  /** Navigation to router link with params */
  navigateToSeeAll(): void {
    if (this.seeAllUrl) {
      if (this.seeAllLinkQuery) {
        this.router.navigate([this.seeAllUrl], {queryParams: this.seeAllLinkQuery}).then();
      } else {
        this.router.navigate([this.seeAllUrl]).then();
      }
    }
  }
}
