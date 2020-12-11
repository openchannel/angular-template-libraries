import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcTitleComponent } from './oc-title.component';

describe('OcTitleComponent', () => {
  let component: OcTitleComponent;
  let fixture: ComponentFixture<OcTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
