import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcLabelComponent} from './oc-label.component';

describe('OcLabelComponent', () => {
  let component: OcLabelComponent;
  let fixture: ComponentFixture<OcLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcLabelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a text', () => {
    component.text = 'Test label';

    const label = fixture.nativeElement.querySelector('label');
    fixture.detectChanges();

    expect(label.textContent.trim()).toBe('Test label');
  });

  it('should contain a required indicator', async () => {
    component.required = true;

    fixture.detectChanges();
    const required = fixture.nativeElement.querySelector('.required');

    await fixture.whenStable().then(() => {
      expect(required).toBeTruthy();
    });
  });
});
