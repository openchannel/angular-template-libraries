import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcTagsComponent} from './oc-tags.component';
import {OcTitleComponent} from '../oc-title/oc-title.component';
import {OcErrorComponent} from '../oc-error/oc-error.component';
import {OcDropboxComponent} from '../oc-dropbox/oc-dropbox.component';
import {OcTagElementComponent} from '../oc-tag-element/oc-tag-element.component';
import {OcInputComponent} from '../oc-input/oc-input.component';
import {OcButtonComponent} from '../oc-button/oc-button.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {By} from '@angular/platform-browser';

describe('OcTagsComponent', () => {
  let component: OcTagsComponent;
  let fixture: ComponentFixture<OcTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcTagsComponent, OcTitleComponent, OcInputComponent,
        OcButtonComponent, OcTagElementComponent, OcDropboxComponent, OcErrorComponent],
      imports: [FormsModule, NgbModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcTagsComponent);
    component = fixture.componentInstance;
    component.title = 'Tags Title';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add tag by input field', () => {

    fixture.detectChanges();
    expect(component?.resultTags?.length).toEqual(0);
    doAddTag('new-tag');
    expect(component?.resultTags?.length).toEqual(1);
  });

  it('remove tag', async () => {

    doAddTag('new-tag');
    doAddTag('new-tag-2');

    doRemoveTag('new-tag');

    await fixture.whenStable().then(() => {
      expect(component?.resultTags?.length).toEqual(1);
    });
  });

  it('add duplicates', async () => {

    doAddTag('new-tag');
    doAddTag('new-tag');
    doAddTag('NEW-TAG');
    doAddTag('        NEW-TAG       ');

    await fixture.whenStable().then(() => {
      expect(component?.resultTags?.length).toEqual(1);
    });
  });

  it('default tags', async () => {

    component.defaultTags = ['new-tag', 'new-tag-2', 'new-tag-3'];
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(component?.resultTags?.length).toEqual(3);
    });
  });

  it('write value', async () => {
    component.writeValue(['new-tag', 'new-tag-2', 'new-tag-3']);
    await fixture.whenStable().then(() => {
      expect(component?.resultTags?.length).toEqual(3);
    });
  })

  it('write null value', async () => {
    component.writeValue(null);
    await fixture.whenStable().then(() => {
      expect(component?.resultTags?.length).toEqual(0);
    });
  })

  it('write number values', async () => {
    component.tagsType = 'number';
    component.writeValue(['321', '293', '324']);
    await fixture.whenStable().then(() => {
      expect(component?.resultTags?.length).toEqual(3);
    });
  })

  it('max tag count validation', () => {

    expect(hasOcError()).toBeFalsy();
    component.maxTagsCount = 1;
    fixture.detectChanges();

    doAddTag('new-tag');
    doAddTag('new-tag-2');

    expect(hasOcError()).toBeTruthy()
  });

  it('min tag count validation', () => {

    expect(hasOcError()).toBeFalsy();
    component.minTagsCount = 2;
    fixture.detectChanges();

    doAddTag('new-tag');

    expect(hasOcError()).toBeTruthy()
  });

  it('boolean tag type', () => {

    component.tagsType = 'boolean';

    doAddTag('not-boolean');
    expect(component?.resultTags?.length).toEqual(0);

    doAddTag('true');
    expect(component?.resultTags?.length).toEqual(1);

    doAddTag('false');
    expect(component?.resultTags?.length).toEqual(2);
  });

  it('number tag type', () => {

    component.tagsType = 'number';

    doAddTag('not-number');
    expect(component?.resultTags?.length).toEqual(0);

    doAddTag('323');
    expect(component?.resultTags?.length).toEqual(1);

    doAddTag('234');
    expect(component?.resultTags?.length).toEqual(2);
  });

  function doWriteTextToField(text: string): void {
    const ocInputTag = fixture.nativeElement.querySelector('oc-input');
    const input = ocInputTag.querySelector('input');
    input.value = text;
    input.dispatchEvent(new Event('input'));
  }

  function doClickByAddButton(): void {
    const ocButtonTag = fixture.nativeElement.querySelector('oc-button');
    ocButtonTag.click();
    fixture.detectChanges();
  }

  function doAddTag(tagTitle: string) {
    doWriteTextToField(tagTitle)
    doClickByAddButton();
  }

  function doRemoveTag(tagTitle: string): void {
    const rawTags: any [] = fixture.debugElement.queryAll(By.directive(OcTagElementComponent));
    const tags: OcTagElementComponent [] = rawTags ? rawTags.map(tag => tag.componentInstance) : [];
    const currentTag = tags.filter(tag => tagTitle === tag.title)[0];
    if (currentTag) {
      currentTag.sentCurrentTag();
    }
  }

  function hasOcError(): boolean {
    return !!fixture.debugElement.query(By.css('oc-error'));
  }
});
