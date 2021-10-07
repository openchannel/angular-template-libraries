import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ViewChildren,
} from '@angular/core';
import { FormProgressbarStep } from '../model/progress-bar-item.model';

/**
 * Component is a visual progressbar which indicates a current form step a user is on.
 * It also shows steps validation.
 * It is used only in forms which have field groups and are rendered as steps.
 * @example
 * <oc-progress-bar *ngIf="showProgressBar"
 *                  [currentStep]=1
 *                  [progressbarData]="[{
 *                      'title': 'Some step title',
 *                      'state': 'pristine',
 *                  }]"></oc-progress-bar>
 */
@Component({
    selector: 'oc-progress-bar',
    templateUrl: './oc-progress-bar.component.html',
    styleUrls: ['./oc-progress-bar.component.css'],
})
export class OcProgressBarComponent implements AfterViewInit, OnChanges {
    @ViewChildren('progressBarSteps') progressBarSteps: QueryList<ElementRef>;

    /**
     * Set progressbar data as objects array.
     * It contains properties and states of each form step.
     * @default: []
     */
    @Input() progressbarData: FormProgressbarStep[] = [];

    /**
     * Gets a current form step of a form.
     * @default: 1
     */
    @Input() currentStep: number = 1;

    /**
     * You can set the number of steps to show.
     * If set to 0, this option is turned off and all the steps will be visible.
     * @default: 0
     */
    @Input() maxStepsToShow: number = 5;

    /**
     * You can enable/disable text truncation for step titles.
     * @default: true
     */
    @Input() enableTextTruncate: boolean = false;

    @Output() readonly jumpToStep = new EventEmitter<number>();

    staticOffsetValue: number;
    currentOffsetValue: number;

    ngAfterViewInit(): void {
        this.staticOffsetValue = this.progressBarSteps.first.nativeElement.offsetWidth;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const currentStep = changes.currentStep.currentValue;
        if (currentStep <= Math.ceil(this.maxStepsToShow / 2)) {
            this.currentOffsetValue = 0;
        } else if (currentStep > this.progressbarData.length - Math.floor(this.maxStepsToShow / 2)) {
            this.currentOffsetValue = (this.staticOffsetValue * (this.progressbarData.length - this.maxStepsToShow - 1) + 80) * -1;
        } else {
            if (currentStep - (this.progressbarData.length - Math.floor(this.maxStepsToShow / 2)) === 0) {
                this.currentOffsetValue = (this.staticOffsetValue * (currentStep - Math.ceil(this.maxStepsToShow / 2) - 1) + 80) * -1;
            } else {
                this.currentOffsetValue = this.staticOffsetValue * (currentStep - Math.ceil(this.maxStepsToShow / 2)) * -1;
            }
        }
    }

    getNextStep(currentStep: number): FormProgressbarStep {
        return this.progressbarData[currentStep];
    }

    stepClicked(step: number): void {
        this.jumpToStep.emit(step);
    }
}
