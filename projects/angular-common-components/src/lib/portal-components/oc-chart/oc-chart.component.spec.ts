import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OcChartComponent } from './oc-chart.component';
import { MockDropdownButtonComponent, MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';

// Needed for chart.js constructor
declare global {
    interface Window {
        ResizeObserver: any;
    }
}

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));
describe('OcChartComponent', () => {
    let component: OcChartComponent;
    let fixture: ComponentFixture<OcChartComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OcChartComponent, MockDropdownButtonComponent, MockSvgIconComponent],
        }).compileComponents();
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
