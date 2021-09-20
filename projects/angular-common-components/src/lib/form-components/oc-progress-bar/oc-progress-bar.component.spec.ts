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
                imports: [FormsModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcProgressBarComponent);
        component = fixture.componentInstance;
        component.progressbarData = [
            {
                title: 'Step 1',
                state: 'pristine',
                defaultDivider: true,
            },
            {
                title: 'Contact information',
                state: 'pristine',
                defaultDivider: true,
            },
            {
                title: 'Images',
                state: 'pristine',
                defaultDivider: true,
            },
            {
                title: 'Personal Data',
                state: 'pristine',
                defaultDivider: true,
            },
            {
                title: 'Step 5',
                state: 'pristine',
                defaultDivider: true,
            },
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have class equal to the variant', () => {
        component.currentStep = 3;
        fixture.detectChanges();
        const steps = fixture.nativeElement.querySelectorAll('.form-progressbar__item');
        expect(steps[component.currentStep - 1].className.includes('form-progressbar__item_current')).toBe(true);
    });
});
