import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcButtonComponent} from './oc-button.component';

describe('OcButtonComponent', () => {
  let component: OcButtonComponent;
  let fixture: ComponentFixture<OcButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcButtonComponent]
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
    component.type = 'secondary';

    const button = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();

    expect(component.type).toEqual('secondary');

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
});
