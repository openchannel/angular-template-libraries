import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserGridActionModel, UserGridOptionTypeModel, UsersGridParametersModel} from 'oc-ng-common-service';
import {UserAccountGridModel} from 'oc-ng-common-service/lib/model/user.model';

@Component({
  selector: 'oc-menu-user-grid',
  templateUrl: './oc-menu-user-grid.component.html',
  styleUrls: ['./oc-menu-user-grid.component.scss']
})
export class OcMenuUserGridComponent implements OnInit {

  @Input() properties: UsersGridParametersModel;
  /**
   * Path to the custom icon for the hidden menu toggle button.
   * Default: empty
   */
  @Input() menuUrl: string = 'assets/img/dots-menu.svg';
  /**
   * Path to the custom icon for the 'sort' button.
   * Default: empty
   */
  @Input() sortIcon: string = '';
  /**
   * Output of menu list item clicked action.
   * Contains an action name, userId, userAccountId
   */
  @Output() menuClicked: EventEmitter<UserGridActionModel> = new EventEmitter<UserGridActionModel>();
  /**
   * Output with page number for new users request
   * Start number = 1
   */
  @Output() pageScrolled: EventEmitter<number> = new EventEmitter<number>();
  /**
   * Returns clicked sorting type clicked
   * can be 'name', 'email', 'date' or 'role'
   */
  @Output() sortChosen: EventEmitter<'name' | 'email' | 'date' | 'role'> =
    new EventEmitter<'name' | 'email' | 'date' | 'role'>();

  public displayChildrenId: string = null;

  private pageNumber: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  action(actionType: UserGridOptionTypeModel, userData: UserAccountGridModel): void {
    const action: UserGridActionModel = {
      action: actionType,
      userId: userData.userId,
      userAccountId: userData.userAccountId,
      inviteId: userData?.inviteId,
      inviteToken: userData?.inviteToken
    };
    this.menuClicked.emit(action);
  }

  onScrollDown(): void {
    this.pageNumber++;
    this.pageScrolled.emit(this.pageNumber);
  }

  sortAppsBy(by: 'name' | 'email' | 'date' | 'role'): void {
    this.sortChosen.emit(by);
    this.pageNumber = 1;
  }

  initials(user: UserAccountGridModel): string {
    return user?.name ? user.name.split(' ').map(value => value.substring(0, 1)).join('').substring(0, 2) : '';
  }
}
