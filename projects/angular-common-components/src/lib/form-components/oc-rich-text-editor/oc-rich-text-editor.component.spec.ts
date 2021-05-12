import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcRichTextEditorComponent} from './oc-rich-text-editor.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {FormsModule, NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';

describe('OcRichTextEditorComponent', () => {
  let component: OcRichTextEditorComponent;
  let fixture: ComponentFixture<OcRichTextEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OcRichTextEditorComponent ],
      providers: [NgModel],
      imports: [FormsModule, CommonModule, EditorModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcRichTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
