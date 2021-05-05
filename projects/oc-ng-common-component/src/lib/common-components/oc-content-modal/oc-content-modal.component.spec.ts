import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MockButtonComponent} from 'oc-ng-common-component/src/mock/mock';
import {OcContentModalComponent} from './oc-content-modal.component';

describe('OcTagElementComponent', () => {
    let component: OcContentModalComponent;
    let fixture: ComponentFixture<OcContentModalComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OcContentModalComponent, MockButtonComponent],
            imports: [AngularSvgIconModule.forRoot(), HttpClientTestingModule],
            providers: [NgbActiveModal]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OcContentModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
