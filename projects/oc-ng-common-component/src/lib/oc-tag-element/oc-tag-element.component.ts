import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'oc-tag-element',
    templateUrl: './oc-tag-element.component.html',
    styleUrls: ['./oc-tag-element.component.scss']
})
export class OcTagElementComponent implements OnInit {

    /**
     * title (optional) - component title.
     */
    @Input() title: string;

    /**
     * closeMarker (optional) - show the SVG icon on the right title side.
     */
    @Input() closeMarker: boolean = false;

    /**
     * deleteTagImgUrl (optional) - path to the SVG icon on the right title side.
     */
    @Input() deleteTagImgUrl: string = '../../assets/img/close-icon.svg';
    /**
     * clickEmitter - return title by click event on this component.
     */
    @Output() clickEmitter = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    sentCurrentTag(): void {
        this.clickEmitter.emit(this.title);
    }
}
