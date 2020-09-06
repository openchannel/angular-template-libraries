import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'oc-app-get-started',
  templateUrl: './oc-app-get-started.component.html',
  styleUrls: ['./oc-app-get-started.component.scss']
})
export class OcAppGetStartedComponent implements OnInit {

  @Input() getStartedImage: string = '';

  @Input() getStartedHeader: string = '';

  @Input() getStartedDescription: string = '';

  @Input() getStartedButtonText: string = '';

  @Output() getStarted = new EventEmitter<any>();

  @Input() getStartedType: 'home' | 'search' = 'home';

  constructor() {
  }

  ngOnInit(): void {
  }

  listAppGetStarted() {
    this.getStarted.emit();
  }
}
