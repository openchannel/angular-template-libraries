import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { OcTitleComponent } from './oc-title.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularSvgIconModule} from "angular-svg-icon";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('OcTitleComponent', () => {
  let component: OcTitleComponent;
  let fixture: ComponentFixture<OcTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OcTitleComponent ],
      imports: [ NgbModule, AngularSvgIconModule.forRoot(), HttpClientTestingModule ]
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
