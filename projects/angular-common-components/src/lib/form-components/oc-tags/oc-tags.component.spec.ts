import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OcTagsComponent } from '@openchannel/angular-common-components/src/lib/form-components';
import {
    OcButtonComponent,
    OcErrorComponent,
    OcInputComponent,
    OcSelectComponent,
    OcTagElementComponent,
    OcTitleComponent,
} from '@openchannel/angular-common-components/src/lib/common-components';
import { MockDropboxComponent } from '../../../mock/mock';

describe('OcTagsComponent', () => {
    let component: OcTagsComponent;
    let fixture: ComponentFixture<OcTagsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcTagsComponent,
                    OcTitleComponent,
                    OcInputComponent,
                    OcSelectComponent,
                    OcButtonComponent,
                    OcTagElementComponent,
                    OcErrorComponent,
                    MockDropboxComponent,
                ],
                imports: [FormsModule, NgbModule, NgxSpinnerModule, AngularSvgIconModule.forRoot(), HttpClientTestingModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcTagsComponent);
        component = fixture.componentInstance;
        component.placeholder = 'Tags Title';
        component.dropbox = [] as any;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('write value', async () => {
        component.writeValue(['new-tag', 'new-tag-2', 'new-tag-3']);
        await fixture.whenStable().then(() => {
            expect(component?.resultTags?.length).toEqual(3);
        });
    });

    it('write null value', async () => {
        component.writeValue(null);
        await fixture.whenStable().then(() => {
            expect(component?.resultTags?.length).toEqual(0);
        });
    });

    it('write number values', async () => {
        component.tagsType = 'number';
        component.writeValue(['321', '293', '324']);
        await fixture.whenStable().then(() => {
            expect(component?.resultTags?.length).toEqual(3);
        });
    });

    it('should add tag to result list', async () => {
        component.addTagToResultList('500');
        await fixture.whenStable().then(() => {
            expect(component?.resultTags).toContain('500');
        });
    });

    it('should remove tag from result list', async () => {
        component.addTagToResultList('500');
        component.removeTag(0);
        await fixture.whenStable().then(() => {
            expect(component?.resultTags.includes('500')).toBeFalsy();
        });
    });
});
