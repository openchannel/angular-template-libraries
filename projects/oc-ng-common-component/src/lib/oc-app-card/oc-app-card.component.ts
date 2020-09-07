import {Component, Input, OnInit} from '@angular/core';
import {BasicAppDetails} from 'oc-ng-common-service';

@Component({
  selector: 'oc-app-card',
  templateUrl: './oc-app-card.component.html',
  styleUrls: ['./oc-app-card.component.scss']
})
export class OcAppCardComponent implements OnInit {

  @Input() app: BasicAppDetails = new BasicAppDetails();

  constructor() {
  }

  ngOnInit(): void {
  }

}
