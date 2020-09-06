import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcFileUploadComponent} from './oc-file-upload.component';

describe('OcFileUploadComponent', () => {
  let component: OcFileUploadComponent;
  let fixture: ComponentFixture<OcFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcFileUploadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
