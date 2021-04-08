import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {OcAppCategoriesComponent} from './oc-app-categories/oc-app-categories.component';

@NgModule({
  declarations: [
      OcAppCategoriesComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    AngularSvgIconModule.forRoot(),
  ],
  exports: [
      OcAppCategoriesComponent,
  ]
})
export class OcAppCategoriesModule { }
