import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcAppDescriptionComponent } from './oc-app-description.component';
import { FormsModule } from '@angular/forms';
import { OcCommonLibModule } from '../../common-components/';
import { By } from '@angular/platform-browser';

describe('OcAppDescriptionComponent', () => {
    let component: OcAppDescriptionComponent;
    let fixture: ComponentFixture<OcAppDescriptionComponent>;
    let descriptionElement: Element;
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcAppDescriptionComponent],
                imports: [FormsModule, OcCommonLibModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcAppDescriptionComponent);
        component = fixture.componentInstance;
        descriptionElement = fixture.debugElement.query(By.css('.description__text')).nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('header normal value', () => {
        const header = 'Header';
        setHeaderText(header);
        expect(getHeaderText()).toEqual(header);
    });

    it('header non null', () => {
        const header = null;
        setHeaderText(header);
        expect(getHeaderText()).toEqual('');
    });

    it('header non undefined', () => {
        const header = undefined;
        setHeaderText(header);
        expect(getHeaderText()).toEqual('');
    });

    it('description normal value', () => {
        const description = 'Description';
        setDescriptionText(description);
        expect(getDescriptionText()).toEqual(description);
    });

    it('description non null', () => {
        const description = null;
        setDescriptionText(description);
        expect(getDescriptionText()).toEqual('');
    });

    it('description non undefined', () => {
        const description = undefined;
        setDescriptionText(description);
        expect(getDescriptionText()).toEqual('');
    });

    it('switch full description by click', () => {
        setDescriptionText('lorem ipsum');
        setThreshold(800);
        fixture.detectChanges();
        expect(component.showFullDescription).toBeFalsy();
        expect(descriptionElement.textContent).toEqual(component.cutAppDescription as string);
        fixture.nativeElement.querySelector('span').click();
        fixture.detectChanges();
        expect(component.showFullDescription).toBeTruthy();
        expect(descriptionElement.textContent).toEqual(component.appDescriptionText);
    });

    function setHeaderText(header: string): void {
        component.header = header;
        fixture.detectChanges();
    }

    function setThreshold(threshold: number): void {
        component.threshold = threshold;
        fixture.detectChanges();
    }

    function getHeaderText(): string {
        return fixture.nativeElement.querySelector('h4').innerHTML;
    }

    function setDescriptionText(description: string): void {
        component.appDescription = description;
        fixture.detectChanges();
    }

    function getDescriptionText(): string {
        return fixture.nativeElement.querySelector('p').innerHTML;
    }
});
