import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcAppCardComponent} from './oc-app-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PricePipe } from '../../common-components/pipe/price.pipe';
import {StatElement} from 'oc-ng-common-component/src/lib/common-components/interfaces/app-data.model';

@Component({
  selector: 'oc-rating',
  template: ''
})
export class OcRatingMockComponent {
  @Input() type;
  @Input() rating = 0;
  @Input() reviewCount = 0;
  @Input() label = '';
  @Input() labelClass = 'font-m font-med';
}

@Component({
  template: ''
})
export class MockRoutingComponent {
}

describe('OcAppCardComponent', () => {
  let component: OcAppCardComponent;
  let fixture: ComponentFixture<OcAppCardComponent>;
  let location: Location;
  let router: Router;

  const statElement: StatElement = {
    '90day': 20,
    '30day': 10,
    total: 20
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OcAppCardComponent,
        OcRatingMockComponent,
        MockRoutingComponent,
        PricePipe
      ],
      imports: [RouterTestingModule.withRoutes([
        {path: 'mock-router/:id', component: MockRoutingComponent}
      ])]
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppCardComponent);
    component = fixture.componentInstance;
    component.app = {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show data', () => {
    const priceInfo: HTMLSpanElement = fixture.debugElement.query(By.css('.app-price')).nativeElement;
    const summaryInfo: HTMLParagraphElement = fixture.debugElement
      .query(By.css('.text-summary-hidden')).nativeElement;

    expect(priceInfo.textContent).toContain('€5/mo');
    expect(summaryInfo.textContent).toContain('Some test summary');
  });

  it('should redirect on router link', async () => {
    // component.appRouterLink = 'mock-router';
    fixture.detectChanges();

    const cardLink: HTMLLinkElement = fixture.debugElement.query(By.css('a')).nativeElement;
    cardLink.click();

    await fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/mock-router/34343jfgi3423');
    });
  });
});
