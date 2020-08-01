import { Component, OnInit, Input } from '@angular/core';
import { Application } from 'oc-ng-common-service'

@Component({
  selector: 'oc-menu-grid',
  templateUrl: './oc-menu-grid.component.html',
  styleUrls: ['./oc-menu-grid.component.scss']
})
export class OcMenuGridComponent implements OnInit {

  @Input() appList: Application;

  constructor() { }

  ngOnInit(): void {
  }

}
