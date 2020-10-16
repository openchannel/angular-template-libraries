import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'oc-text-search',
  templateUrl: './oc-text-search.component.html',
  styleUrls: ['./oc-text-search.component.scss']
})
export class OcTextSearchComponent implements OnInit {

  @Input() searchText: string;
  @Output() searchTextChange: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
