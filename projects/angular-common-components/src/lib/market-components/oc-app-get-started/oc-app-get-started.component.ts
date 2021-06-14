import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'oc-app-get-started',
    templateUrl: './oc-app-get-started.component.html',
    styleUrls: ['./oc-app-get-started.component.scss'],
})
export class OcAppGetStartedComponent {
    @Input() getStartedImage: string = 'assets/angular-common-components/get-started.svg';

    @Input() getStartedHeader: string = 'List Your App in our App Store';

    @Input() getStartedDescription: string = '';

    @Input() getStartedButtonText: string = '';

    @Output() getStarted = new EventEmitter<any>();

    @Input() getStartedType: 'home' | 'search' = 'home';

    listAppGetStarted(): void {
        this.getStarted.emit();
    }
}
