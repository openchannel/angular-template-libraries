import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcAppCardComponent} from './oc-app-card.component';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { PricePipe } from '../../common-components/pipe/price.pipe';
import {FullAppData, StatElement} from 'oc-ng-common-component/src/lib/common-components';
import {MockRatingComponent, MockRoutingComponent} from 'oc-ng-common-component/src/mock/mock';
import {HtmlTagsReplacerPipe} from 'oc-ng-common-component/src/lib/common-components';

describe('OcAppCardComponent', () => {
  let component: OcAppCardComponent;
  let fixture: ComponentFixture<OcAppCardComponent>;
  let location: Location;
  let appData: FullAppData;

  const statElement: StatElement = {
    '90day': 20,
    '30day': 10,
    total: 20
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        OcAppCardComponent,
        MockRatingComponent,
        MockRoutingComponent,
        PricePipe,
        HtmlTagsReplacerPipe
      ]
    }).compileComponents();
    location = TestBed.inject(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppCardComponent);
    component = fixture.componentInstance;
    appData = {
      appId: '34343jfgi3423',
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
        views: statElement,
        downloads: statElement,
        developerSales: statElement,
        totalSales: statElement,
        ownerships: statElement,
        reviews: statElement
      },
      isLive: true
    };
    component.app = appData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show data', () => {
    const priceInfo: HTMLSpanElement = fixture.debugElement.query(By.css('.oc-card__content-price')).nativeElement;
    const summaryInfo: HTMLParagraphElement = fixture.debugElement
      .query(By.css('.oc-card__content-summary')).nativeElement;

    expect(priceInfo.textContent).toContain('€0.05/mon');
    expect(summaryInfo.textContent).toContain('Some test summary');
  });

  it('should redirect on router link', async () => {
    spyOn(component.clickByAppCard, 'emit');

    const dropbox = fixture.debugElement.query(By.css('.oc-card__content-name')).nativeElement;
    dropbox.click();
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(component.clickByAppCard.emit).toHaveBeenCalledWith(appData);
    });
  });
});
