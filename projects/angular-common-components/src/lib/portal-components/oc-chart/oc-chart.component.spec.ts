import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OcChartComponent } from './oc-chart.component';
import { MockDropdownButtonComponent, MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { By } from '@angular/platform-browser';

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
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set correct count and count text', () => {
        const testCount = 10000;
        const testCountText = 'Views count';

        component.count = testCount;
        component.countText = testCountText;
        fixture.detectChanges();

        const countElement = fixture.debugElement.query(By.css('.chart__data-container-total-count')).nativeElement;
        const countTextElement = fixture.debugElement.query(By.css('.chart__data-container-total-text')).nativeElement;

        expect(countElement.textContent).toBe(testCount);
        expect(countTextElement.textContent).toBe(testCountText);
    });

    it('should not render data container total, if count <= 0', () => {
        component.count = 0;
        fixture.detectChanges();

        const dataContainerTotal = fixture.debugElement.query(By.css('.chart__data-container-total'));

        expect(dataContainerTotal).toBeNull();
    });
});
