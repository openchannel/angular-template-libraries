import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'oc-text-search',
  templateUrl: './oc-text-search.component.html',
  styleUrls: ['./oc-text-search.component.scss']
})
export class OcTextSearchComponent implements OnInit {

  /** Search text which has been entered by user */
  @Input() searchText: string;
  /** Emit search text on ngModel changes */
  @Output() searchTextChange: EventEmitter<string> = new EventEmitter();
  /** Emit search text on enter key down or search icon click */
  @Output() enterSearch: EventEmitter<string> = new EventEmitter<string>();
  constructor() {
  }

  ngOnInit(): void {
  }

  enterAction(): void {
    this.enterSearch.emit(this.searchText);
  }
}
