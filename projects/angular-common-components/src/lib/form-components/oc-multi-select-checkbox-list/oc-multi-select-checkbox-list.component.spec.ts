import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcMultiSelectCheckboxListComponent } from './oc-multi-select-checkbox-list.component';
import { MockCheckboxComponent } from '../../../mock/mock';
import { By } from '@angular/platform-browser';

describe('OcMultiSelectCheckboxListComponent', () => {
    let component: OcMultiSelectCheckboxListComponent;
    let fixture: ComponentFixture<OcMultiSelectCheckboxListComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcMultiSelectCheckboxListComponent,
                    MockCheckboxComponent
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcMultiSelectCheckboxListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('show all items', () => {
        component.setItemsArray = ['A', 'B'];
        fixture.detectChanges();
        expect(findItemById('A')).toBeDefined();
        expect(findItemById('B')).toBeDefined();
    });

    it('init default values', () => {
        component.setItemsArray = ['A', 'B', 'C'];
        component.setDefaultItemsArray = ['B'];
        spyOn(component.selectedItemsOutput, 'emit');
        fixture.detectChanges();
        expect(component.selectedItemsOutput.emit).toHaveBeenCalledWith(['B']);
    });

    it('select an item', () => {
        component.setItemsArray = ['A', 'B', 'C'];
        spyOn(component.selectedItemsOutput, 'emit');

        fixture.detectChanges();
        expect(component.selectedItemsOutput.emit).toHaveBeenCalledWith([]);

        findItemById('B-text').click();
        fixture.detectChanges();
        expect(component.selectedItemsOutput.emit).toHaveBeenCalledWith(['B']);
    });

    function findItemById(itemId: string): any {
        return fixture.debugElement.query(By.css(`#multi-checkbox-item-${itemId}`))?.nativeElement;
    }
});
