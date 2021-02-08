import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'oc-app-get-started',
  templateUrl: './oc-app-get-started.component.html',
  styleUrls: ['./oc-app-get-started.component.scss']
})
export class OcAppGetStartedComponent implements OnInit {

  @Input() getStartedImage: string = './assets/img/get-started.svg';

  @Input() getStartedHeader: string = 'List Your App in our App Store';

  @Input() getStartedDescription: string = '';

  @Input() getStartedButtonText: string = '';

  @Output() getStarted = new EventEmitter<any>();

  @Input() getStartedType: 'home' | 'search' = 'home';

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  listAppGetStarted() {
    this.getStarted.emit();
  }

  sanitizeImage(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.getStartedImage);
  }
}
