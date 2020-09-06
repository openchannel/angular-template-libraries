import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcRecommendedAppsComponent} from './oc-recommended-apps.component';

describe('OcRecommendedAppsComponent', () => {
  let component: OcRecommendedAppsComponent;
  let fixture: ComponentFixture<OcRecommendedAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcRecommendedAppsComponent]
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
});
