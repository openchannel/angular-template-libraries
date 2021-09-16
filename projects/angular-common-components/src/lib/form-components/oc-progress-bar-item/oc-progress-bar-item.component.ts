import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormProgressbarStep } from '../model/progress-bar-item.model';

@Component({
    selector: 'oc-progress-bar-item',
    templateUrl: './oc-progress-bar-item.component.html',
    styleUrls: ['./oc-progress-bar-item.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcProgressBarItemComponent),
            multi: true,
        },
    ],
})
export class OcProgressBarItemComponent {
    @Input() step: FormProgressbarStep;
    @Input() stepNumber: number;
    @Input() stepsLength: number;
    @Input() currentStep: number;
}
