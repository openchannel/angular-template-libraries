import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcSellerAgreementComponent} from './oc-seller-agreement.component';

describe('OcSellerAgreementComponent', () => {
  let component: OcSellerAgreementComponent;
  let fixture: ComponentFixture<OcSellerAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcSellerAgreementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcSellerAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
