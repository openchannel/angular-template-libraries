import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcSocialLinksComponent } from './oc-social-links.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('OcSocialLinksComponent', () => {
    let component: OcSocialLinksComponent;
    let fixture: ComponentFixture<OcSocialLinksComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OcSocialLinksComponent],
            imports: [RouterTestingModule.withRoutes([])]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OcSocialLinksComponent);
        component = fixture.componentInstance;
        component.socialLinks = [
            {
                link: 'https://facebook.com',
                iconSrc: 'assets/img/facebook-icon.svg',
                iconAlt: 'facebook-icon'
            }
        ]
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
