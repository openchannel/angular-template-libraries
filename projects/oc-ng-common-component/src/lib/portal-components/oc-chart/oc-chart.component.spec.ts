import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OcChartComponent} from './oc-chart.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropdownModel} from 'oc-ng-common-component/src/lib/common-components';

@Component({
  selector: 'oc-dropdown-button',
  template: ''
})
export class MockDropdownButtonComponent {
  @Output() selectedChange: EventEmitter<DropdownModel<any>> = new EventEmitter<DropdownModel<any>>();

  @Input() minDropdownWidth: string = 'Sort by';

  @Input() options: DropdownModel<any>[];
}

@Component({
  selector: 'svg-icon',
  template: ''
})
export class MockSvgIconComponent {
  @Input() src: string;
  @Input() svgClass: string;
}

describe('OcChartComponent', () => {
  let component: OcChartComponent;
  let fixture: ComponentFixture<OcChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcChartComponent, MockDropdownButtonComponent, MockSvgIconComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
