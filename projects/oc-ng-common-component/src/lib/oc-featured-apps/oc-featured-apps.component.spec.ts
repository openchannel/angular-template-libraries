import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcFeaturedAppsComponent } from './oc-featured-apps.component';

describe('OcFeaturedAppsComponent', () => {
  let component: OcFeaturedAppsComponent;
  let fixture: ComponentFixture<OcFeaturedAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcFeaturedAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcFeaturedAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
