import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcButtonComponent} from './oc-button.component';
import {NgxSpinnerModule} from 'ngx-spinner';

describe('OcButtonComponent', () => {
  let component: OcButtonComponent;
  let fixture: ComponentFixture<OcButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OcButtonComponent],
      imports: [NgxSpinnerModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text value', () => {
    component.text = 'Test button';

    expect(component.text).toEqual('Test button');
  });

  it('should contain type value and exist', async () => {
    component.buttonType = 'secondary';

    const button = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();

    expect(component.buttonType).toEqual('secondary');

    await fixture.whenStable().then(() => {
      expect(button).toBeTruthy();
    });
  });

  it('button should be disabled', async () => {
    component.disabled = true;

    const button = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(button.disabled).toBeTruthy();
    });
  });

  it('should click', async () => {
    component.buttonType = 'secondary';

    const button = fixture.nativeElement.querySelector('button');

    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(component.buttonType).toBe('secondary');
    });
  });
});
