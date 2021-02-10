import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  /**
   * Emitter for click by App card.
   */
  @Output() clickByAppCard: EventEmitter<FullAppData> = new EventEmitter<FullAppData>();

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
    this.clickByAppCard.emit(this.app);
  }
}
