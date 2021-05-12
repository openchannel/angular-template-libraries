import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OcAppTableComponent } from './oc-app-table.component';
import { Component, Input } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CamelcasePipe, HtmlTagsReplacerPipe } from '@openchannel/angular-common-components/src/lib/common-components';
import { AppListing } from '../models/app-listing.model';

@Component({
    selector: 'svg-icon',
    template: '',
})
export class MockSvgIconComponent {
    @Input() src: string;
}

describe('OcAppTableComponent', () => {
    let component: OcAppTableComponent;
    let fixture: ComponentFixture<OcAppTableComponent>;
    const propertiesMock: AppListing = {
        layout: 'table',
        data: {
            pageNumber: 1,
            pages: 2,
            count: 1,
            list: [
                {
                    appId: 'testId',
                    lastUpdated: 1616406353,
                    customData: { icon: 'test' },
                    version: 1,
                    name: 'name',
                    safeName: [],
                    developerId: 'devId',
                    model: [],
                    submittedDate: 1616406353,
                    created: 1616406353,
                    rating: 11,
                    reviewCount: 11,
                    status: { reason: 'test', lastUpdated: 1616406353, modifiedBy: 'test', value: 'pending' },
                    statistics: null,
                    isLive: false,
                },
            ],
        },
        options: ['SUBMIT', 'PUBLISH'],
    };

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcAppTableComponent, MockSvgIconComponent, CamelcasePipe, HtmlTagsReplacerPipe],
                providers: [NgModel],
                imports: [FormsModule, CommonModule, BrowserModule, InfiniteScrollModule, NgbModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcAppTableComponent);
        component = fixture.componentInstance;
        component.properties = propertiesMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
