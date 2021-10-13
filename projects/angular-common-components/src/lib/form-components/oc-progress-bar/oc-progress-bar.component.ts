import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges, OnInit,
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
export class OcProgressBarComponent implements OnInit, AfterViewInit, OnChanges {
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
     * Default value is passed from parent form component.
     * @default: 0
     */
    @Input() maxStepsToShow: number;

    /**
     * You can enable/disable text truncation for step titles.
     * @default: true
     */
    @Input() enableTextTruncate: boolean = true;

    /**
     * When a user clicks on a specific step, it emits step value to a form component.
     */
    @Output() readonly jumpToStep = new EventEmitter<number>();

    staticOffsetValue: number;
    currentOffsetValue: number;
    showSteps: number;

    /**
     * A listener that sets a static offset value for progressbar on window resize.
     * On responsive view shows no more than three steps.
     */
    @HostListener('window:resize', ['$event']) onResize(event: any): void {
        this.maxStepsToShow = event.target.innerWidth <= 768 ? 3 : this.showSteps;
        this.getStaticOffsetValue();
    }

    ngOnInit(): void {
        this.showSteps = this.maxStepsToShow;
        if (window.innerWidth <= 768) {
            this.maxStepsToShow = 3;
        }
    }

    ngAfterViewInit(): void {
        this.getStaticOffsetValue();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.getCurrentOffsetValue(changes);
    }

    /**
     * Sets a static offset value for progressbar.
     */
    getStaticOffsetValue(): void {
        this.staticOffsetValue = this.progressBarSteps.first.nativeElement.offsetWidth;
    }

    /**
     * Fired by onChanges, it is used to calculate progressBar slide effect offset when going out of its width.
     * Math rounds are used to ceil and to floor depending on current step position and MaxStepsToShow value.
     * 80 is a static width value of the last step, it cannot be changed.
     */
    getCurrentOffsetValue(changes: SimpleChanges): void {
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

    /**
     * Returns index of an element in progressbarData array.
     * Needed for showing progress line style.
     */
    getNextStep(currentStep: number): FormProgressbarStep {
        return this.progressbarData[currentStep];
    }

    /**
     * Emits step click event to a form component.
     */
    stepClicked(step: number): void {
        this.jumpToStep.emit(step);
    }
}
