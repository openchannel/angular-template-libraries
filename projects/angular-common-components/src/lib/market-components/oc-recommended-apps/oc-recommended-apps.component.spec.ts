import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OcRecommendedAppsComponent } from './oc-recommended-apps.component';
import { By } from '@angular/platform-browser';
import { FullAppData, StatElement } from '@openchannel/angular-common-components/src/lib/common-components';
import { MockAppCardComponent, MockHeadingTagDirective } from '@openchannel/angular-common-components/src/mock/mock';
import { RouterTestingModule } from '@angular/router/testing';

const stat: StatElement = {
    '90day': 30,
    '30day': 10,
    total: 40,
};

const app: FullAppData = {
    appId: '344gf-43s3j-gi3423',
    icon: '',
    name: 'Test App',
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
    rating: 4.2,
    reviewCount: 20,
    summary: 'Some test summary',
    description: 'Some Description',
    lastUpdated: new Date(),
    version: 1.1,
    safeName: ['test-app'],
    developerId: '44555-3232gvdfdf',
    submittedDate: new Date(),
    created: new Date().getMonth() - 2,
    status: {
        value: 'pending',
        lastUpdated: 1.1,
        modifiedBy: '',
        reason: '',
    },
    statistics: {
        views: stat,
        downloads: stat,
        developerSales: stat,
        totalSales: stat,
        ownerships: stat,
        reviews: stat,
    },
    isLive: true,
};

describe('OcRecommendedAppsComponent', () => {
    let component: OcRecommendedAppsComponent;
    let fixture: ComponentFixture<OcRecommendedAppsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcRecommendedAppsComponent, MockAppCardComponent, MockHeadingTagDirective],
                imports: [RouterTestingModule.withRoutes([])],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcRecommendedAppsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show data', () => {
        component.appList = [app, app, app];
        component.recommendedAppTitle = 'Test Recommended';

        fixture.detectChanges();

        const title: HTMLHeadingElement = fixture.debugElement.query(By.css('h2')).nativeElement;

        expect(title.textContent).toContain('Test Recommended');
    });

    it('should show no data message', () => {
        component.noAppMessage = 'There is no apps yet';

        fixture.detectChanges();

        const emptyMessage: HTMLHeadingElement = fixture.debugElement.query(By.css('h5')).nativeElement;

        expect(emptyMessage.textContent).toContain('There is no apps yet');
    });
});
