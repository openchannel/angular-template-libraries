import {AfterContentInit, Component, Input} from '@angular/core';
import {GalleryItem} from 'oc-ng-common-service';

@Component({
  selector: 'oc-image-gallery',
  templateUrl: './oc-image-gallery.component.html',
  styleUrls: ['./oc-image-gallery.component.scss']
})
export class OcImageGalleryComponent implements AfterContentInit {

  @Input() gallery: GalleryItem[];
  @Input() maxItems = 3;

  constructor() { }

  ngAfterContentInit(): void {
    this.gallery.splice(this.maxItems);
  }

}
