import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcTextSearchComponent } from './oc-text-search.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockButtonComponent, MockSvgIconComponent, MockTagComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { SelectedFilter } from '@openchannel/angular-common-components/src/lib/common-components';

const mockedSelectedFilter: SelectedFilter = {
    parentFilterId: 'collections',
    selectedFilterValue: {
        query: '{"status.value":"approved","attributes.featured":"yes"}',
        sort: '{"randomize":1}',
        id: 'featured',
        label: 'Featured',
        description: '',
        values: null,
        expanded: false,
        checked: false,
        icon: './assets/icons/analytics-category-icon.png',
    },
};

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

    it('should emit selected filter on close button filter tag click', () => {
        component.selectedFilters = [mockedSelectedFilter];
        fixture.detectChanges();

        const tags = fixture.debugElement.queryAll(By.directive(MockTagComponent));
        const mockedSelectedFilterInstance = tags.find(
            tag => tag.componentInstance.title === mockedSelectedFilter.selectedFilterValue.label,
        ).componentInstance;
        const selectedFilterDeletedEmitFunction = jest.spyOn(component.selectedFilterDeleted, 'emit');

        mockedSelectedFilterInstance.clickEmitter.emit();
        fixture.detectChanges();

        expect(selectedFilterDeletedEmitFunction).toHaveBeenCalledWith(mockedSelectedFilter);
    });

    it('should emit on close button search tag click', () => {
        const searchExample = 'Search example';

        component.searchTermTag = searchExample;
        fixture.detectChanges();

        const tags = fixture.debugElement.queryAll(By.directive(MockTagComponent));
        const searchTermTagInstance = tags.find(tag => tag.componentInstance.title === searchExample).componentInstance;
        const searchTermTagDeletedEmitFunction = jest.spyOn(component.searchTermTagDeleted, 'emit');

        searchTermTagInstance.clickEmitter.emit();
        fixture.detectChanges();

        expect(searchTermTagDeletedEmitFunction).toHaveBeenCalled();
    });

    it('should emit on clear all button click', () => {
        component.searchTermTag = 'Search example';
        fixture.detectChanges();

        const clearAllButton = fixture.debugElement.query(By.css('.clear-all-tags-button')).nativeElement;
        const clearAllTagsClickedEmitFunction = jest.spyOn(component.clearAllTagsClicked, 'emit');

        clearAllButton.click();
        fixture.detectChanges();

        expect(clearAllTagsClickedEmitFunction).toHaveBeenCalled();
    });

    it('clear all button type should be same as clearAllButtonType passed value', () => {
        const primaryType = 'primary';

        component.searchTermTag = 'Search example';
        component.clearAllButtonType = primaryType;
        fixture.detectChanges();

        const clearAllButton = fixture.debugElement.query(By.css('.clear-all-tags-button')).componentInstance;

        expect(clearAllButton.type).toBe(primaryType);
    });

    it('clear all button should be absent when isShowClearAllTagsButton = false', () => {
        component.searchTermTag = 'Search example';
        component.isShowClearAllTagsButton = false;
        fixture.detectChanges();

        const clearAllButton = fixture.debugElement.query(By.css('.clear-all-tags-button'));

        expect(clearAllButton).toBeNull();
    });

    it('clear all button customClass should depend on button type', () => {
        component.searchTermTag = 'Search example';
        component.clearAllButtonType = 'primary';
        fixture.detectChanges();

        const clearAllButton = fixture.debugElement.query(By.css('.clear-all-tags-button')).componentInstance;

        expect(clearAllButton.customClass).toBe('text-search__clear-all-tags-button');

        component.clearAllButtonType = 'link';
        fixture.detectChanges();

        expect(clearAllButton.customClass).toBe('');
    });
});
