import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDropdownFormComponent } from './oc-dropdown-form.component';

describe('OcDropdownFormComponent', () => {
    let component: OcDropdownFormComponent;
    let fixture: ComponentFixture<OcDropdownFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OcDropdownFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OcDropdownFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
