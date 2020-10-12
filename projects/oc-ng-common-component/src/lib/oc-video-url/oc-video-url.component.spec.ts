import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcVideoUrlComponent } from './oc-video-url.component';

describe('OcVideoUrlComponent', () => {
  let component: OcVideoUrlComponent;
  let fixture: ComponentFixture<OcVideoUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcVideoUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcVideoUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
