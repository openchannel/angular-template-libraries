import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'oc-app-get-started',
  templateUrl: './oc-app-get-started.component.html',
  styleUrls: ['./oc-app-get-started.component.scss']
})
export class OcAppGetStartedComponent implements OnInit {

  @Input() getStartedImage='';

  @Input() getStartedHeader='';

  @Input() getStartedDescription='';

  @Input() getStartedButtonText='';

  @Output() getStarted = new EventEmitter<any>();

  @Input() getStartedType :'home' | 'search' = 'home';
  
  constructor() { }

  ngOnInit(): void {
  }

  listAppGetStarted(){
    this.getStarted.emit();
  }
}
