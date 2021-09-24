import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OcProgressBarComponent } from './oc-progress-bar.component';
import { FormsModule } from '@angular/forms';
import { MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';

describe('OcProgressBarComponent', () => {
    let component: OcProgressBarComponent;
    let fixture: ComponentFixture<OcProgressBarComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcProgressBarComponent, MockSvgIconComponent],
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
            },
            {
                title: 'Contact information',
                state: 'pristine',
            },
            {
                title: 'Images',
                state: 'pristine',
            },
            {
                title: 'Personal Data',
                state: 'pristine',
            },
            {
                title: 'Step 5',
                state: 'pristine',
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
