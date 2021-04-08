import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcAppGetStartedComponent} from './oc-app-get-started.component';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'oc-button',
  template: ''
})
export class ButtonMockComponent {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() type: 'primary' | 'secondary' | 'link' = 'primary';
  @Input() class: string;
  @Input() style: string;
  @Input() process: string;
}

describe('OcAppGetStartedComponent', () => {
  let component: OcAppGetStartedComponent;
  let fixture: ComponentFixture<OcAppGetStartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcAppGetStartedComponent, ButtonMockComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppGetStartedComponent);
    component = fixture.componentInstance;
    component.getStartedButtonText = 'Get Started';
    component.getStartedHeader = 'Test Get Started';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show search', () => {
    component.getStartedType = 'search';
    fixture.detectChanges();

    const header: HTMLHeadingElement = fixture.debugElement.query(By.css('h1')).nativeElement;

    expect(header.textContent).toContain('Test Get Started');
  });

  it('should show home', () => {
    component.getStartedType = 'home';
    component.getStartedDescription = 'This is only test description';
    component.getStartedImage = 'https://stage1-philips-market-test.openchannel.io/assets/oc-ng-common-component/item-1.png';
    fixture.detectChanges();

    const description: HTMLParagraphElement = fixture.debugElement.query(By.css('p')).nativeElement;
    const image: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;

    expect(description.textContent).toContain('This is only test description');
    expect(image.src).toBeTruthy();
  });

  it('should emit click on Button component', () => {
    component.getStartedType = 'search';

    spyOn(component.getStarted, 'emit');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
    button.click();

    expect(component.getStarted.emit).toHaveBeenCalledTimes(1);
  });
});
