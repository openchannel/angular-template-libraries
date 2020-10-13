import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcCheckboxComponent} from './oc-checkbox.component';
import {FormsModule} from '@angular/forms';

describe('OcCheckboxComponent', () => {
  let component: OcCheckboxComponent;
  let fixture: ComponentFixture<OcCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcCheckboxComponent],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
