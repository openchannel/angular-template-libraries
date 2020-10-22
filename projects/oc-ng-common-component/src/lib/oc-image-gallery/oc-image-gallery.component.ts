import {Component, Input, OnInit} from '@angular/core';
import {GalleryItem} from 'oc-ng-common-service';

@Component({
  selector: 'oc-image-gallery',
  templateUrl: './oc-image-gallery.component.html',
  styleUrls: ['./oc-image-gallery.component.scss']
})
export class OcImageGalleryComponent implements OnInit {

  @Input() gallery: GalleryItem[];
  @Input() maxItems = 3;

  constructor() { }

  ngOnInit(): void {
  }

}
