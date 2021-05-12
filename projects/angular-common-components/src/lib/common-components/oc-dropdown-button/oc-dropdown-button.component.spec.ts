import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDropdownButtonComponent } from './oc-dropdown-button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('OcDropdownButtonComponent', () => {
  let component: OcDropdownButtonComponent;
  let fixture: ComponentFixture<OcDropdownButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcDropdownButtonComponent ],
      imports: [NgbModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDropdownButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
