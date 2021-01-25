import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcMainModalComponent } from './oc-main-modal.component';

describe('OcMainModalComponent', () => {
  let component: OcMainModalComponent;
  let fixture: ComponentFixture<OcMainModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcMainModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcMainModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
