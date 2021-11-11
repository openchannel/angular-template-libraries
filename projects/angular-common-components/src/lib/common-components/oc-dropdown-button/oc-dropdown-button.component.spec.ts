import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OcDropdownButtonComponent } from './oc-dropdown-button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';

describe('OcDropdownButtonComponent', () => {
    let component: OcDropdownButtonComponent;
    let fixture: ComponentFixture<OcDropdownButtonComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcDropdownButtonComponent, MockSvgIconComponent],
                imports: [NgbModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcDropdownButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
