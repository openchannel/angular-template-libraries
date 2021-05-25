import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OcContentModalComponent } from './oc-content-modal.component';
import { By } from '@angular/platform-browser';
import { MockButtonComponent } from '@openchannel/angular-common-components/src/mock/mock';

describe('OcContentModalComponent', () => {
    let component: OcContentModalComponent;
    let fixture: ComponentFixture<OcContentModalComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcContentModalComponent, MockButtonComponent],
                imports: [AngularSvgIconModule.forRoot(), HttpClientTestingModule],
                providers: [NgbActiveModal],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcContentModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have content with scroll', () => {
        component.hasLongContent = true;

        fixture.detectChanges();

        const modalElement = fixture.debugElement.query(By.css('.content-modal')).nativeElement;

        expect(modalElement.className).toContain('content-modal_long-content');
    });
});
