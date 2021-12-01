import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcConsentComponent } from './oc-consent.component';
import { MockCheckboxComponent } from 'projects/angular-common-components/src/mock/mock';
import { FormsModule } from '@angular/forms';

describe('OcConsentComponent', () => {
    let component: OcConsentComponent;
    let fixture: ComponentFixture<OcConsentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OcConsentComponent, MockCheckboxComponent],
            imports: [FormsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OcConsentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
