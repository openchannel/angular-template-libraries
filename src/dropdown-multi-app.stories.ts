import { OcFormComponentsModule } from '@openchannel/angular-common-components/src/lib/form-components';
import { moduleMetadata } from '@storybook/angular';
import { OcDropdownMultiAppComponent } from '@openchannel/angular-common-components/src/lib/form-components/oc-dropdown-multi-app/oc-dropdown-multi-app.component';
import { AppsSearchService } from '@openchannel/angular-common-components/src/lib/form-components/model/dropdown-multi-app.model';
import { Observable, of } from 'rxjs';
import { NgModule, Provider } from '@angular/core';
import { FullAppData, OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';

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

class StoryMockAppSearchService extends AppsSearchService {
    constructor(private apps: Partial<FullAppData>[]) {
        super();
    }

    loadDefaultApps(existsAppIDs: string[]): Observable<FullAppData[]> {
        return of(this.apps.filter(app => existsAppIDs?.includes(app.appId)) as FullAppData[]);
    }

    appsSearch(existsApps: FullAppData[], searchText: string): Observable<FullAppData[]> {
        const existsAppIDs = (existsApps || []).map(app => app.appId);
        return of(
            this.apps.filter(app => !existsAppIDs.includes(app.appId) && app.name.toLowerCase().includes(searchText)) as FullAppData[],
        );
    }
}

const storyMockProviderAppSearchService: Provider = {
    provide: AppsSearchService,
    useFactory: () => new StoryMockAppSearchService(mockApps),
};

const modules: NgModule = {
    imports: [OcFormComponentsModule, OcCommonLibModule],
    providers: [storyMockProviderAppSearchService],
};

export default {
    title: 'Dropdown multi app component [BEM]',
    component: OcDropdownMultiAppComponent,
    decorators: [moduleMetadata(modules)],
    excludeStories: /.*[M|m]ock.*/,
};

const DropdownMultiAppComponent = (args: OcDropdownMultiAppComponent) => ({
    component: OcDropdownMultiAppComponent,
    moduleMetadata: modules,
    props: args,
});

export const EmptyMultiApp = DropdownMultiAppComponent.bind({});
EmptyMultiApp.args = {};

export const SearchPlaceholderMultiApp = DropdownMultiAppComponent.bind({});
SearchPlaceholderMultiApp.args = {
    dropdownPlaceholder: 'Search  ...',
};

export const DefaultAppsInMultiApp = DropdownMultiAppComponent.bind({});
DefaultAppsInMultiApp.args = {
    dropdownPlaceholder: 'Search  ...',
    defaultAppIDs: ['601ab171d0c0c60baf65433e', '601ab170d0c0c60baf654326'],
};

// Exports for another stories (provider for StoryMockAppSearchService, StoryMockAppSearchService)
export { storyMockProviderAppSearchService, StoryMockAppSearchService };
