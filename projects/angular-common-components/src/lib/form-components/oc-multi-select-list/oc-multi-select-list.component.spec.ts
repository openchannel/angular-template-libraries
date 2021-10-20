import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcMultiSelectListComponent } from './oc-multi-select-list.component';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
    template: '',
    selector: 'oc-tag-element',
})
export class TagElementMockComponent {
    @Input() title: string;
    @Input() closeMarker: boolean = false;

    @Output() readonly clickEmitter = new EventEmitter<string>();
}

@Component({
    template: '',
    selector: 'oc-dropbox',
})
export class DropboxMockComponent {
    @Input() placeHolder: string;
    @Input() items: string[];
    @Input() clearFormAfterSelect: boolean = false;
    @Input() dropElementTemplate: TemplateRef<any>;
}

describe('OcMultiSelectListComponent', () => {
    let component: OcMultiSelectListComponent;
    let fixture: ComponentFixture<OcMultiSelectListComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcMultiSelectListComponent, TagElementMockComponent, DropboxMockComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcMultiSelectListComponent);
        component = fixture.componentInstance;
        component.availableItemsList = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7'];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain items', () => {
        expect(component.availableItems.length).toBeGreaterThan(0);
    });

    it('should set result items', () => {
        component.value = ['item2', 'item1'];
        component.label = 'Test Multiselect';
        fixture.detectChanges();

        expect(component.resultItems[0]).toEqual('item2');
        expect(component.resultItems[1]).toEqual('item1');
        expect(component.resultItems.length).toEqual(2);
    });

    it('should remove result items', () => {
        component.value = ['item2', 'item1'];
        fixture.detectChanges();

        component.removeItem(1);

        expect(component.resultItems[0]).toEqual('item2');
        expect(component.resultItems[1]).toBeUndefined();
        expect(component.resultItems.length).toEqual(1);
    });

    it('should call onChange with value', async () => {
        const onChangeFunc = jest.fn();
        component.registerOnChange(onChangeFunc);

        component.addTagToResultList('item4');

        expect(onChangeFunc).toHaveBeenCalled();
        expect(onChangeFunc.mock.calls[0][0]).toEqual(['item4']);
    });
});
