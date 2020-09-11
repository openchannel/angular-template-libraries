import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDropboxComponent } from './oc-dropbox.component';

describe('OcDropboxComponent', () => {
  let component: OcDropboxComponent;
  let fixture: ComponentFixture<OcDropboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcDropboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDropboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
