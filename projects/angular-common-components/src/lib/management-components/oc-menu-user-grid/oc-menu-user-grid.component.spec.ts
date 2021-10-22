import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcMenuUserGridComponent } from './oc-menu-user-grid.component';
import { MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ComponentsUserAccountGridModel, UserGridOptionType } from '@openchannel/angular-common-components/src/lib/management-components';
import { By } from '@angular/platform-browser';

const user1: ComponentsUserAccountGridModel = {
    userId: 'userId1',
    name: 'Name Surname',
    email: 'mail1@email.com',
    customData: null,
    created: 0,
    userAccountId: 'userAccountId1',
    inviteStatus: 'ACTIVE',
    inviteId: 'inviteId1',
    inviteToken: 'inviteToken1',
};

const optionsMock: UserGridOptionType[] = ['EDIT', 'DELETE'];

describe('OcMenuUserGridComponent', () => {
    let component: OcMenuUserGridComponent;
    let fixture: ComponentFixture<OcMenuUserGridComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcMenuUserGridComponent, MockSvgIconComponent],
                imports: [InfiniteScrollModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcMenuUserGridComponent);
        component = fixture.componentInstance;
        component.properties = { data: { count: 0, list: [user1], pageNumber: 0, pages: 0 }, layout: 'table', options: optionsMock };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit pageScrolled, when page was scrolled', () => {
        jest.spyOn(component.pageScrolled, 'emit');

        const tableDE = fixture.debugElement.query(By.css('.user-table'));
        tableDE.triggerEventHandler('scrolled', {});

        expect(component.pageScrolled.emit).toHaveBeenCalled();
    });

    it('should emit correct action data, when action button was clicked', () => {
        const actionToEmit = {
            action: 'DELETE',
            userId: user1.userId,
            userAccountId: user1.userAccountId,
            inviteId: user1.inviteId,
            inviteToken: user1.inviteToken,
        };

        jest.spyOn(component.menuClicked, 'emit');

        const deleteActionButtonDE = fixture.debugElement.query(By.css('.menu-delete'));
        deleteActionButtonDE.triggerEventHandler('click', {});

        expect(component.menuClicked.emit).toHaveBeenCalledWith(actionToEmit);
    });

    it('should emit chosen sort options, when sort button was clicked', () => {
        const sortField = 'name';
        const newSortOptions = {
            name: 1,
            date: -1,
            email: -1,
            role: -1,
        };

        jest.spyOn(component.sortChosen, 'emit');
        jest.spyOn(component.sortOptionsChosen, 'emit');

        const sortByNameButtonDE = fixture.debugElement.query(By.css('.user-table__head-name .user-table__th-row'));
        sortByNameButtonDE.triggerEventHandler('click', {});

        expect(component.sortChosen.emit).toHaveBeenCalledWith(sortField);
        expect(component.sortOptionsChosen.emit).toHaveBeenCalledWith({
            sortOptions: newSortOptions,
            changedSortOption: sortField,
        });
    });

    it('should set undefined sort field to default, if it was passed to sortUsersBy', () => {
        const sortField = 'name';
        const newSortOptions = {
            name: -1,
            date: -1,
            email: -1,
            role: -1,
        };

        jest.spyOn(component.sortOptionsChosen, 'emit');

        component.sortOptions = { ...component.sortOptions, name: undefined };
        fixture.detectChanges();

        component.sortUsersBy(sortField);

        expect(component.sortOptionsChosen.emit).toHaveBeenCalledWith({
            sortOptions: newSortOptions,
            changedSortOption: sortField,
        });
    });

    it('should set correct user initials', () => {
        const userInitials = 'NS';

        const userInitialsElement = fixture.debugElement.query(By.css('.user-table__profile')).nativeElement;

        expect(userInitialsElement.textContent.trim()).toBe(userInitials);
    });

    it('initials function should return empty string, if user name is absent', () => {
        expect(component.initials({ ...user1, name: null })).toBe('');
    });

    it('should set correct classes depending on user inviteStatus', () => {
        const invitedClasses = ['user-table__row_highlight-user', 'user-table__profile_invited'];
        const activeClasses = ['user-table__text_dark'];

        const checkClass = classSelector => {
            expect(fixture.debugElement.query(By.css(`.${classSelector}`))).toBeTruthy();
        };

        component.properties.data.list[0].inviteStatus = 'INVITED';
        fixture.detectChanges();
        invitedClasses.forEach(checkClass);

        component.properties.data.list[0].inviteStatus = 'ACTIVE';
        fixture.detectChanges();
        activeClasses.forEach(checkClass);
    });
});
