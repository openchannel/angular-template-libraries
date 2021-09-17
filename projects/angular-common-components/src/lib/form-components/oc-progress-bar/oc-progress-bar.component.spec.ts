import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OcProgressBarComponent } from './oc-progress-bar.component';
import { FormsModule } from '@angular/forms';

describe('OcProgressBarComponent', () => {
    let component: OcProgressBarComponent;
    let fixture: ComponentFixture<OcProgressBarComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcProgressBarComponent],
                imports: [FormsModule, OcProgressBarComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcProgressBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
