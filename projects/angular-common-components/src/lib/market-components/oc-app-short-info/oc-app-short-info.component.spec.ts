import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OcAppShortInfoComponent } from '@openchannel/angular-common-components/src/lib/market-components';
import { MockRatingComponent } from '@openchannel/angular-common-components/src/mock/mock';
import {
    FullAppData,
    HtmlTagsReplacerPipe,
    PricePipe,
    StatElement,
} from '@openchannel/angular-common-components/src/lib/common-components';

const stat: StatElement = {
    '90day': 20,
    '30day': 10,
    total: 30,
};

const app: FullAppData = {
    appId: '123',
    summary: 'summary summary',
    created: undefined,
    developerId: '321',
    isLive: false,
    lastUpdated: undefined,
    model: [
        {
            type: 'recurring',
            price: 5,
            trial: 1,
            license: 'single',
            modelId: '23235hfg4',
            currency: 'EUR',
            billingPeriod: 'monthly',
        },
    ],
    name: 'Test Test',
    reviewCount: 0,
    safeName: [],
    statistics: {
        views: stat,
        downloads: stat,
        developerSales: stat,
        totalSales: stat,
        ownerships: stat,
        reviews: stat,
    },
    status: {
        value: 'inDevelopment',
        lastUpdated: 1.1,
        modifiedBy: '',
        reason: '',
    },
    submittedDate: new Date(),
    version: 0,
    rating: 50,
};

describe('OcAppShortInfoComponent', () => {
    let component: OcAppShortInfoComponent;
    let fixture: ComponentFixture<OcAppShortInfoComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcAppShortInfoComponent, MockRatingComponent, HtmlTagsReplacerPipe, PricePipe],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcAppShortInfoComponent);
        component = fixture.componentInstance;

        component.app = app;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
