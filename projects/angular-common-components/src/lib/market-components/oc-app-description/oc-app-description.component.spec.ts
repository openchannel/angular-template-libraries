import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcAppDescriptionComponent } from './oc-app-description.component';
import { FormsModule } from '@angular/forms';

describe('OcAppDescriptionComponent', () => {
    let component: OcAppDescriptionComponent;
    let fixture: ComponentFixture<OcAppDescriptionComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcAppDescriptionComponent],
                imports: [FormsModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcAppDescriptionComponent);
        component = fixture.componentInstance;
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

    it('expand description normal value', () => {
        const expandDescription = 'Expand description';
        setExpandDescription(expandDescription);
        setDescriptionText('It is a long description text'.repeat(300));
        expect(getExpandDescription()).toEqual(expandDescription);
    });

    it('expand description non null', () => {
        const expandDescription = null;
        setExpandDescription(expandDescription);
        setDescriptionText('It is a long description text'.repeat(300));
        expect(getExpandDescription()).toEqual('');
    });

    it('expand description non undefined', () => {
        const expandDescription = undefined;
        setExpandDescription(expandDescription);
        setDescriptionText('It is a long description text'.repeat(300));
        expect(getExpandDescription()).toEqual('');
    });

    function setExpandDescription(expandDescription: string): void {
        component.expandDescriptionText = expandDescription;
    }

    function getExpandDescription(): string {
        return fixture.nativeElement.querySelector('.description__show-more').textContent;
    }

    function setHeaderText(header: string): void {
        component.header = header;
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
