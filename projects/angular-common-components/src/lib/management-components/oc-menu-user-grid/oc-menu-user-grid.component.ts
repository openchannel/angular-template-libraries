import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    ComponentsUserAccountGridModel,
    ComponentsUserGridActionModel,
    ComponentsUsersGridParametersModel,
    UserGridOptionType,
} from '../models/user-data.model';

export declare type SortField = 'name' | 'email' | 'date' | 'role';

@Component({
    selector: 'oc-menu-user-grid',
    templateUrl: './oc-menu-user-grid.component.html',
    styleUrls: ['./oc-menu-user-grid.component.scss'],
})
export class OcMenuUserGridComponent {
    @Input() properties: ComponentsUsersGridParametersModel;
    /**
     * Path to the custom icon for the hidden menu toggle button.
     * Default: empty
     */
    @Input() menuUrl: string = 'assets/angular-common-components/dots-menu.svg';
    /**
     * Path to the custom icon for the 'sort' button.
     * Default: empty
     */
    @Input() sortIcon: string = 'assets/angular-common-components/dropdown.svg';
    /**
     * Output of menu list item clicked action.
     * Contains an action name, userId, userAccountId
     */
    @Output() menuClicked: EventEmitter<ComponentsUserGridActionModel> = new EventEmitter<ComponentsUserGridActionModel>();
    /**
     * Output with page number for new users request
     * Start number = 1
     */
    @Output() pageScrolled: EventEmitter<number> = new EventEmitter<number>();
    /**
     * Returns clicked sorting type.
     * can be 'name', 'email', 'date' or 'role'
     */
    @Output() sortChosen: EventEmitter<SortField> = new EventEmitter<SortField>();

    currentSortField: SortField;

    private pageNumber: number = 1;

    constructor() {}

    action(actionType: UserGridOptionType, userData: ComponentsUserAccountGridModel): void {
        const action: ComponentsUserGridActionModel = {
            action: actionType,
            userId: userData.userId,
            userAccountId: userData.userAccountId,
            inviteId: userData?.inviteId,
            inviteToken: userData?.inviteToken,
        };
        this.menuClicked.emit(action);
    }

    onScrollDown(): void {
        this.pageNumber++;
        this.pageScrolled.emit(this.pageNumber);
    }

    sortUsersBy(sortField: SortField): void {
        this.sortChosen.emit(sortField);
        this.currentSortField = sortField;
        this.pageNumber = 1;
    }

    initials(user: ComponentsUserAccountGridModel): string {
        return user?.name
            ? user.name
                  .split(' ')
                  .map(value => value.substring(0, 1))
                  .join('')
                  .substring(0, 2)
            : '';
    }
}
