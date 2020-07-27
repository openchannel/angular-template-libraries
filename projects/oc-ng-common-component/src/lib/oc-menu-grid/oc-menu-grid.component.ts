import { Component, OnInit, Input } from '@angular/core';
import { Applications } from 'oc-ng-common-service';

@Component({
  selector: 'oc-menu-grid',
  templateUrl: './oc-menu-grid.component.html',
  styleUrls: ['./oc-menu-grid.component.scss']
})
export class OcMenuGridComponent implements OnInit {

  @Input() appList: Applications[];

  constructor() { }

  ngOnInit(): void {
  }

}
