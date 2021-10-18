import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcTextSearchComponent } from './oc-text-search.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockButtonComponent, MockSvgIconComponent, MockTagComponent } from '@openchannel/angular-common-components/src/mock/mock';

const tagsTitlesMocked = ['collections', 'categories', 'search criteria'];

describe('OcTextSearchComponent', () => {
    let component: OcTextSearchComponent;
    let fixture: ComponentFixture<OcTextSearchComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcTextSearchComponent, MockButtonComponent, MockSvgIconComponent, MockTagComponent],
                imports: [FormsModule, HttpClientTestingModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcTextSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain value in input', () => {
        const input = fixture.debugElement.query(By.css('input')).nativeElement;
        input.value = 'Hello test!';

        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.searchText).toBe('Hello test!');
    });

    it('should emit text value', () => {
        const input = fixture.debugElement.query(By.css('input'));
        input.nativeElement.value = 'Hello test!';

        const enterSearchEmitFunction = jest.spyOn(component.enterSearch, 'emit');
        fixture.detectChanges();
        input.nativeElement.dispatchEvent(new Event('input'));

        input.triggerEventHandler('keydown.enter', {});
        fixture.detectChanges();

        expect(enterSearchEmitFunction).toHaveBeenCalledWith('Hello test!');
    });

    it('should emit text value on click', () => {
        const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const img: HTMLImageElement = fixture.debugElement.query(By.css('svg-icon')).nativeElement;
        input.value = 'Hello test!';

        const enterSearchEmitFunction = jest.spyOn(component.enterSearch, 'emit');
        fixture.detectChanges();

        input.dispatchEvent(new Event('input'));

        img.click();
        fixture.detectChanges();

        expect(enterSearchEmitFunction).toHaveBeenCalledWith('Hello test!');
    });

    it('should emit tag index on close button tag click', () => {
        const tagIndexToDelete = 0;

        component.tagsTitles = [...tagsTitlesMocked];
        fixture.detectChanges();

        const tags = fixture.debugElement.queryAll(By.directive(MockTagComponent));
        const tagInstanceToDelete = tags.find(tag => tag.componentInstance.title === tagsTitlesMocked[tagIndexToDelete]).componentInstance;
        const tagToDeleteEmitFunction = jest.spyOn(component.tagDeleted, 'emit');

        tagInstanceToDelete.clickEmitter.emit();
        fixture.detectChanges();

        expect(tagToDeleteEmitFunction).toHaveBeenCalledWith(tagIndexToDelete);
    });

    it('should emit on clear all button click', () => {
        component.tagsTitles = [...tagsTitlesMocked];
        fixture.detectChanges();

        const clearAllButton = fixture.debugElement.query(By.css('.tags__clear-all-tags-button')).nativeElement;
        const clearAllTagsClickedEmitFunction = jest.spyOn(component.allTagsDeleted, 'emit');

        clearAllButton.click();
        fixture.detectChanges();

        expect(clearAllTagsClickedEmitFunction).toHaveBeenCalled();
    });

    it('clear all button type should be same as clearAllButtonType passed value', () => {
        const primaryType = 'primary';

        component.tagsTitles = [...tagsTitlesMocked];
        component.clearAllButtonType = primaryType;
        fixture.detectChanges();

        const clearAllButton = fixture.debugElement.query(By.css('.tags__clear-all-tags-button')).componentInstance;

        expect(clearAllButton.type).toBe(primaryType);
    });

    it('clear all button should be absent when isShowClearAllTagsButton = false', () => {
        component.tagsTitles = [...tagsTitlesMocked];
        component.isShowClearAllTagsButton = false;
        fixture.detectChanges();

        const clearAllButton = fixture.debugElement.query(By.css('.tags__clear-all-tags-button'));

        expect(clearAllButton).toBeNull();
    });

    it('clear all button customClass should depend on button type', () => {
        component.tagsTitles = [...tagsTitlesMocked];
        component.clearAllButtonType = 'primary';
        fixture.detectChanges();

        const clearAllButton = fixture.debugElement.query(By.css('.tags__clear-all-tags-button')).componentInstance;

        expect(clearAllButton.customClass).toBe('tags__clear-all-tags-button-not-a-link');

        component.clearAllButtonType = 'link';
        fixture.detectChanges();

        expect(clearAllButton.customClass).toBe('');
    });
});
