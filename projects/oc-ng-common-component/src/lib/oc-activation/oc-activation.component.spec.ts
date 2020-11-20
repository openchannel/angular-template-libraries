import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcActivationComponent} from './oc-activation.component';
import {FormsModule} from '@angular/forms';

describe('OcActivationComponent', () => {
  let component: OcActivationComponent;
  let fixture: ComponentFixture<OcActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcActivationComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
