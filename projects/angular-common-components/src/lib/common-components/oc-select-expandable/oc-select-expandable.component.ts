import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectModel } from '../model/components-basic.model';

@Component({
    selector: 'oc-select-expandable',
    templateUrl: './oc-select-expandable.component.html',
    styleUrls: ['./oc-select-expandable.component.css'],
})
export class OcSelectExpandableComponent implements OnInit {
    /**
     * Text of the select-expandable heading.
     * @type {string}.
     */
    @Input() title: string;

    /**
     * Select-expandable config, contains labels and `checked` states of select options.
     * @type {SelectModel[]}.
     */
    @Input() selectModels: SelectModel[];

    /**
     * Initial select collapse state.
     * @type {boolean}.
     * @default true.
     */
    @Input() collapsedOnInit: boolean = true;

    /**
     * Current select collapse state.
     * @type {boolean}.
     * @default true.
     */
    @Input() isCollapsed: boolean = true;

    /**
     * Source path to expanded svg icon.
     * @type {boolean}.
     * @default select-up.svg
     */
    @Input() expandedIcon: string = 'assets/angular-common-components/select-up.svg';

    /**
     * Source path to collapsed svg icon.
     * @type {boolean}.
     * @default down-arrow.svg
     */
    @Input() collapsedIcon: string = 'assets/angular-common-components/down-arrow.svg';

    /**
     * Emits select model changes and passes to a parent component.
     */
    @Output() readonly selectModelsChange: EventEmitter<SelectModel[]> = new EventEmitter<SelectModel[]>();

    ngOnInit(): void {
        this.isCollapsed = this.collapsedOnInit;
    }

    /**
     * This method runs on select options change.
     * Uses selectModelsChange to emit select model value.
     */
    onChange(): void {
        this.selectModelsChange.emit(this.selectModels);
    }
}
