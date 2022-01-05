import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OcAdditionalSelectComponent } from './oc-additional-select.component';
import { MockSelectComponent } from '@openchannel/angular-common-components/src/mock/mock';

describe('OcAdditionalSelectComponent', () => {
    let component: OcAdditionalSelectComponent;
    let fixture: ComponentFixture<OcAdditionalSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OcAdditionalSelectComponent, MockSelectComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OcAdditionalSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
