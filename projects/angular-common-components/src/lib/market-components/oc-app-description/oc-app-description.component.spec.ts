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
        descriptionElement = fixture.debugElement.query(By.css('#ocAppDescriptionTruncatedTextId')).nativeElement;
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
        component.appDescription = '1234567890';
        component.truncateTextLength = 5;
        fixture.detectChanges();
        const description = fixture.nativeElement.querySelector('#ocAppDescriptionTruncatedTextId');
        const switchButton = fixture.nativeElement.querySelector('#ocAppDescriptionShowMoreId');
        expect(switchButton.textContent).toEqual('Show more');
        expect(description.textContent).toEqual('12...');
        switchButton.click();
        fixture.detectChanges();
        expect(switchButton.textContent).toEqual('Show less');
        expect(description.textContent).toEqual('1234567890');
    });

    it('description without any html tags', () => {
        component.appDescription = '<a>1234567890</a>';
        component.truncateTextLength = 5;
        fixture.detectChanges();
        const description = fixture.nativeElement.querySelector('#ocAppDescriptionTruncatedTextId');
        const switchButton = fixture.nativeElement.querySelector('#ocAppDescriptionShowMoreId');
        expect(switchButton.textContent).toEqual('Show more');
        expect(description.textContent).toEqual('12...');
    });

    function setHeaderText(header: string): void {
        component.header = header;
        fixture.detectChanges();
    }

    function getHeaderText(): string {
        return fixture.nativeElement.querySelector('#ocAppDescriptionHeaderTextId').innerHTML;
    }

    function setDescriptionText(description: string): void {
        component.appDescription = description;
        fixture.detectChanges();
    }

    function getDescriptionText(): string {
        return fixture.nativeElement.querySelector('#ocAppDescriptionTruncatedTextId').innerHTML;
    }
});
