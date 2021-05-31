import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'oc-app-get-started',
    templateUrl: './oc-app-get-started.component.html',
    styleUrls: ['./oc-app-get-started.component.scss'],
})
export class OcAppGetStartedComponent {
    /** Path to the main image of the component */
    @Input() getStartedImage: string = 'assets/angular-common-components/get-started.svg';
    /**
     * Main title of the component.
     * @default: 'List Your App in our App Store'
     */
    @Input() getStartedHeader: string = 'List Your App in our App Store';
    /**
     * Main text of the component. Placed under title
     *
     * Default: empty string
     */
    @Input() getStartedDescription: string = '';
    /**
     * Main text of the component. Placed under title
     *
     * Default: empty string
     */
    @Input() getStartedButtonText: string = '';
    /**
     * Get Started component type.
     *
     * 'home' type represents button, image and description.
     *
     * 'search' type represents title and button.
     * @default 'home'
     */
    @Input() getStartedType: 'home' | 'search' = 'home';
    /**
     * Emmit click on the button of the component.
     *
     * Returns: {void}
     */
    @Output() readonly getStarted: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}
    /**
     * This function triggers by click on the component's button and emmit info that the button was pressed
     */
    listAppGetStarted(): void {
        this.getStarted.emit();
    }
}
