import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcActivationComponent} from './oc-activation.component';
import {
  AbstractControl,
  AbstractControlDirective,
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgModel
} from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'oc-label',
  template: ''
})
export class MockLabelComponent {
  @Input() text: string = '';
}

@Component({
  selector: 'oc-error',
  template: ''
})
export class MockErrorComponent {
  @Input()
  public control: AbstractControlDirective | AbstractControl | NgModel;
  @Input()
  public field: string;
}
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
@Component({
  selector: 'oc-input',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockInputComponent),
    multi: true
  }],
})
export class MockInputComponent implements ControlValueAccessor {
  @Input() inputType: string = 'text';
  @Input() placeholder: string = '';
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}
@Component({
  template: ''
})
export class MockRoutingComponent {
}

describe('OcActivationComponent', () => {
  let component: OcActivationComponent;
  let fixture: ComponentFixture<OcActivationComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OcActivationComponent,
        MockLabelComponent,
        MockErrorComponent,
        ButtonMockComponent,
        MockInputComponent,
        MockRoutingComponent
      ],
      imports: [FormsModule, RouterTestingModule.withRoutes([
        {path: 'resend-activation', component: MockRoutingComponent},
        {path: 'signup', component: MockRoutingComponent}
      ])]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to resend activation url', async () => {
    component.resendActivationUrl = 'resend-activation';
    fixture.detectChanges();

    const reactivation: HTMLLinkElement = fixture.debugElement.query(By.css('#reactivation')).nativeElement;
    reactivation.click();

    await fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/resend-activation');
    });
  });

  it('should redirect to sign up page', async () => {
    component.signupUrl = 'signup';
    fixture.detectChanges();

    const signup: HTMLLinkElement = fixture.debugElement.query(By.css('#signup')).nativeElement;
    signup.click();

    await fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/signup');
    });
  });

  it('should emit false value on form button click', () => {
    component.process = false;
    spyOn(component.submit, 'emit');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
    button.click();

    expect(component.submit.emit).toHaveBeenCalledWith(false);
  });

  it('button should not emmit submit when process is on', () => {
    component.process = true;
    spyOn(component.submit, 'emit');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
    button.click();

    expect(component.submit.emit).toHaveBeenCalledTimes(0);
  });
});
