import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SellerAppsWrapper} from 'oc-ng-common-service'

@Component({
  selector: 'oc-menu-grid',
  templateUrl: './oc-menu-grid.component.html',
  styleUrls: ['./oc-menu-grid.component.scss']
})
export class OcMenuGridComponent implements OnInit {

  @Input() appList: SellerAppsWrapper;

  @Input() menuUrl;
  @Input() sortIcon;
  editIcon = 'assets/img/edit_icon.svg';

  submitIcon = 'assets/img/submit_icon.svg';
  deleteIcon = 'assets/img/delete.svg';
  suspendIcon = 'assets/img/suspend_icon.svg';

  @Output() menuClicked = new EventEmitter<any>();

  childExist: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  action(menu, app) {
    const menuItems = {
      menu: menu,
      appId: app.appId,
      version: app.version,
      hasChild: !!app.childs
    };

    this.menuClicked.emit(menuItems);
  }

}
