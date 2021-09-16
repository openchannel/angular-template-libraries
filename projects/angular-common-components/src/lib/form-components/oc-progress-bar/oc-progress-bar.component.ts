import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormProgressbarStep } from '../model/progress-bar-item.model';

@Component({
    selector: 'oc-progress-bar',
    templateUrl: './oc-progress-bar.component.html',
    styleUrls: ['./oc-progress-bar.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcProgressBarComponent),
            multi: true,
        },
    ],
})
export class OcProgressBarComponent {
    @Input() progressbarData: FormProgressbarStep[] = [];
    @Input() currentStep: number = 1;
}
