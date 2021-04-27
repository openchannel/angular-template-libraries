import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {OcAppListGridComponent} from './oc-app-list-grid.component';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import {FullAppData, StatElement} from 'oc-ng-common-component/src/lib/common-components/interfaces/app-data.model';
import {PricePipe} from 'oc-ng-common-component/src/lib/common-components';
import {MockRatingComponent, MockSvgIconComponent} from 'oc-ng-common-component/src/mock/mock';

const stat: StatElement = {
  '90day': 20,
  '30day': 10,
  total: 30
};

const app: FullAppData = {
  appId: '344gf-42s3j-gi3423',
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
    value: 'inDevelopment',
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

describe('OcAppListGridComponent', () => {
  let component: OcAppListGridComponent;
  let fixture: ComponentFixture<OcAppListGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OcAppListGridComponent, MockRatingComponent, PricePipe, MockSvgIconComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppListGridComponent);
    component = fixture.componentInstance;

    component.appList = [{
      appId: '344gf-43s3j-gi3423',
      icon: 'assets/oc-ng-common-component/get-started.svg',
      name: 'Plugin',
      model: [{
        type: 'free',
        price: 0,
        trial: 1,
        license: 'single',
        modelId: '23235hfg4',
        currency: 'EUR',
        billingPeriod: 'monthly'
      }],
      rating: 3.5,
      reviewCount: 12,
      summary: 'With this plugin you can communicate with your teammates any time',
      description: 'With this plugin you can communicate with your teammates any time',
      lastUpdated: new Date(),
      version: 1.1,
      safeName: ['test-app'],
      developerId: '44555-3232gvdfdf',
      submittedDate: new Date(),
      created: new Date().getMonth() - 2,
      status: {
        value: 'approved',
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
    }];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no data message', () => {
    component.noAppMessage = 'No app found';
    component.appList = [];

    fixture.detectChanges();

    const emptyDataMessage: HTMLHeadingElement = fixture.debugElement.query(By.css('h5')).nativeElement;

    expect(emptyDataMessage.textContent).toContain('No app found');
  });

  it('should show App data', async () => {

    const appTitle: HTMLParagraphElement = fixture.debugElement.query(By.css('p')).nativeElement;
    const appPrice: HTMLSpanElement = fixture.debugElement.query(By.css('span')).nativeElement;
    const appIcon: HTMLImageElement = fixture.nativeElement.querySelector('#appImage');


    await fixture.whenStable().then(() => {
      expect(appTitle.textContent).toContain('Plugin');
      expect(appPrice.textContent).toContain('Free');
      expect(appIcon.src).toContain('assets/oc-ng-common-component/get-started.svg');
    });
  });

  it('should emit an app', () => {
    const appCard: HTMLDivElement = fixture.debugElement.query(By.css('#appCard')).nativeElement;

    spyOn(component.gotoDetails, 'emit');

    appCard.click();
    fixture.detectChanges();

    expect(component.gotoDetails.emit).toHaveBeenCalledWith(component.appList[0]);
  });

  it('should show Free price on empty model', () => {
    app.model = [];
    component.appList = [app];

    fixture.detectChanges();

    const priceField: HTMLSpanElement = fixture.debugElement.query(By.css('.app-list__card-price')).nativeElement;

    expect(priceField.textContent).toContain('Free');
  });

  it('should check rating data', () => {
    app.rating = 500;
    component.appList = [app];

    fixture.detectChanges();

    const ratingComponent = fixture.debugElement.query(By.css('oc-rating'));

    expect(ratingComponent).toBeTruthy();
  });
});
