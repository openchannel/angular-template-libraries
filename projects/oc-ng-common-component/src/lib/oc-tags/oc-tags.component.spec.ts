import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcTagsComponent } from './oc-tags.component';

describe('OcTagsComponent', () => {
  let component: OcTagsComponent;
  let fixture: ComponentFixture<OcTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
