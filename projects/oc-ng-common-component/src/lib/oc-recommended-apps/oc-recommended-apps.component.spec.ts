import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcRecommendedAppsComponent} from './oc-recommended-apps.component';
import {Component, Input} from '@angular/core';
import {FullAppData} from 'oc-ng-common-service';
import {StatElement} from 'oc-ng-common-service/lib/model/app-data-model';
import {By} from '@angular/platform-browser';

@Component({
  selector: 'oc-app-card',
  template: ''
})
export  class AppCardMockComponent {
  @Input() app: FullAppData;
  @Input() appRouterLink: any | string;
}

const stat: StatElement = {
  '90day': 30,
  '30day': 10,
  total: 40
};

const app: FullAppData = {
  appId: '344gf-43s3j-gi3423',
  icon: '',
  name: 'Test App',
  model: [{
    type: 'recurring',
    price: 5,
    trial: 1,
    license: 'single',
    modelId: '23235hfg4',
    currency: 'EUR',
    billingPeriod: 'monthly'
  }],
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
    reason: ''
  },
  statistics: {
    views: stat,
    downloads: stat,
    developerSales: stat,
    totalSales: stat,
    ownerships: stat,
    reviews: stat
  },
  isLive: true
};

describe('OcRecommendedAppsComponent', () => {
  let component: OcRecommendedAppsComponent;
  let fixture: ComponentFixture<OcRecommendedAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcRecommendedAppsComponent, AppCardMockComponent],
    })
      .compileComponents();
  }));

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
    component.appsMainLink = 'link';
    component.recommendedAppTitle = 'Test Recommended';

    fixture.detectChanges();

    const title: HTMLHeadingElement = fixture.debugElement.query(By.css('h1')).nativeElement;

    expect(title.textContent).toContain('Test Recommended');
  });

  it('should show no data message', () => {
    component.noAppMessage = 'There is no apps yet';

    fixture.detectChanges();

    const emptyMessage: HTMLHeadingElement = fixture.debugElement.query(By.css('h5')).nativeElement;

    expect(emptyMessage.textContent).toContain('There is no apps yet');
  });
});
