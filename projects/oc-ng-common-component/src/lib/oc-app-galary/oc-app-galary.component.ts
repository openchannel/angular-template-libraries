import {Component, Input, OnInit} from '@angular/core';
import {BasicAppDetails} from 'oc-ng-common-service';

@Component({
  selector: 'oc-app-galary',
  templateUrl: './oc-app-galary.component.html',
  styleUrls: ['./oc-app-galary.component.scss']
})
export class OcAppGalaryComponent implements OnInit {

  @Input() appsArr: BasicAppDetails[] = [];

  @Input() noAppMessage: string = '';

  @Input() seeAllUrl: string;

  @Input() appGalaryTitle: string;

  @Input() appGalaryDescription: string;


  constructor() {
  }

  ngOnInit(): void {
  }

}
