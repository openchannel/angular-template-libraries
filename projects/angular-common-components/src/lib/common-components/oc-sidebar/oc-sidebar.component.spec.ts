import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcSidebarComponent } from './oc-sidebar.component';
import { Component, Input, SimpleChanges } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { MockButtonComponent, MockHeadingTagDirective } from '@openchannel/angular-common-components/src/mock/mock';
import { SidebarValue } from '../model/components-basic.model';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'svg-icon',
    template: '',
})
export class MockSvgIconComponent {
    @Input() src: string = '';
}
const filters: SidebarValue[] = [
    {
        id: 'cat1',
        label: 'Category 1',
        sort: '',
        query: '',
        description: '',
        checked: false,
        values: [],
    },
    {
        id: 'cat2',
        label: 'Category 2',
        checked: false,
        values: [],
        sort: '',
        query: '',
        description: '',
    },
    {
        id: 'cat3',
        label: 'Category 3',
        checked: false,
        expanded: false,
        sort: '',
        query: '',
        description: '',
        values: [
            {
                id: 'sub1',
                label: 'Subcategory 1',
                checked: false,
                sort: '',
                query: '',
                description: '',
                values: [],
            },
            {
                id: 'sub2',
                label: 'Subcategory 2',
                checked: false,
                sort: '',
                query: '',
                description: '',
                values: [],
            },
        ],
    },
    {
        id: 'cat4',
        label: 'Category 4',
        checked: true,
        sort: '',
        query: '',
        description: '',
        values: [],
    },
    {
        id: 'cat5',
        label: 'Category 5',
        checked: false,
        sort: '',
        query: '',
        description: '',
        values: [],
    },
];

describe('OcSidebarComponent', () => {
    let component: OcSidebarComponent;
    let fixture: ComponentFixture<OcSidebarComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcSidebarComponent, MockSvgIconComponent, MockHeadingTagDirective, MockButtonComponent],
                imports: [NgbCollapseModule, RouterTestingModule.withRoutes([])],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcSidebarComponent);
        component = fixture.componentInstance;
        component.sidebarModel = filters;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should collapse sublist', () => {
        const expandableList = fixture.debugElement.queryAll(By.css('.oc-sidebar__list-item-wrapper'))[2].nativeElement;
        expandableList.click();
        fixture.detectChanges();

        const sublist = fixture.debugElement.query(By.css('.oc-sidebar__sublist'));
        expect(sublist).toBeTruthy();
    });

    it('should change button type', () => {
        component.threshold = 2;
        const changes: SimpleChanges = {
            threshold: {
                previousValue: 10,
                currentValue: 2,
                firstChange: true,
                isFirstChange(): boolean {
                    return false;
                },
            },
        };
        component.toggleListButtonType = 'primary';
        // tslint:disable-next-line:no-lifecycle-call
        component.ngOnChanges(changes);
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('.oc-sidebar__toggle-button'));
        expect(component.toggleListButtonType).toEqual('primary');
        expect(button).toBeTruthy();
    });
});
