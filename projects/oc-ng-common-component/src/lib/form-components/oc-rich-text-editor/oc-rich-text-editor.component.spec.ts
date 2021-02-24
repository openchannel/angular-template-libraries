import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcRichTextEditorComponent } from './oc-rich-text-editor.component';

describe('OcRichTextEditorComponent', () => {
  let component: OcRichTextEditorComponent;
  let fixture: ComponentFixture<OcRichTextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcRichTextEditorComponent ]
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
