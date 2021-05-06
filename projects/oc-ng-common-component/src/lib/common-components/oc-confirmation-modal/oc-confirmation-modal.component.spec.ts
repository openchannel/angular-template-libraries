import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcConfirmationModalComponent} from './oc-confirmation-modal.component';
import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'oc-button',
    template: ''
})
export class MockButtonComponent {
    @Input() text: string = '';
    @Input() type: 'primary' | 'secondary' | 'link' = 'primary';
}

@Component({
    selector: 'svg-icon',
    template: '',
})
export class MockSvgIconComponent {
    @Input() src: string = '';
}

describe('OcConfirmationModalComponent', () => {
    let component: OcConfirmationModalComponent;
    let fixture: ComponentFixture<OcConfirmationModalComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                OcConfirmationModalComponent,
                MockButtonComponent,
                MockSvgIconComponent
            ],
            providers: [ NgbActiveModal ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OcConfirmationModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
