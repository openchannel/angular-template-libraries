import {Component, Input, OnInit} from '@angular/core';
import {FullAppData} from 'oc-ng-common-service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'oc-app-card',
  templateUrl: './oc-app-card.component.html',
  styleUrls: ['./oc-app-card.component.scss']
})
export class OcAppCardComponent implements OnInit {

  /**
   * One App to show. Must consists fields: 'name', 'model',
   * 'rating', 'reviewCount', 'summary' or 'description'
   */
  @Input() app: FullAppData;
  /** Router link for one app click, will contain 'appId' field */
  @Input() appRouterLink: any | string;
  /** Router path after appRouterLink. */
  @Input() routerAppIdentifier = (appData: FullAppData): string | number => appData.appId;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  safeLink(sourceUrl): SafeResourceUrl {
    return  this.sanitizer.bypassSecurityTrustResourceUrl(sourceUrl);
  }

  parseRating(rating): number {
    return Number(rating) * 0.01;
  }
}
