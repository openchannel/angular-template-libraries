import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcInitialsComponent } from './oc-initials.component';
import { By } from '@angular/platform-browser';


describe('OcInitialsComponent', () => {
    let component: OcInitialsComponent;
    let fixture: ComponentFixture<OcInitialsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcInitialsComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcInitialsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('null is safe', () => {
        component.tempInitialType = null;
        component.initialsImageURL = null;
        component.initialsName = null;
        component.primaryInitialType = null;
        component.initialsNameCharactersLimit = null;
        fixture.detectChanges();
    });

    it('set image', () => {
        component.initialsImageURL = 'assets/angular-common-components/get-started.svg';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('#initials-image')) !== null).toBeTruthy();
    });

    it('set text', () => {
        component.initialsName = 'Fuel crm gold';
        component.initialsNameCharactersLimit = 2;
        fixture.detectChanges();
        const initialComponent = fixture.debugElement.query(By.css('#initials-text'));
        expect(initialComponent !== null).toBeTruthy();
        expect(initialComponent.nativeElement.textContent).toBe('FC');
    });

    it('set text when image is not found', () => {
        component.primaryInitialType = 'image';

        component.initialsImageURL = null;
        component.initialsName = 'Fuel crm gold';
        component.initialsNameCharactersLimit = 2;

        fixture.detectChanges();
        const initialComponent = fixture.debugElement.query(By.css('#initials-text'));
        expect(initialComponent !== null).toBeTruthy();
        expect(initialComponent.nativeElement.textContent).toBe('FC');
    });


    it('set image when text is empty', () => {
        component.primaryInitialType = 'name';

        component.initialsImageURL = 'assets/angular-common-components/get-started.svg';
        component.initialsName = null;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('#initials-image')) !== null).toBeTruthy();
    });

    it('set text when all values is empty', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('#initials-text')) !== null).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#initials-image')) === null).toBeTruthy();
    });
});
