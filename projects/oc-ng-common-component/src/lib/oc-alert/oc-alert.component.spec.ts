import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcAlertComponent} from './oc-alert.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppIconsModule} from '../app-icon-module/app-icons.module';

describe('OcAlertComponent', () => {
  let component: OcAlertComponent;
  let fixture: ComponentFixture<OcAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcAlertComponent ],
      imports: [NgbModule, AppIconsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
