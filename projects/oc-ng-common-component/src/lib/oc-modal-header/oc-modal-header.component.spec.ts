import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcModalHeaderComponent} from './oc-modal-header.component';

describe('OcModalHeaderComponent', () => {
  let component: OcModalHeaderComponent;
  let fixture: ComponentFixture<OcModalHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcModalHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcModalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
