import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcTitleComponent } from './oc-title.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';

describe('OcTitleComponent', () => {
    let component: OcTitleComponent;
    let fixture: ComponentFixture<OcTitleComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcTitleComponent, MockSvgIconComponent],
                imports: [NgbModule, HttpClientTestingModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set title', () => {
        component.title = 'test title';
        fixture.detectChanges();
        expect(component.titleText).toContain('test title');
    });
});
