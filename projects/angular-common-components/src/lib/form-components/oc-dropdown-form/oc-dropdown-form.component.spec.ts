import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OcDropdownFormComponent } from './oc-dropdown-form.component';
import { MockFormComponent } from '@openchannel/angular-common-components/src/mock/mock';

describe('OcDropdownFormComponent', () => {
    let component: OcDropdownFormComponent;
    let fixture: ComponentFixture<OcDropdownFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OcDropdownFormComponent, MockFormComponent],
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
