import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcSidebarComponent } from './oc-sidebar.component';
import {Component, Input} from "@angular/core";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'svg-icon',
  template: '',
})
export class MockSvgIconComponent {
  @Input() src: string = '';
}

describe('OcSidebarComponent', () => {
  let component: OcSidebarComponent;
  let fixture: ComponentFixture<OcSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OcSidebarComponent, MockSvgIconComponent ],
      imports: [ NgbCollapseModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
