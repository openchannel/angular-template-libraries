import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BasicAppDetails} from 'oc-ng-common-service';

@Component({
  selector: 'oc-app-list-grid',
  templateUrl: './oc-app-list-grid.component.html',
  styleUrls: ['./oc-app-list-grid.component.scss']
})
export class OcAppListGridComponent implements OnInit {

  @Input() appList : BasicAppDetails[] = [];

  @Input() noAppMessage ='';
  
  @Output() gotoDetails = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  viewDetails(app){
    this.gotoDetails.emit(app);
  }
}
