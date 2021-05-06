import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcTextSearchComponent} from './oc-text-search.component';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('OcTextSearchComponent', () => {
  let component: OcTextSearchComponent;
  let fixture: ComponentFixture<OcTextSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OcTextSearchComponent],
      imports: [FormsModule, AngularSvgIconModule.forRoot(), HttpClientTestingModule],
    })
      .compileComponents();
  }));

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

    spyOn(component.enterSearch, 'emit');
    fixture.detectChanges();
    input.nativeElement.dispatchEvent(new Event('input'));

    input.triggerEventHandler('keydown.enter', {});
    fixture.detectChanges();

    expect(component.enterSearch.emit).toHaveBeenCalledWith('Hello test!');
  });

  it('should emit text value on click', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const img: HTMLImageElement = fixture.debugElement.query(By.css('svg-icon')).nativeElement;
    input.value = 'Hello test!';

    spyOn(component.enterSearch, 'emit');
    fixture.detectChanges();

    input.dispatchEvent(new Event('input'));

    img.click();
    fixture.detectChanges();

    expect(component.enterSearch.emit).toHaveBeenCalledWith('Hello test!');
  });
});
