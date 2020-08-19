import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SellerAppsWrapper } from 'oc-ng-common-service'

@Component({
  selector: 'oc-menu-grid',
  templateUrl: './oc-menu-grid.component.html',
  styleUrls: ['./oc-menu-grid.component.scss']
})
export class OcMenuGridComponent implements OnInit {

  @Input() appList: SellerAppsWrapper;

  @Input() menuUrl;
  @Input() sortIcon;

  @Input() pageSize;
  editIcon = "assets/img/edit_icon.svg";

  submitIcon = "assets/img/submit_icon.svg";
  deleteIcon = "assets/img/delete.svg";
  suspendIcon = "assets/img/suspend_icon.svg";

  sortBy :'name'|'date'|'status' = 'name';
  sortOrder: '1'|'-1' = '1';
  pageNumber=1;

  @Output() menuClicked = new EventEmitter<any>();
  @Output() orderedApps = new EventEmitter<any>();

  childExist: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  action(menu, app) {
    let menuItems = {
      menu: menu,
      appId: app.appId,
      version: app.version,
      hasChild: app.childs ? true : false
    }
    this.menuClicked.emit(menuItems);
  }
  sortAppsBy(sortBy){
    if(this.sortBy !== sortBy){
      this.sortBy=sortBy;
      this.sortOrder = '1';
    }else{
      this.sortOrder= this.sortOrder == '1' ? "-1" : "1";
    }
    let orderedOptions ={
      sortBy:this.sortBy,
      sortOrder:this.sortOrder,
      pageNumber:this.pageNumber
    }
    this.orderedApps.emit(orderedOptions);
  }

  updatePage(pageNumber){
    let orderedOptions ={
      sortBy:this.sortBy,
      sortOrder:this.sortOrder,
      "pageNumber":pageNumber
    }
    this.orderedApps.emit(orderedOptions);
  }
}
