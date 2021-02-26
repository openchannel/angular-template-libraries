import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcConfirmationModalComponent } from './oc-confirmation-modal.component';

describe('OcConfirmationModalComponent', () => {
  let component: OcConfirmationModalComponent;
  let fixture: ComponentFixture<OcConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcConfirmationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
