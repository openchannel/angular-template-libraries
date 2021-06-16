import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'oc-confirmation-modal',
    templateUrl: './oc-confirmation-modal.component.html',
    styleUrls: ['./oc-confirmation-modal.component.scss'],
})
export class OcConfirmationModalComponent {
    @Input() modalTitle: string;
    @Input() modalText: string;

    @Input() confirmButtonText = 'Ok';
    @Input() confirmButtonType: 'primary' | 'secondary' | 'link' | 'danger' = 'primary';
    @Input() confirmButtonHide: boolean = false;

    @Input() rejectButtonText = 'No, cancel';
    @Input() rejectButtonType: 'primary' | 'secondary' | 'link' | 'danger' = 'secondary';
    @Input() rejectButtonHide: boolean = false;

    private modal: NgbActiveModal;

    constructor(modal: NgbActiveModal) {
        this.modal = modal;
    }


    dismiss(result?: boolean) {
        this.modal.dismiss(result);
    }

    confirm(result?: boolean) {
        this.modal.close(result);
    }
}
