import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import { OcAppTableComponent, SortChosen } from './oc-app-table.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    CamelcasePipe,
    GetTextByPathPipe,
    HtmlTagsReplacerPipe
} from '@openchannel/angular-common-components/src/lib/common-components';
import { AppListing } from '../models/app-listing.model';
import { MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { cloneDeep } from 'lodash';
import { deepCopy } from '@angular-devkit/core';

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
                declarations: [OcAppTableComponent, MockSvgIconComponent, CamelcasePipe, HtmlTagsReplacerPipe, GetTextByPathPipe],
                providers: [NgModel],
                imports: [FormsModule, CommonModule, BrowserModule, InfiniteScrollModule, NgbModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcAppTableComponent);
        component = fixture.componentInstance;
        component.properties = cloneDeep(propertiesMock);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit pageScrolled event, when page was scrolled', () => {
        jest.spyOn(component.pageScrolled, 'emit');

        const tableDE = fixture.debugElement.query(By.css('.oc-table'));
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
        const newSortObject = [
            {
                by: 'name',
                ascending: true,
            },
            {
                by: 'created',
                ascending: false,
            },
            {
                by: 'status',
                ascending: false,
            },
        ];

        jest.spyOn(component, 'sortAppsBy');
        jest.spyOn(component.sortChosen, 'emit');

        const nameHeaderDE = fixture.debugElement.query(By.css(`.oc-table__name`));
        nameHeaderDE.triggerEventHandler('click', {});

        expect(component.sortAppsBy).toHaveBeenCalledWith('name');
        expect(component.sortChosen.emit).toHaveBeenCalledWith(newSortObject[0]);
        expect(component.sortingObjects).toEqual(newSortObject);
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

    it('statusColor should return correct class by app status', () => {
        expect(component.statusColor('inDevelopment')).toBe('in-development');
        expect(component.statusColor('inReview')).toBe('in-review');
        expect(component.statusColor('unknownStatus')).toBe('unknownStatus');
    });

    it('table headers should invoke sortAppsBy function with correct value', () => {
        const selectorSortCriteriaMap = { '.oc-table__name': 'name', '.oc-table__data': 'created', '.oc-table__status': 'status' };

        jest.spyOn(component, 'sortAppsBy');

        Object.entries(selectorSortCriteriaMap).forEach(([selector, sortCriteria]) => {
            const headerDE = fixture.debugElement.query(By.css(selector));
            headerDE.triggerEventHandler('click', {});

            expect(component.sortAppsBy).toHaveBeenCalledWith(sortCriteria);
        });
    });

    it('should render correct text, if no apps were provided', () => {
        const textToRender = 'No apps found';

        component.noAppMessage = textToRender;
        component.properties.data.list = [];
        fixture.detectChanges();

        const noDataSpan = fixture.debugElement.query(By.css('.oc-table__td_nodata .oc-table__text-wrapper')).nativeElement;
        expect(noDataSpan.textContent).toBe(textToRender);
    });

    it('should render correct custom sorting icon with correct class', () => {
        const sortObject: SortChosen[] = [
            {
                by: 'name',
                ascending: false,
            },
            {
                by: 'created',
                ascending: false,
            },
            {
                by: 'status',
                ascending: false,
            },
        ];
        const ascendingSortIconPath = 'https://some-site.com/ascending-sort-icon-path';
        const descendingSortIconPath = 'https://some-site.com/descending-sort-icon-path';

        component.ascendingSortIcon = ascendingSortIconPath;
        component.descendingSortIcon = descendingSortIconPath;
        component.sortingObjects = sortObject;
        fixture.detectChanges();

        const customIcon = fixture.debugElement.query(By.css(`.oc-table__name img`)).nativeElement;

        component.sortingObjects[0].ascending = false;
        fixture.detectChanges();
        expect(customIcon.src).toBe(descendingSortIconPath);

        component.sortingObjects[0].ascending = true;
        fixture.detectChanges();
        expect(customIcon.src).toBe(ascendingSortIconPath);
        expect(customIcon.classList).toContain('oc-table__icon-down');
    });

    it('should render correct app icon', () => {
        const defaultAppIconPath = 'https://some-site.com/default-app-icon-path';
        const appIconPath = 'https://some-site.com/app-icon-path';

        component.defaultAppIcon = defaultAppIconPath;
        component.properties.data.list[0].customData.icon = '';
        fixture.detectChanges();

        const appIcon = fixture.debugElement.query(By.css(`.oc-table__app-icon`)).nativeElement;
        expect(appIcon.src).toBe(defaultAppIconPath);

        component.properties.data.list[0].customData.icon = appIconPath;
        fixture.detectChanges();
        expect(appIcon.src).toBe(appIconPath);
    });

    it('should set correct src to dropdown dots', () => {
        const dropdownDotsPath = 'https://some-site.com/dropdown-dots-path';

        component.menuUrl = dropdownDotsPath;
        fixture.detectChanges();

        const dropdownDotsImg = fixture.debugElement.query(By.css(`.oc-table__dropdown-dots`)).nativeElement;
        expect(dropdownDotsImg.src).toBe(dropdownDotsPath);
    });

    it('should render child elements for app, if they exist', () => {
        let childTrDE = fixture.debugElement.query(By.css(`.oc-table__tr-child`));
        expect(childTrDE).toBeFalsy();

        component.properties.data.list[0].children = [deepCopy(propertiesMock.data.list[0])];
        fixture.detectChanges();

        childTrDE = fixture.debugElement.query(By.css(`.oc-table__tr-child`));
        expect(childTrDE).toBeTruthy();
    });

    it('should render correct app name, version, summary, created date and status', () => {
        const { name, version } = component.properties.data.list[0];
        const selectorExpectedValueMap = {
            '.oc-table__app-name': name,
            '.oc-table__app-version': `v ${version}`,
            '.oc-table__summary-text': `Summary text`,
            '.oc-table__created-date': `1/19/1970`,
            '.oc-table__text-status': 'Pending',
        };

        Object.entries(selectorExpectedValueMap).forEach(([selector, expectedValue]) => {
            const element = fixture.debugElement.query(By.css(selector)).nativeElement;
            expect(element.textContent.trim()).toBe(expectedValue);
        });
    });

    it('should render correct app status, if app is inDevelopment', () => {
        component.properties.data.list[0].status.value = 'inDevelopment';
        fixture.detectChanges();

        const appStatus = fixture.debugElement.query(By.css('.oc-table__text-status')).nativeElement;
        expect(appStatus.textContent.trim()).toBe('Draft');
    });
});
