import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserGridSortOrder, UserSortChosen } from '../models/menu-user-grid.model';
import {
    ComponentsUserAccountGridModel,
    ComponentsUserGridActionModel,
    ComponentsUsersGridParametersModel,
    UserGridOptionType,
} from '../models/user-data.model';

export declare type SortField = 'name' | 'email' | 'date' | 'role';

/**
 * User grid component. Represent list of users data.
 *
 * @example <oc-menu-user-grid [properties]="{
 *                  layout: 'table',
 *                  data: {
 *                     pages: 1;
 *                     count: 1;
 *                     pageNumber: 1;
 *                     list: [{
 *                         inviteStatus?: 'ACTIVE';
 *                         inviteId?: 'a8gs9d87agsd78';
 *                         inviteToken?: 'a8shd7has8d7h';}]
 *                     }],
 *                     options: ['EDIT'],
 *                     previewTemplate?: '<p>template</p>'
 *                  }
 *              }"
 *              [menuUrl]="/image.svg"
 *              [sortIcon]="/image.svg"
 *              (menuClicked)="clicked()"
 *              (pageScrolled)="scrolled()"
 *              (sortChosen)="chosen()"
 * >
 */
@Component({
    selector: 'oc-menu-user-grid',
    templateUrl: './oc-menu-user-grid.component.html',
    styleUrls: ['./oc-menu-user-grid.component.css'],
})
export class OcMenuUserGridComponent {
    /**
     * Parameters for component model
     */
    @Input() properties: ComponentsUsersGridParametersModel;

    /**
     * Path to the custom icon for the hidden menu toggle button.
     *
     * @default dots-menu.svg
     */
    @Input() menuUrl: string = 'assets/angular-common-components/dots-menu.svg';

    /**
     * Path to the custom icon for the "sort" button.
     *
     * @default dropdown.svg
     */
    @Input() sortIcon: string = 'assets/angular-common-components/dropdown.svg';

    /** Sort icon direction config. */
    @Input() sortOptions: UserGridSortOrder = {
        name: -1,
        date: -1,
        email: -1,
        role: -1,
    };

    /**
     * Output of menu list item clicked action.
     * Contains an action name, userId, userAccountId
     */
    @Output() readonly menuClicked: EventEmitter<ComponentsUserGridActionModel> = new EventEmitter<ComponentsUserGridActionModel>();

    /**
     * Output with page number for new users request
     * Start number = 1
     */
    @Output() readonly pageScrolled: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Returns clicked sorting type.
     * can be `name`, `email`, `date` or `role`
     */
    @Output() readonly sortChosen: EventEmitter<SortField> = new EventEmitter<SortField>();

    /** Emit event when user click by sort icon. */
    @Output() readonly sortOptionsChosen: EventEmitter<UserSortChosen> = new EventEmitter<UserSortChosen>();

    /**
     * Collects data into object and emit it to the Output `menuClicked`
     *
     * @param {UserGridOptionType} actionType
     * @param {ComponentsUserAccountGridModel} userData
     */
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

    /**
     * Function that executes on scroll down
     */
    onScrollDown(): void {
        this.pageScrolled.emit();
    }

    /**
     * Function that set sort field and page number to default(1). Also emit output event `sortChosen` and 'sortOptionsChosen'
     * @param sortField
     */
    sortUsersBy(sortField: SortField): void {
        const newSortOptions = { ...this.sortOptions };

        if (!newSortOptions[sortField]) {
            newSortOptions[sortField] = -1;
        } else {
            newSortOptions[sortField] *= -1;
        }
        // old implementation
        this.sortChosen.emit(sortField);
        // new implementation
        this.sortOptionsChosen.emit({
            sortOptions: newSortOptions,
            changedSortOption: sortField,
        });
    }

    /**
     * Function to get initials from name of user
     * @param {ComponentsUserAccountGridModel} user
     * @returns {string}
     */
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
