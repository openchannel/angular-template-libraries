import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcTitleComponent } from './oc-title.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('OcTitleComponent', () => {
  let component: OcTitleComponent;
  let fixture: ComponentFixture<OcTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcTitleComponent ],
      imports: [NgbModule]
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
