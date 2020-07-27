import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDialogComponent } from './oc-dialog.component';

describe('OcDialogComponent', () => {
  let component: OcDialogComponent;
  let fixture: ComponentFixture<OcDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
