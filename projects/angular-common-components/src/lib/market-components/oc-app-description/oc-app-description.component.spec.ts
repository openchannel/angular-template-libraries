import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcAppDescriptionComponent} from './oc-app-description.component';
import {FormsModule} from '@angular/forms';

describe('OcAppDescriptionComponent', () => {
  let component: OcAppDescriptionComponent;
  let fixture: ComponentFixture<OcAppDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OcAppDescriptionComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppDescriptionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('header normal value', () => {
    const header = 'Header';
    setHeaderText(header);
    expect(getHeaderText()).toEqual(header);
  });

  it('header non null', () => {
    const header = null;
    setHeaderText(header);
    expect(getHeaderText()).toEqual("");
  });

  it('header non undefined', () => {
    const header = undefined;
    setHeaderText(header);
    expect(getHeaderText()).toEqual("");
  });

  it('description normal value', () => {
    const description = 'Description';
    setDescriptionText(description);
    expect(getDescriptionText()).toEqual(description);
  });

  it('description non null', () => {
    const description = null;
    setDescriptionText(description);
    expect(getDescriptionText()).toEqual("");
  });

  it('description non undefined', () => {
    const description = undefined;
    setDescriptionText(description);
    expect(getDescriptionText()).toEqual("");
  });

  it('expand description normal value', () => {
    const expandDescription = 'Expand description';
    setExpandDescription(expandDescription);
    expect(getExpandDescription()).toEqual(expandDescription);
  });

  it('expand description non null', () => {
    const expandDescription = null;
    setExpandDescription(expandDescription);
    expect(getExpandDescription()).toEqual("");
  });

  it('expand description non undefined', () => {
    const expandDescription = undefined;
    setExpandDescription(expandDescription);
    expect(getExpandDescription()).toEqual("");
  });

  it('switch full description by click', () => {
    fixture.detectChanges();
    expect(component.showFullDescription).toBeFalsy();
    fixture.nativeElement.querySelector('span').click();
    fixture.detectChanges();
    expect(component.showFullDescription).toBeTruthy();
    expect(fixture.nativeElement.querySelector('span')).toBeNull();
  });

  function setExpandDescription(expandDescription: string): void {
    component.expandDescriptionText = expandDescription;
    fixture.detectChanges();
  }

  function getExpandDescription(): string {
    return fixture.nativeElement.querySelector('span').innerHTML;
  }

  function setHeaderText(header: string): void {
    component.header = header;
    fixture.detectChanges();
  }

  function getHeaderText(): string {
    return fixture.nativeElement.querySelector('h4').innerHTML;
  }

  function setDescriptionText(description: string): void {
    component.appDescription = description;
    fixture.detectChanges();
  }

  function getDescriptionText(): string {
    return fixture.nativeElement.querySelector('p').innerHTML;
  }

});


