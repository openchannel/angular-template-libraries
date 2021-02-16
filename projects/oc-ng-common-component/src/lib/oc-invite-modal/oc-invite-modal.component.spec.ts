import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcInviteModalComponent } from './oc-invite-modal.component';

describe('OcInviteModalComponent', () => {
  let component: OcInviteModalComponent;
  let fixture: ComponentFixture<OcInviteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcInviteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcInviteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
