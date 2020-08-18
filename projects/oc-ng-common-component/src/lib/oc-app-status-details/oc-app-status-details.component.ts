import { Component, OnInit, Input } from '@angular/core';
import { AppStatusDetails } from 'oc-ng-common-service';

@Component({
  selector: 'oc-app-status-details',
  templateUrl: './oc-app-status-details.component.html',
  styleUrls: ['./oc-app-status-details.component.scss']
})
export class OcAppStatusDetailsComponent implements OnInit {

  @Input() appStatus: AppStatusDetails = new AppStatusDetails();
  constructor() { }

  ngOnInit(): void {

    console.log('app status details ', this.appStatus)
  }

}
