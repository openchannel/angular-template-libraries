import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'oc-form',
  templateUrl: './oc-form.component.html',
  styleUrls: ['./oc-form.component.scss']
})
export class OcFormComponent implements OnInit {

  public customForm: FormGroup;
  public formData: any;
  public arrForSelect: string[] = ['iOS', 'Android', 'Oxygen OS', 'Blackberry'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customForm = this.fb.group({
      richText: ['', Validators.required],
      input: ['', Validators.required],
      select: ['iOS'],
      tags: ['']
    });
  }

  showData(): void {
    this.formData = this.customForm.getRawValue();
  }
}
