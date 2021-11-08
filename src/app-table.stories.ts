import { componentWrapperDecorator, moduleMetadata, Story } from '@storybook/angular';
import {
    AppListing,
    OcPortalComponentsModule,
    OcAppTableComponent,
} from '@openchannel/angular-common-components/src/lib/portal-components';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';

const modules = {
    imports: [OcPortalComponentsModule],
};

export default {
    title: 'App List [BEM]',
    component: OcAppTableComponent,
    decorators: [moduleMetadata(modules), componentWrapperDecorator(story => `<div style="max-width: 1110px;">${story}</div>`)],
};

const ListGridComponent = (args: OcAppTableComponent) => ({
    component: OcAppTableComponent,
    moduleMetadata: modules,
    props: args,
    excludeStories: /.*[M|m]ock.*/,
});

const statElement = {
    '90day': 10,
    '30day': 20,
    total: 30,
};

const appWithoutSpacesChildApp: Partial<FullAppData> = {
    name: '(child)Largeappwordwordwordwordwordwordwordwordwordwordwordwordwordwordword',
    version: 1.2,
    created: 1432696823474,
    customData: {
        icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255adfb5ad376fff84b6cf.png',
        summary:
            '(child)Largeappsummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummarysummary',
    },
    status: {
        value: 'inDevelopment',
        modifiedBy: 'developer',
        reason: null,
        lastUpdated: null,
    },
};

const appWithLargeFieldsChildApp: Partial<FullAppData> = {
    name: '(child) Large app word word word word word word word word word word word word word word word',
    version: 1.2,
    created: 1432696823474,
    customData: {
        icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255adfb5ad376fff84b6cf.png',
        summary:
            '(child) Large app summary summary summary summary summary summary summary summary summary summary ' +
            'summary summary summary summary summary summary summary summary summary summary summary summary summary summary summary summary summary summary',
    },
    status: {
        value: 'inDevelopment',
        modifiedBy: 'developer',
        reason: null,
        lastUpdated: null,
    },
};

const appWithLargeFields: Partial<FullAppData> = {
    name: 'Large app word word word word word word word word word word word word word word word',
    version: 1,
    created: 1596122025249,
    customData: {
        icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255adfb5ad376fff84b6cf.png',
        summary:
            'Large app summary summary summary summary summary summary summary summary summary summary ' +
            'summary summary summary summary summary summary summary summary summary summary summary summary summary summary summary summary summary summary',
    },
    status: {
        value: 'approved',
        modifiedBy: 'developer',
        reason: null,
        lastUpdated: null,
    },
    reviewCount: 25,
    children: [appWithLargeFieldsChildApp as FullAppData, appWithoutSpacesChildApp as FullAppData],
};

const app1: FullAppData = {
    appId: '5f22dd91b5ad376fff8431a7',
    safeName: ['firstapp'],
    customData: {
        summary: 'Some Test summary',
        'website-url': null,
        'product-images': null,
        icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255adfb5ad376fff84b6cf.png',
        category: ['category'],
        'video-url': null,
    },
    status: {
        value: 'approved',
        lastUpdated: 1432696823474,
        modifiedBy: 'developer',
        reason: '',
    },
    developerId: '3dcfdd48ed6b4f9d8b6a3e23deb36249',
    model: [
        {
            license: 'single',
            modelId: '5f22dd91b5ad376fff8431a6',
            price: 0,
            currency: 'USD',
            type: 'free',
            trial: 0,
        },
    ],
    name: 'FirstApp',
    lastUpdated: 1432696823474,
    isLive: true,
    version: 1,
    submittedDate: 1432696823474,
    created: 1432696823474,
    rating: 4.2,
    reviewCount: 10,
    statistics: {
        views: statElement,
        downloads: statElement,
        developerSales: statElement,
        totalSales: statElement,
        ownerships: statElement,
        reviews: statElement,
    },
    children: [
        {
            appId: '5f22dd91b5ad376fff8431a7',
            safeName: ['firstapp'],
            customData: {
                summary: 'New Test Summary',
                'website-url': null,
                'product-images': null,
                icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255adfb5ad376fff84b6cf.png',
                category: ['category'],
                'video-url': null,
            },
            status: {
                value: 'inDevelopment',
                lastUpdated: 1432696823474,
                modifiedBy: 'developer',
                reason: '',
            },
            developerId: '3dcfdd48ed6b4f9d8b6a3e23deb36249',
            model: [
                {
                    license: 'single',
                    modelId: '5f22dd91b5ad376fff8431a6',
                    price: 0,
                    currency: 'USD',
                    type: 'free',
                    trial: 0,
                },
            ],
            name: 'FirstApp',
            lastUpdated: 1432696823474,
            isLive: false,
            version: 1.2,
            submittedDate: 1432696823474,
            created: 1432956823474,
            rating: 4.2,
            reviewCount: 10,
            statistics: {
                views: statElement,
                downloads: statElement,
                developerSales: statElement,
                totalSales: statElement,
                ownerships: statElement,
                reviews: statElement,
            },
        },
        {
            appId: '5f22dd91b5ad376fff8431a7',
            safeName: ['firstapp'],
            customData: {
                summary:
                    'New Test Summary, new Test Summary, new Test Summary, new Test Summary, new Test Summary, new Test Summary, new Test Summary, new Test Summary, new Test Summary, new Test Summary, new Test Summary',
                'website-url': null,
                'product-images': null,
                icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255adfb5ad376fff84b6cf.png',
                category: ['category'],
                'video-url': null,
            },
            status: {
                value: 'suspended',
                lastUpdated: 1432696823474,
                modifiedBy: 'developer',
                reason: '',
            },
            developerId: '3dcfdd48ed6b4f9d8b6a3e23deb36249',
            model: [
                {
                    license: 'single',
                    modelId: '5f22dd91b5ad376fff8431a6',
                    price: 0,
                    currency: 'USD',
                    type: 'free',
                    trial: 0,
                },
            ],
            name: 'FirstApp',
            lastUpdated: 1432696823474,
            isLive: false,
            version: 1.1,
            submittedDate: 1432696823474,
            created: 1434796823474,
            rating: 4.2,
            reviewCount: 10,
            statistics: {
                views: statElement,
                downloads: statElement,
                developerSales: statElement,
                totalSales: statElement,
                ownerships: statElement,
                reviews: statElement,
            },
        },
    ],
};
const app2: FullAppData = {
    appId: '5f22e2e1ec4ad046ff9e5968',
    safeName: ['secondapp'],
    customData: {
        summary: '',
        'website-url': null,
        'product-images': null,
        icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255ab1ec4ad046ff9edaa2.png',
        category: ['Cat1'],
        'video-url': null,
    },
    status: {
        value: 'inDevelopment',
        lastUpdated: 1596283571928,
        modifiedBy: 'developer',
        reason: '',
    },
    developerId: '3dcfdd48ed6b4f9d8b6a3e23deb36249',
    model: [
        {
            license: 'single',
            modelId: '5f22e2e1ec4ad046ff9e5967',
            price: 0,
            currency: 'USD',
            type: 'free',
            trial: 0,
        },
    ],
    name: 'SecondApp',
    lastUpdated: 1596283571928,
    isLive: false,
    version: 1,
    submittedDate: 1596121825148,
    created: 1432696823474,
    rating: 4.2,
    reviewCount: 10,
    statistics: {
        views: statElement,
        downloads: statElement,
        developerSales: statElement,
        totalSales: statElement,
        ownerships: statElement,
        reviews: statElement,
    },
};

const app3: FullAppData = {
    appId: '5f22e3a9ec4ad046ff9e59ec',
    safeName: ['thirdapp'],
    customData: {
        summary: 'this is long text',
        'website-url': 'http://www.google.com',
        'product-images': null,
        icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255af8b5ad376fff84b6d2.png',
        category: ['Cat1'],
        'video-url': 'http://www.google.com',
    },
    status: {
        value: 'inDevelopment',
        lastUpdated: 1596122025252,
        modifiedBy: 'developer',
        reason: '',
    },
    developerId: '3dcfdd48ed6b4f9d8b6a3e23deb36249',
    model: [
        {
            license: 'single',
            modelId: '5f22e3a9ec4ad046ff9e59eb',
            price: 5,
            currency: 'USD',
            type: 'single',
            trial: 0,
        },
    ],
    name: 'ThirdApp',
    lastUpdated: 1596283642040,
    isLive: false,
    version: 1,
    submittedDate: 1596283642040,
    created: 1596122025249,
    rating: 4.2,
    reviewCount: 10,
    statistics: {
        views: statElement,
        downloads: statElement,
        developerSales: statElement,
        totalSales: statElement,
        ownerships: statElement,
        reviews: statElement,
    },
};

const app4: FullAppData = {
    appId: '5f236dedec4ad046ff9e855e',
    safeName: ['fourthapp'],
    customData: {
        summary: '',
        'website-url': 'http://www.google.com',
        'product-images': null,
        icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255992b5ad376fff84b6a6.png',
        category: ['Cat1'],
        'video-url': 'http://www.google.com',
    },
    status: {
        value: 'suspended',
        lastUpdated: 1596781554361,
        modifiedBy: 'administrator',
        reason: '',
    },
    developerId: '3dcfdd48ed6b4f9d8b6a3e23deb36249',
    model: [
        {
            license: 'single',
            modelId: '5f236dedec4ad046ff9e855d',
            price: 5,
            currency: 'USD',
            type: 'recurring',
            trial: 0,
            billingPeriod: 'monthly',
        },
    ],
    name: 'FourthApp',
    lastUpdated: 1596283284364,
    isLive: false,
    version: 1.3,
    submittedDate: 1596781554341,
    created: 1596157421014,
    rating: 5,
    reviewCount: 3,
    statistics: {
        views: statElement,
        downloads: statElement,
        developerSales: statElement,
        totalSales: statElement,
        ownerships: statElement,
        reviews: statElement,
    },
};

const app5: FullAppData = {
    appId: '5f236e6bec4ad046ff9e8567',
    safeName: ['fifththapp'],
    customData: {
        summary: 'my app',
        'website-url': 'http://www.google.com',
        'product-images': null,
        icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255992b5ad376fff84b6a6.png',
        category: ['Cat1'],
        'video-url': 'http://www.google.com',
    },
    status: {
        value: 'approved',
        lastUpdated: 1596782716848,
        modifiedBy: 'administrator',
        reason: '',
    },
    developerId: '3dcfdd48ed6b4f9d8b6a3e23deb36249',
    model: [
        {
            license: 'single',
            modelId: '5f236dedec4ad046ff9e855d',
            price: 5,
            currency: 'USD',
            type: 'recurring',
            trial: 0,
            billingPeriod: 'monthly',
        },
    ],
    name: 'FifthApp',
    lastUpdated: 1596782716848,
    isLive: true,
    version: 2.1,
    submittedDate: 1596781554341,
    created: 1596157421014,
    rating: 4,
    reviewCount: 12,
    statistics: {
        views: statElement,
        downloads: statElement,
        developerSales: statElement,
        totalSales: statElement,
        ownerships: statElement,
        reviews: statElement,
    },
};
const propsConfig: AppListing = {
    layout: 'table',
    data: {
        pages: 50,
        pageNumber: 1,
        list: [appWithLargeFields as FullAppData, app1, app2, app3, app4, app5],
        count: 50,
    },
    options: ['EDIT', 'PREVIEW', 'PUBLISH', 'SUSPEND', 'DELETE'],
};

export const AppGrid = ListGridComponent.bind({});

AppGrid.args = {
    properties: propsConfig,
    noAppMessage: 'No Apps Has Been Added Yet',
};

const CustomAppTableTemplate: Story<OcAppTableComponent> = args => ({
    template: `
         <oc-app-table 
         [properties]="properties" 
         [noAppMessage]="noAppMessage"
         [activeColumns]="activeColumns"
         [modifyColumns]="{
           'you-custom-review-column': { headerCellTemplate: reviewHeaderCell, rowCellTemplate: reviewRowCell },
           'you-custom-description-column': { headerCellTemplate: descriptionHeaderCell, rowCellTemplate: descriptionRowCell },
           'create-date': {rowCellTemplate: createdDateRowCell }
         }">
         </oc-app-table>
         
         <ng-template #reviewHeaderCell>
             <span style="display: block; min-width: 100px;">Reviews</span>
         </ng-template>
         
         <ng-template #reviewRowCell let-ctx>
             <span>{{ctx.app.reviewCount}}</span>
         </ng-template>
         
         <ng-template #descriptionHeaderCell>
             <span>Description</span>
         </ng-template>
         
         <ng-template #descriptionRowCell let-ctx>
             <span style="max-height: 48px; display: block; overflow-y: hidden">{{ctx.app.customData.summary}}</span>
         </ng-template>
         
         <ng-template #createdDateRowCell let-ctx >
             <span style="max-height: 48px; display: block; overflow-y: hidden">{{ctx.app.created | date:'M:d:yyyy'}}</span>
         </ng-template>`,
    props: { ...args },
});

export const CustomAppTable = CustomAppTableTemplate.bind({});

CustomAppTable.args = {
    properties: propsConfig,
    noAppMessage: 'No Apps Has Been Added Yet',
    activeColumns: [
        'left-placeholder',
        'create-date',
        'name',
        'you-custom-review-column',
        'you-custom-description-column',
        'status',
        'app-options',
        'right-placeholder',
    ],
};

export const AppGridEmpty = ListGridComponent.bind({});

const propsConfigGridEmpty: AppListing = {
    layout: 'table',
    data: {
        pages: 50,
        pageNumber: 1,
        list: [],
        count: 50,
    },
    options: ['EDIT', 'PREVIEW', 'PUBLISH', 'SUSPEND', 'DELETE'],
};

AppGridEmpty.args = {
    properties: propsConfigGridEmpty,
    noAppMessage: 'No Apps Has Been Added Yet',
};
