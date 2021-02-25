import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FullAppData} from 'oc-ng-common-service';

@Component({
  selector: 'oc-app-list-grid',
  templateUrl: './oc-app-list-grid.component.html',
  styleUrls: ['./oc-app-list-grid.component.scss']
})
export class OcAppListGridComponent implements OnInit {

  @Input() appList: FullAppData[] = [];

  @Input() noAppMessage = '';
  @Input() defaultAppIcon = 'assets/oc-ng-common-component/standard-app-icon.svg';

  @Output() gotoDetails = new EventEmitter<FullAppData>();

  constructor() {
  }

  ngOnInit(): void {
  }

  viewDetails(app) {
    this.gotoDetails.emit(app);
  }
}
