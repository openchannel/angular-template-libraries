import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { OcTagElementComponent } from './oc-tag-element.component';
import { By } from '@angular/platform-browser';
import {AngularSvgIconModule} from "angular-svg-icon";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('OcTagElementComponent', () => {
  let component: OcTagElementComponent;
  let fixture: ComponentFixture<OcTagElementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OcTagElementComponent ],
      imports: [ AngularSvgIconModule.forRoot(), HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcTagElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show tag data', () => {
    component.title = 'Test Tag';
    component.closeMarker = true;

    fixture.detectChanges();

    const closeMarker: HTMLOrSVGElement = fixture.debugElement.query(By.css('svg-icon')).nativeElement;
    const tagTitle: HTMLDivElement = fixture.debugElement.query(By.css('.tag-element__text')).nativeElement;

    expect(closeMarker).toBeTruthy();
    expect(tagTitle.textContent).toContain('Test Tag');
  });

  it('should emit a value', () => {
    component.title = 'Test Tag';
    component.closeMarker = true;

    fixture.detectChanges();

    const closeMarker: HTMLImageElement = fixture.debugElement.query(By.css('svg-icon')).nativeElement;

    spyOn(component.clickEmitter, 'emit');

    closeMarker.click();

    expect(component.clickEmitter.emit).toHaveBeenCalledWith('Test Tag');
  });
});
