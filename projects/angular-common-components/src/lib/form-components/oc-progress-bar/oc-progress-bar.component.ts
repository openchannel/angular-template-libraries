import { Component, Input } from '@angular/core';
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
 *                      'defaultDivider': true
 *                  }]"></oc-progress-bar>
 */
@Component({
    selector: 'oc-progress-bar',
    templateUrl: './oc-progress-bar.component.html',
    styleUrls: ['./oc-progress-bar.component.css'],
})
export class OcProgressBarComponent {
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

    getNextStep(currentStep: number): FormProgressbarStep {
        return this.progressbarData[currentStep];
    }
}
