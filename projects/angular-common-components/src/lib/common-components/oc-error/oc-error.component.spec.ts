import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcErrorComponent } from './oc-error.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OcErrorService } from './oc-error-service';

describe('OcErrorComponent', () => {
    let component: OcErrorComponent;
    let fixture: ComponentFixture<OcErrorComponent>;
    let service: OcErrorService;

    const testForm = new FormGroup({
        testControl: new FormControl([''], Validators.required),
    });

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcErrorComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcErrorComponent);
        component = fixture.componentInstance;
        service = new OcErrorService();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show value', () => {
        component.control = testForm.get('testControl');

        testForm.get('testControl').markAsDirty();
        testForm.get('testControl').setErrors({ required: true });
        fixture.detectChanges();

        const errorMessage = fixture.nativeElement.querySelector('span');

        expect(errorMessage.textContent).toContain('Please fill out this field');
    });

    it('should set servers error', async () => {
        const serverErrors = [
            {
                field: 'emailInput',
                message: 'Wrong Email',
            },
        ];

        component.errorService.setServerErrorList(serverErrors);
        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            expect(component.errorService.serverErrorList.length).toBeGreaterThan(0);
        });
    });
});
