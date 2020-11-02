import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDropboxComponent } from './oc-dropbox.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

describe('OcDropboxComponent', () => {
  let component: OcDropboxComponent;
  let fixture: ComponentFixture<OcDropboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcDropboxComponent ],
      imports: [NgbModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDropboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain selected value', () => {
    component.items = ['selected item1', 'selected item2'];
    component.writeValue('selected item2');
    expect(component.outputSelectedItem).toEqual('selected item2');
  });

  it('should show selected value', async () => {
    component.items = ['selected item1', 'selected item2'];
    component.writeValue('selected item2');

    fixture.detectChanges();

    const dropbox = fixture.nativeElement.querySelector('input');

    await fixture.whenStable().then(() => {
      expect(component.outputSelectedItem).toEqual('selected item2');
      expect(dropbox.value).toContain('selected item2');
    });
  });

  it('should contain a placeholder', () => {
    component.placeHolder = 'Test placeholder';
    fixture.detectChanges();

    const dropbox = fixture.nativeElement.querySelector('input');

    expect(dropbox.placeholder).toEqual('Test placeholder');
  });

  it('should change selected value', async () => {
    component.items = ['selected item1', 'selected item2'];
    component.writeValue('selected item2');

    const dropbox = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();

    dropbox.click();
    fixture.detectChanges();

    const selectedButton = fixture.nativeElement.querySelectorAll('button')[0];
    selectedButton.click();

    await fixture.whenStable().then(() => {
      expect(component.outputSelectedItem).toEqual('selected item1');
      expect(dropbox.value).toContain('selected item1');
    });
  });

  it('should be disabled', async () => {
    component.setDisabledState(true);

    const dropbox = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(dropbox.disabled).toBeTruthy();
    });
  });

  it('should call onChange with value', async () => {
    const onChangeFunc = jest.fn();
    component.registerOnChange(onChangeFunc);

    component.items = ['selected item1', 'selected item2'];
    component.writeValue('selected item2');

    const dropbox = fixture.nativeElement.querySelector('input');
    dropbox.click();
    fixture.detectChanges();

    const selectedButton = fixture.nativeElement.querySelectorAll('button')[0];
    selectedButton.click();

    expect(onChangeFunc).toHaveBeenCalled();
    expect(onChangeFunc.mock.calls[0][0]).toBe('selected item1');
  });

  it('should call onTouch', async () => {
    const onTouchedFunc = jest.fn();
    component.registerOnTouched(onTouchedFunc);

    component.items = ['selected item1', 'selected item2'];

    const dropbox = fixture.nativeElement.querySelector('input');
    dropbox.dispatchEvent(new Event('focus'));

    expect(onTouchedFunc).toHaveBeenCalled();
  });

  it('should emit value', () => {
    component.items = ['selected item1', 'selected item2'];

    spyOn(component.selectedItem, 'emit');

    const dropbox = fixture.nativeElement.querySelector('input');
    dropbox.click();
    fixture.detectChanges();

    const selectedButton = fixture.nativeElement.querySelectorAll('button')[0];
    selectedButton.click();

    expect(component.selectedItem.emit).toHaveBeenCalledWith('selected item1');
  });

  it('should filter values', () => {
    component.clearFormAfterSelect = true;
    component.items = ['selected1', 'selected2', 'selected3', 'other'];

    const dropbox = fixture.nativeElement.querySelector('input');
    dropbox.value = 'oth';
    dropbox.click();
    fixture.detectChanges();

    const selectedButton = fixture.nativeElement.querySelectorAll('button')[0];

    expect(selectedButton.textContent).toContain('other');
  });
});
