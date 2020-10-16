import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Application} from 'oc-ng-common-service';

@Component({
  selector: 'oc-app-list-grid',
  templateUrl: './oc-app-list-grid.component.html',
  styleUrls: ['./oc-app-list-grid.component.scss']
})
export class OcAppListGridComponent implements OnInit {

  @Input() appList: Application[] = [];

  @Input() noAppMessage = '';

  @Output() gotoDetails = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.appList);
  }

  viewDetails(app) {
    this.gotoDetails.emit(app);
  }
}
