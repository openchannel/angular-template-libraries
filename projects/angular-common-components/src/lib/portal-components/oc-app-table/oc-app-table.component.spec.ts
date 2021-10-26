import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import { OcAppTableCellPattern, OcAppTableComponent } from './oc-app-table.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CamelcasePipe, GetTextByPathPipe, HtmlTagsReplacerPipe } from '@openchannel/angular-common-components/src/lib/common-components';
import { AppGridSortOptions, AppListing } from '../models/app-listing.model';
import { MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { cloneDeep } from 'lodash';

const propertiesMock: AppListing = {
    layout: 'table',
    data: {
        pageNumber: 1,
        pages: 2,
        count: 1,
        list: [
            {
                appId: 'testId',
                lastUpdated: 1616406353,
                customData: { icon: 'test', summary: '<p class="text">Summary text</p>' },
                version: 1,
                name: 'name',
                safeName: [],
                developerId: 'devId',
                model: [],
                submittedDate: 1616406353,
                created: 1616406353,
                rating: 11,
                reviewCount: 11,
                status: { reason: 'test', lastUpdated: 1616406353, modifiedBy: 'test', value: 'pending' },
                statistics: null,
                isLive: false,
            },
        ],
    },
    options: ['EDIT', 'DELETE', 'SUBMIT', 'PUBLISH', 'PREVIEW'],
};

describe('OcAppTableComponent', () => {
    let component: OcAppTableComponent;
    let fixture: ComponentFixture<OcAppTableComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcAppTableComponent,
                    MockSvgIconComponent,
                    CamelcasePipe,
                    HtmlTagsReplacerPipe,
                    GetTextByPathPipe,
                    OcAppTableCellPattern,
                ],
                providers: [NgModel],
                imports: [FormsModule, CommonModule, BrowserModule, InfiniteScrollModule, NgbModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcAppTableComponent);
        component = fixture.componentInstance;
        component.properties = cloneDeep(propertiesMock);
        component.sortOptions = {
            name: -1,
            status: -1,
            created: -1,
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit pageScrolled event, when table was scrolled', () => {
        jest.spyOn(component.pageScrolled, 'emit');

        const tableDE = fixture.debugElement.query(By.css('.app-grid-table'));
        tableDE.triggerEventHandler('scrolled', {});

        expect(component.pageScrolled.emit).toHaveBeenCalled();
    });

    it('should emit correct action, when action button was clicked', () => {
        const appAction = 'EDIT';

        jest.spyOn(component, 'action');
        jest.spyOn(component.menuClicked, 'emit');

        const editActionDE = fixture.debugElement.query(By.css('.menu-edit'));
        editActionDE.triggerEventHandler('click', {});

        const { appId, version } = propertiesMock.data.list[0];
        const actionObjectToEmit = {
            action: appAction,
            appId,
            appVersion: version,
            isChild: false,
        };

        expect(component.action).toHaveBeenCalledWith(appAction, appId, version, false);
        expect(component.menuClicked.emit).toHaveBeenCalledWith(actionObjectToEmit);
    });

    it('should emit correct sort option, when table header was clicked', () => {
        const sortField = 'name';
        const newSortOptions = {
            name: 1,
            status: -1,
            created: -1,
        };

        jest.spyOn(component, 'sortAppsByKey');
        jest.spyOn(component.sortOptionsChosen, 'emit');

        const nameHeaderDE = fixture.debugElement.query(By.css(`.app-grid-table__header__cell-name-content`));
        nameHeaderDE.triggerEventHandler('click', {});

        expect(component.sortAppsByKey).toHaveBeenCalledWith(sortField);
        expect(component.sortOptionsChosen.emit).toHaveBeenCalledWith({
            sortOptions: newSortOptions,
            changedSortOption: sortField,
        });
    });

    it('should render correct actions', () => {
        const actionsToRender = ['edit', 'delete', 'publish', 'submit', 'preview'];

        component.properties.previewTemplate = 'template-url';
        component.properties.data.list[0].status.value = 'inDevelopment';
        fixture.detectChanges();

        const actionButtonsDE = fixture.debugElement.queryAll(By.css('.menu'));
        const renderedActions = actionButtonsDE.map(actionButtonDE => actionButtonDE.nativeElement.textContent.toLowerCase().trim());

        expect(actionsToRender.sort()).toEqual(renderedActions.sort());
    });

    it('should correctly determine whether to render item action or not by needToShowItem function', () => {
        expect(component.needToShowItem('SUSPEND', 'suspended', 'developer')).toBeFalsy();
        expect(component.needToShowItem('UNSUSPEND', 'suspended', 'developer')).toBeTruthy();
        expect(component.needToShowItem('UNSUSPEND', 'suspended', 'user')).toBeFalsy();
        expect(component.needToShowItem('SUSPEND', 'approved', 'developer')).toBeTruthy();
    });

    it('table headers should invoke sortAppsBy function with correct value', () => {
        const selectorSortCriteriaMap = {
            '.app-grid-table__header__cell-name-content': 'name',
            '.app-grid-table__header__cell-create-date-content': 'created',
            '.app-grid-table__header__cell-status-content': 'status',
        };

        jest.spyOn(component, 'sortAppsByKey');

        Object.entries(selectorSortCriteriaMap).forEach(([selector, sortCriteria]) => {
            const headerDE = fixture.debugElement.query(By.css(selector));
            headerDE.triggerEventHandler('click', {});

            expect(component.sortAppsByKey).toHaveBeenCalledWith(sortCriteria);
        });
    });

    it('should render correct text, if no apps were provided', () => {
        const textToRender = 'No apps found';

        component.noAppMessage = textToRender;
        component.properties.data.list = [];
        fixture.detectChanges();

        const noDataTd = fixture.debugElement.query(By.css('.app-grid-table__bottom-empty-list')).nativeElement;
        expect(noDataTd.textContent.trim()).toBe(textToRender);
    });

    it('should render correct sorting icon', () => {
        const sortOptions: AppGridSortOptions = {
            name: -1,
            status: -1,
            created: -1,
        };
        const ascendingSortIconPath = 'https://some-site.com/ascending-sort-icon-path';
        const descendingSortIconPath = 'https://some-site.com/descending-sort-icon-path';

        component.ascendingSortIcon = ascendingSortIconPath;
        component.descendingSortIcon = descendingSortIconPath;
        component.sortOptions = sortOptions;
        fixture.detectChanges();

        component.sortOptions = { ...sortOptions, name: -1 };
        fixture.detectChanges();

        let sortIcon = fixture.debugElement.query(By.css(`.app-grid-table__header__sort-icon`)).componentInstance;
        expect(sortIcon.src).toBe(descendingSortIconPath);

        component.sortOptions = { ...sortOptions, name: 1 };
        fixture.detectChanges();

        sortIcon = fixture.debugElement.query(By.css(`.app-grid-table__header__sort-icon`)).componentInstance;
        expect(sortIcon.src).toBe(ascendingSortIconPath);
    });

    it('should render correct app icon', () => {
        const defaultAppIconUrl = 'https://some-site.com/default-app-icon-path';
        const appIconUrl = 'https://some-site.com/app-icon-path';

        component.defaultAppIcon = defaultAppIconUrl;
        component.properties.data.list[0].customData.icon = '';
        fixture.detectChanges();

        let appIcon = fixture.debugElement.query(By.css(`.app-grid-table__row__cell-name-content-icon`)).nativeElement;
        expect(appIcon.src).toBe(defaultAppIconUrl);

        component.properties.data.list[0].customData.icon = appIconUrl;
        component.properties.data.list[0] = { ...component.properties.data.list[0] };
        fixture.detectChanges();

        appIcon = fixture.debugElement.query(By.css(`.app-grid-table__row__cell-name-content-icon`)).nativeElement;
        expect(appIcon.src).toBe(appIconUrl);
    });

    it('should set correct src to dropdown dots', () => {
        const dropdownDotsUrl = 'https://some-site.com/dropdown-dots-path';

        component.menuUrl = dropdownDotsUrl ;
        fixture.detectChanges();

        const dropdownDotsImg = fixture.debugElement.query(By.css(`.app-grid-table__row__cell-app-options-dropdown-dots`)).nativeElement;
        expect(dropdownDotsImg.src).toBe(dropdownDotsUrl );
    });

    it('should render child elements for app, if they exist', () => {
        let childTrDE = fixture.debugElement.query(By.css(`.app-grid-table__row_child`));
        expect(childTrDE).toBeFalsy();

        component.properties.data.list[0].children = [cloneDeep(component.properties.data.list[0])];
        fixture.detectChanges();

        childTrDE = fixture.debugElement.query(By.css(`.app-grid-table__row_child`));
        expect(childTrDE).toBeTruthy();
    });

    it('should render correct app name, version, summary, created date and status', () => {
        const { name, version } = component.properties.data.list[0];
        const selectorExpectedValueMap = {
            '.app-grid-table__row__cell-name-content-text-title': name,
            '.app-grid-table__row__cell-name-content-text-version': `v. ${version}`,
            '.app-grid-table__row__cell-summary-text': `Summary text`,
            '.app-grid-table__row__cell-create-date-text': `1/19/1970`,
            '.app-grid-table__row__cell-status-content-text': 'Pending',
        };

        Object.entries(selectorExpectedValueMap).forEach(([selector, expectedValue]) => {
            const element = fixture.debugElement.query(By.css(selector)).nativeElement;
            expect(element.textContent.trim()).toBe(expectedValue);
        });
    });
});
