import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcConfirmationModalComponent } from './oc-confirmation-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
    MockButtonComponent,
    MockHeadingTagDirective,
    MockSvgIconComponent
} from '@openchannel/angular-common-components/src/mock/mock';


describe('OcConfirmationModalComponent', () => {
    let component: OcConfirmationModalComponent;
    let fixture: ComponentFixture<OcConfirmationModalComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcConfirmationModalComponent, MockButtonComponent, MockSvgIconComponent, MockHeadingTagDirective],
                providers: [NgbActiveModal],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcConfirmationModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
