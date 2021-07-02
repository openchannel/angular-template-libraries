import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcInitialsComponent } from './oc-initials.component';

describe('OcInitialsComponent', () => {
  let component: OcInitialsComponent;
  let fixture: ComponentFixture<OcInitialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcInitialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcInitialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
