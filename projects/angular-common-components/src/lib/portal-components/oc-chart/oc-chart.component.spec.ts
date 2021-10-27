import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { OcChartComponent } from './oc-chart.component';
import { MockDropdownButtonComponent, MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { By } from '@angular/platform-browser';
import { ChartLayoutTypeModel } from '@openchannel/angular-common-components/src/lib/portal-components';
import { SimpleChange, SimpleChanges } from '@angular/core';

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

const month = {
    labelsY: ['3', '10', '30', '50', '25', '40', '100', '70', '150', '200', '50', '85', '50'],
    labelsX: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    tabularLabels: [
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
        'January',
        'February',
        'March',
    ],
};

const periods = [
    {
        id: 'month',
        label: 'Monthly',
        tabularLabel: 'Month',
    },
    {
        id: 'day',
        label: 'Daily',
        active: true,
        tabularLabel: 'Day',
    },
];

const fields = [
    {
        id: 'downloads',
        label: 'Downloads',
        active: true,
    },
    {
        id: 'reviews',
        label: 'Reviews',
    },
    {
        id: 'leads',
        label: 'Leads',
    },
    {
        id: 'views',
        label: 'Views',
    },
];

const selectedApp = {
    id: 'all-app',
    label: 'All apps',
    active: true,
};

const apps = {
    activeItem: selectedApp,
    items: [
        selectedApp,
        {
            id: 'app-1',
            label: 'API Connections',
        },
        {
            id: 'app-2',
            label: 'Lead Accounting',
        },
        {
            id: 'app-3',
            label: 'Full CRM',
        },
        {
            id: 'app-4',
            label: 'Intersect AI Prediction',
        },
        {
            id: 'app-5',
            label: 'Fuel CRM Lite',
        },
        {
            id: 'app-6',
            label: 'Long app name 12345678901234567890123456789012345678901234567890',
        },
    ],
};

const tabularType = 'tabular';
const graphType = 'graph';

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
        component.chartData = {
            data: month,
            layout: ChartLayoutTypeModel.standard,
            periods,
            fields,
            apps,
        };
        component.getGradientFill = jest.fn(() => null);
        fixture.detectChanges();
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

        expect(+countElement.textContent).toBe(testCount);
        expect(countTextElement.textContent).toBe(testCountText);
    });

    it('should not render data container total, if count < 0', () => {
        component.count = -1;
        fixture.detectChanges();

        const dataContainerTotal = fixture.debugElement.query(By.css('.chart__data-container-total'));

        expect(dataContainerTotal).toBeNull();
    });

    it('should switch periods by corresponding button click', () => {
        const updateChartPeriodFunction = jest.spyOn(component, 'updateChartPeriod');

        const periodLabels = fixture.debugElement.queryAll(By.css('.chart__period-item-label'));
        const disabledPeriod = periodLabels.find(periodLabel => periodLabel.query(By.css('.chart__period-item-radio:not(:checked)')));

        disabledPeriod.triggerEventHandler('click', periods[0]);

        expect(updateChartPeriodFunction).toHaveBeenCalledWith(periods[0]);
        expect(component.chartData.periods[0].active).toBeTruthy();
        expect(component.chartData.periods[1].active).toBeFalsy();
    });

    it('should switch data type (tabular, graph) by corresponding buttons click', () => {
        const swapActiveDataTypeFunction = jest.spyOn(component, 'swapActiveDataType');

        const tabularButton = fixture.debugElement.query(By.css('.chart__tabular-button'));
        const graphButton = fixture.debugElement.query(By.css('.chart__graph-button'));

        tabularButton.triggerEventHandler('click', {});

        expect(swapActiveDataTypeFunction).toHaveBeenCalledWith(tabularType);
        expect(component.activeDataType).toBe(tabularType);

        graphButton.triggerEventHandler('click', {});

        expect(swapActiveDataTypeFunction).toHaveBeenCalledWith(graphType);
        expect(component.activeDataType).toBe(graphType);
    });

    it('should render correct data container depending on data type', () => {
        component.activeDataType = graphType;
        fixture.detectChanges();

        const canvasContainer = fixture.debugElement.query(By.css('.chart__data-container-canvas'));
        expect(canvasContainer).toBeTruthy();

        component.activeDataType = tabularType;
        fixture.detectChanges();

        const tableContainer = fixture.debugElement.query(By.css('.chart__data-container-tabular'));
        expect(tableContainer).toBeTruthy();
    });

    it('should reload chart, when active data type changed to graph', fakeAsync(() => {
        const reloadChartFunction = jest.spyOn(component, 'reloadChart');

        component.swapActiveDataType(graphType);
        tick();

        expect(reloadChartFunction).toHaveBeenCalled();
    }));

    it('should recreate chart, when chart data changed', () => {
        const reloadChartFunction = jest.spyOn(component, 'reloadChart');
        const setChartFunction = jest.spyOn(component, 'setChart');
        const chart = component.getChart();

        const changesObj: SimpleChanges = {
            chartData: new SimpleChange(component.chartData, { ...component.chartData }, false),
        };

        // tslint:disable-next-line:no-lifecycle-call
        component.ngOnChanges(changesObj);

        expect(reloadChartFunction).toHaveBeenCalled();
        expect(setChartFunction).toHaveBeenCalled();
        expect(chart).not.toBe(component.getChart());
    });

    it('should update chart data, when active app changed with default app template', () => {
        const changeChartOptionsEmitFunction = jest.spyOn(component.changeChartOptions, 'emit');

        component.appDropdownTemplate = null;
        fixture.detectChanges();

        const chartApps = fixture.debugElement.query(By.css('.chart__type-apps')).componentInstance;
        chartApps.selectedChange.emit(apps.items[1]);

        expect(component.chartData.apps.activeItem).toBe(apps.items[1]);
        expect(changeChartOptionsEmitFunction).toHaveBeenCalledWith({
            field: component.chartData?.fields?.find(item => item?.active),
            period: component.chartData?.periods?.find(item => item?.active),
            selectedApp: component.chartData?.apps?.activeItem,
        });
    });

    it('should sort tabular data by corresponding button click', () => {
        component.activeDataType = tabularType;
        fixture.detectChanges();

        const changesObj: SimpleChanges = {
            chartData: new SimpleChange(component.chartData, { ...component.chartData }, false),
        };

        // tslint:disable-next-line:no-lifecycle-call
        component.ngOnChanges(changesObj);

        const chartTableHeadings = fixture.debugElement.queryAll(By.css('.chart__table-view-heading'));
        chartTableHeadings.forEach(chartTableHeading => {
            chartTableHeading.triggerEventHandler('click', {});
            fixture.detectChanges();

            const by = component.activeTabularSort.by;
            const ascending = component.activeTabularSort.ascending;
            let correctSorted = true;

            for (let i = 1; i < component.tabularData.length; i++) {
                if (ascending) {
                    if (component.tabularData[i][by] < component.tabularData[i - 1][by]) {
                        correctSorted = false;
                    }
                } else {
                    if (component.tabularData[i][by] > component.tabularData[i - 1][by]) {
                        correctSorted = false;
                    }
                }
            }

            expect(correctSorted).toBeTruthy();
        });
    });

    it('should emit change chart data, set new active type and parameter, when chart options updated', () => {
        const changeChartOptionsEmitFunction = jest.spyOn(component.changeChartOptions, 'emit');

        const disabledDropdownType = component.dropdownTypes.find(type => !type.active);

        const chartTypesDropdown = fixture.debugElement.query(By.css('.chart__type-types')).componentInstance;
        chartTypesDropdown.selectedChange.emit(component.chartData.fields, disabledDropdownType.id);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const newActiveField = component.chartData.fields.find(field => field.active);
            const enabledDropdownType = { ...disabledDropdownType, active: true };

            expect(changeChartOptionsEmitFunction).toHaveBeenCalled();
            expect(enabledDropdownType).toBe(newActiveField);
            expect(enabledDropdownType).toEqual(component.dropdownSelectedType);
        });
    });

    it('should fill tabular data in ngOnChanges hook', () => {
        const changesObj: SimpleChanges = {
            chartData: new SimpleChange(component.chartData, { ...component.chartData }, false),
        };

        // tslint:disable-next-line:no-lifecycle-call
        component.ngOnChanges(changesObj);

        expect(component.tabularData.length).not.toBe(0);
    });
});
