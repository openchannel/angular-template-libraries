import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'oc-title',
    templateUrl: './oc-title.component.html',
    styleUrls: ['./oc-title.component.scss']
})
export class OcTitleComponent implements OnInit {

    // todo move svg img to the asserts

    _title: string;

    /**
     * title (*required)
     */
    @Input() set title(title: string) {
        if (!title) {
            throw Error('Required @Input : title')
        }
        this._title = title;
    }

    get title() {
        return this._title;
    }

    /**
     * required (optional) - Is the required result data. Show the red marker.
     * Default: false
     */
    @Input() required: boolean = false;

    /**
     * description (optional) - Description for title.
     * Open small modal panel to the right side with this description text.
     */
    @Input() description: string = null;

    /**
     * infoTitleIconCsv (optional) - icon for showing description.
     */
    @Input() infoTitleIconCsv: string = null;
    /**
     * String with class-list which can be
     * added to the existed title class-list
     */
    @Input() customClass: string = '';
    /**
     * Style which can be added to the title
     * Supposed to be the style object
     */
    @Input() customStyle: any;

    constructor() {
    }

    ngOnInit(): void {
    }
}
