import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Confirmation modal window. It is used for the confirmation some action from the user.
 * Component represents header with text, description text (for example, it can be clarifying question),
 * confirmation button and cancel button.
 *
 * For usage you need [NgbModal]{@link https://ng-bootstrap.github.io/#/components/modal/api#NgbModal} instance.
 * Call method `open()` of this instance with current component as first parameter.
 * All of the component settings can be set through `componentInstance`.
 *
 * @example
 * export class ExampleComponent {
 *  // creating variable of NgbModal instance
 *  modal: NgbModal;
 *
 *  callModal(): void {
 *   // opening a modal window with the specified content and supplied options.
 *   const modalRef = this.modal.open(AppConfirmationModalComponent, { size: 'md' });
 *   modalRef.componentInstance.modalTitle = 'Submit app';
 *   modalRef.componentInstance.modalText = 'Submit this app to the marketplace now?';
 *   modalRef.componentInstance.confirmButtonText = 'Yes, submit it';
 *   modalRef.componentInstance.cancelButtonText = 'No, cancel';
 *
 *   // getting modal data through the promise
 *   modalRef.result.then(
 *    modalRes => {
 *     // do something with modalRes
 *   });
 *  }
 * }
 */
@Component({
    selector: 'oc-confirmation-modal',
    templateUrl: './oc-confirmation-modal.component.html',
    styleUrls: ['./oc-confirmation-modal.component.scss'],
})
export class OcConfirmationModalComponent {
    /**
     * Header text of the modal window.
     */
    @Input() modalTitle: string = '';
    /**
     * Main text of the modal. It can be clarifying question or explanation text.
     */
    @Input() modalText: string = '';
    /**
     * Text of the confirmation button.
     */
    @Input() confirmButtonText: string = 'Ok';
    /**
     * Type of the confirmation button. This type will apply a special button style.
     * For example, `primary` type apply main button style, `danger` - style of the danger/warning button.
     */
    @Input() confirmButtonType: 'primary' | 'secondary' | 'link' | 'danger' = 'primary';
    /**
     * Displaying confirmation button. `true` - will hide the button.
     *
     * Button displaying by default.
     */
    @Input() confirmButtonHide: boolean = false;
    /**
     * Text of rejection button.
     */
    @Input() rejectButtonText = 'No, cancel';
    /**
     * Type of the rejection button. This type will apply a special button style.
     * For example, `primary` type apply main button style, `danger` - style of the danger/warning button.
     */
    @Input() rejectButtonType: 'primary' | 'secondary' | 'link' | 'danger' = 'secondary';
    /**
     * Displaying rejection button. `true` - will hide the button.
     *
     * Button displaying by default.
     */
    @Input() rejectButtonHide: boolean = false;
    /**
     * Control of the current modal actions.
     * @private
     */
    private modal: NgbActiveModal;

    constructor(modal: NgbActiveModal) {
        this.modal = modal;
    }
    /**
     * Function for cancel. Triggers when user press cancel button or close the modal.
     * @param result optional parameter for result from cancel button
     */
    dismiss(result?: boolean): void {
        this.modal.dismiss(result);
    }

    /**
     * Function for confirmation. Triggers when user press confirm button.
     * @param result optional parameter for result from confirmation button
     */
    confirm(result?: boolean): void {
        this.modal.close(result);
    }
}
