import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcAppGalleryComponent} from './oc-app-gallery.component';
import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {FullAppData, StatElement} from 'oc-ng-common-component/src/lib/common-components/interfaces/app-data.model';

@Component({
  selector: 'oc-app-card',
  template: '',
})
export class AppCardMockComponent {
  @Input() app: FullAppData;
  @Input() appRouterLink: any | string;
}

@Component({
  template: ''
})
export class MockRoutingComponent {
}

describe('OcAppGalleryComponent', () => {
  let component: OcAppGalleryComponent;
  let fixture: ComponentFixture<OcAppGalleryComponent>;
  let location: Location;
  let router: Router;

  const statElement: StatElement = {
    '90day': 20,
    '30day': 10,
    total: 20
  };
  const app: FullAppData = {
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcAppGalleryComponent, AppCardMockComponent, MockRoutingComponent],
      imports: [CommonModule, RouterTestingModule.withRoutes([
        {path: 'mock-router', component: MockRoutingComponent}
      ])]
    })
      .compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppGalleryComponent);
    component = fixture.componentInstance;
    component.appsArr = [app, app, app];
    component.appGalleryTitle = 'Test Apps';
    component.appGalleryDescription = 'The list of test apps';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show data', () => {

    const galleryTitle = fixture.debugElement.query(By.css('h4')).nativeElement;
    const galleryDescription = fixture.debugElement.query(By.css('#description')).nativeElement;

    expect(galleryTitle.textContent).toContain('Test Apps');
    expect(galleryDescription.textContent).toContain('The list of test apps');
  });

  it('should show no app message', () => {
    component.appsArr = [];
    component.noAppMessage = 'No Apps Added Yet';
    fixture.detectChanges();

    const noAppsMessage = fixture.debugElement.query(By.css('h5')).nativeElement;

    expect(noAppsMessage.textContent).toContain('No Apps Added Yet');
  });
});
