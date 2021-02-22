import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcTagElementComponent } from './oc-tag-element.component';
import { By } from '@angular/platform-browser';

describe('OcTagElementComponent', () => {
  let component: OcTagElementComponent;
  let fixture: ComponentFixture<OcTagElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcTagElementComponent ]
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

    const closeMarker: HTMLOrSVGElement = fixture.debugElement.query(By.css('svg')).nativeElement;
    const tagTitle: HTMLDivElement = fixture.debugElement.query(By.css('#tagTitle')).nativeElement;

    expect(closeMarker).toBeTruthy();
    expect(tagTitle.textContent).toContain('Test Tag');
  });

  it('should emit a value', () => {
    component.title = 'Test Tag';

    const oneTag: HTMLDivElement = fixture.debugElement.query(By.css('#tag')).nativeElement;

    spyOn(component.clickEmitter, 'emit');

    fixture.detectChanges();

    oneTag.click();

    expect(component.clickEmitter.emit).toHaveBeenCalledWith('Test Tag');
  });
});
