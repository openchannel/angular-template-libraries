import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcDropdownMultiAppComponent } from './oc-dropdown-multi-app.component';
import { MockDropboxComponent, MockInitialsComponent, MockTagComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { AppsSearchService } from '@openchannel/angular-common-components/src/lib/form-components';
import { FullAppData } from '../../common-components/model/app-data.model';
import { Observable, of } from 'rxjs';
import { Input, TemplateRef } from '@angular/core';

const mockApps: Partial<FullAppData>[] = [
    {
        appId: '601ab170d0c0c60baf654338',
        version: 5,
        name: 'API Connect Play',
    },
    {
        appId: '601ab170d0c0c60baf654326',
        version: 3,
        name: 'Fuel CRM Gold',
        icon: 'assets/angular-common-components/standard-app-icon.svg',
    },
    {
        appId: '60a65b8feb13480b0f615830',
        version: 7,
        name: 'Intersect Connect',
    },
    {
        appId: '601ab171d0c0c60baf65433e',
        version: 13,
        name: 'Lead Accounting',
        icon: 'assets/angular-common-components/star.svg',
    },
    {
        appId: '601ab170d0c0c60baf65432c',
        version: 4,
        name: 'Fuel CRM Lite',
    },
];

export class MockAppsSearchService extends AppsSearchService {
    constructor() {
        super();
    }

    loadDefaultApps(existsAppIDs: string[]): Observable<FullAppData[]> {
        return of(mockApps.filter(app => existsAppIDs?.includes(app.appId)) as FullAppData[]);
    }

    appsSearch(existsApps: FullAppData[], searchText: string): Observable<FullAppData[]> {
        const existsAppIDs = (existsApps || []).map(app => app.appId);
        return of(
            mockApps.filter(app => !existsAppIDs.includes(app.appId) && app.name.toLowerCase().includes(searchText)) as FullAppData[],
        );
    }
}

describe('OcDropdownMultiAppComponent', () => {
    let component: OcDropdownMultiAppComponent;
    let fixture: ComponentFixture<OcDropdownMultiAppComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcDropdownMultiAppComponent, MockTagComponent, MockDropboxComponent, MockInitialsComponent],
                providers: [{ provide: AppsSearchService, useClass: MockAppsSearchService }],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcDropdownMultiAppComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('null is safe', () => {
        component.dropdownPlaceholder = null;
        component.dropdownClearTextAfterSelect = null;
        component.dropdownCustomDropdownItemTemplateRef = null;
        component.dropdownCustomTagTemplateRef = null;
        component.defaultAppIDs = null;
        component.itemPreviewName = null;
        component.itemPreviewId = null;
        component.itemPreviewVersion = null;
        fixture.detectChanges();
    });

    it('load default apps', () => {
        const firstAppId = '601ab170d0c0c60baf654338';
        const secondAppId = '601ab170d0c0c60baf654326';

        component.defaultAppIDs = [firstAppId, secondAppId];
        jest.spyOn(component.selectedAppsOutput, 'emit');
        fixture.detectChanges();

        expect(component.resultApps[0].appId).toEqual(firstAppId);
        expect(component.resultApps[1].appId).toEqual(secondAppId);
        expect(component.resultApps.length).toEqual(2);
        expect(component.selectedAppsOutput.emit).toHaveBeenCalledWith(component.resultApps);
    });

    it('load default apps (duplicated apps)', () => {
        const firstAppId = '601ab170d0c0c60baf654338';
        component.defaultAppIDs = [firstAppId, firstAppId];
        fixture.detectChanges();
        expect(component.resultApps.length).toEqual(1);
    });

    it('Add app to result array. Remove app from result array', () => {
        jest.spyOn(component.selectedAppsOutput, 'emit');

        // add app
        const appData = mockApps[0];
        component.addAppToResultArray(appData);
        component.addAppToResultArray(appData);
        fixture.detectChanges();

        expect(component.resultApps.length).toEqual(1);
        expect(component.selectedAppsOutput.emit).toHaveBeenCalledWith([appData]);

        // remove app
        component.removeAppFromResultArray(appData as FullAppData);
        fixture.detectChanges();

        expect(component.resultApps.length).toEqual(0);
        expect(component.selectedAppsOutput.emit).toHaveBeenCalledWith([]);
    });
});
