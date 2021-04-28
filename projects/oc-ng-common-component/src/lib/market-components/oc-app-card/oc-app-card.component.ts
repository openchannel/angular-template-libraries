import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FullAppData} from 'oc-ng-common-component/src/lib/common-components';

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
  @Input() set app(appData: FullAppData) {
    this.appData = appData;
    if (this.appData?.icon) {
      this.appIcon = this.sanitizer.bypassSecurityTrustResourceUrl(this.appData.icon as string);
    }
  }
  /**
   * Emitter for click by App card.
   */
  @Output() clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

  public appIcon: SafeResourceUrl = 'assets/oc-ng-common-component/standard-app-icon.svg';
  public appData: FullAppData;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  safeLink(sourceUrl): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(sourceUrl);
  }

  parseRating(rating): number {
    return Number(rating) * 0.01;
  }

  clickByApp(): void {
    this.clickByAppCard.emit(this.appData);
  }
}
