import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcVideoComponent } from './oc-video.component';

describe('OcVideoComponent', () => {
  let component: OcVideoComponent;
  let fixture: ComponentFixture<OcVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
