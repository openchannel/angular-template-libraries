import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcSocialLinksComponent } from './oc-social-links.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('OcSocialLinksComponent', () => {
    let component: OcSocialLinksComponent;
    let fixture: ComponentFixture<OcSocialLinksComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcSocialLinksComponent],
                imports: [RouterTestingModule.withRoutes([])],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcSocialLinksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should receive passed data', () => {
        component.socialLinks = [
            {
                link: 'https://facebook.com',
                iconSrc: 'assets/img/facebook-icon.svg',
                iconAlt: 'facebook-icon',
            },
            {
                link: 'https://twitter.com',
                iconSrc: 'assets/img/twitter-icon.svg',
                iconAlt: 'twitter-icon',
            },
        ];

        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('.social-links__item')).length).toBe(component.socialLinks.length);
    });
});
