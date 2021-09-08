import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcSidebarComponent } from './oc-sidebar.component';
import { Component, Input } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { MockHeadingTagDirective } from '@openchannel/angular-common-components/src/mock/mock';

@Component({
    selector: 'svg-icon',
    template: '',
})
export class MockSvgIconComponent {
    @Input() src: string = '';
}

describe('OcSidebarComponent', () => {
    let component: OcSidebarComponent;
    let fixture: ComponentFixture<OcSidebarComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcSidebarComponent, MockSvgIconComponent, MockHeadingTagDirective],
                imports: [NgbCollapseModule, RouterTestingModule.withRoutes([])],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
