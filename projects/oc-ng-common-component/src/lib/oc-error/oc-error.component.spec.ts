import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcErrorComponent} from './oc-error.component';

describe('OcErrorComponent', () => {
  let component: OcErrorComponent;
  let fixture: ComponentFixture<OcErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcErrorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
