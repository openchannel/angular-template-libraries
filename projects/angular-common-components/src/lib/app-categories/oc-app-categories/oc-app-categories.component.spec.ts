import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OcAppCategoriesComponent } from './oc-app-categories.component';
import { By } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppCategoryDetail } from '../models/app-category-model';

@Component({
    template: '',
})
export class MockRoutingComponent {}

const appCategory1: AppCategoryDetail = {
    categoryCardClass: 'category-card',
    categoryLogo: '',
    categoryName: 'All Apps',
    categoryTitleColor: 'orange',
    categoryQuery: null,
};

describe('OcAppCategoriesComponent', () => {
    let component: OcAppCategoriesComponent;
    let fixture: ComponentFixture<OcAppCategoriesComponent>;
    let location: Location;
    let router: Router;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    BrowserAnimationsModule,
                    CarouselModule,
                    RouterTestingModule.withRoutes([{ path: 'mock-router', component: MockRoutingComponent }]),
                ],
                declarations: [OcAppCategoriesComponent, MockRoutingComponent],
                schemas: [NO_ERRORS_SCHEMA],
            }).compileComponents();
            router = TestBed.inject(Router);
            location = TestBed.inject(Location);
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcAppCategoriesComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should move slides to the next', () => {
        component.data = [appCategory1, appCategory1, appCategory1, appCategory1, appCategory1, appCategory1];
        spyOn(component, 'nextSlide');

        fixture.detectChanges();

        const rightScrollButton = fixture.debugElement.query(By.css('#iconRight')).nativeElement;

        rightScrollButton.click();
        expect(component.nextSlide).toHaveBeenCalled();
    });

    it('should move slides to the preview', () => {
        component.data = [appCategory1, appCategory1, appCategory1, appCategory1, appCategory1, appCategory1];
        spyOn(component, 'prevSlide');
        fixture.detectChanges();

        const leftScrollButton = fixture.debugElement.query(By.css('#iconLeft')).nativeElement;

        leftScrollButton.click();
        expect(component.prevSlide).toHaveBeenCalled();
    });

    it('should redirect on route without query', async () => {
        component.data = [appCategory1, appCategory1, appCategory1, appCategory1, appCategory1, appCategory1];
        component.categoryRouterLink = 'mock-router';
        fixture.detectChanges();

        const categoryCard = fixture.debugElement.query(By.css('.category-card')).nativeElement;
        categoryCard.click();

        await fixture.whenStable().then(() => {
            expect(location.path()).toEqual('/mock-router');
        });
    });

    it('should redirect on route with query', async () => {
        appCategory1.categoryQuery = { test: 'test' };
        component.data = [appCategory1, appCategory1, appCategory1, appCategory1, appCategory1, appCategory1];
        component.categoryRouterLink = 'mock-router';
        fixture.detectChanges();

        const categoryCard = fixture.debugElement.query(By.css('.category-card')).nativeElement;
        categoryCard.click();

        await fixture.whenStable().then(() => {
            expect(location.path()).toEqual('/mock-router?test=test');
        });
    });
});
