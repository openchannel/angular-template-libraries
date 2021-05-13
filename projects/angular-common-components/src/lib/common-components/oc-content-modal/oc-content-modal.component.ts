import { AfterViewInit, Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'oc-content-modal',
    templateUrl: './oc-content-modal.component.html',
    styleUrls: ['./oc-content-modal.component.scss'],
})
export class OcContentModalComponent implements AfterViewInit {
    @ViewChild('contentModal', { static: false }) contentModal: ElementRef;

    /**
     * modal title at the top of the window (optional).
     */
    @Input() modalTitle: string;

    /**
     * custom content, can contain any type of layout, including text, lists, tables, links etc.
     */
    @Input() customContentTemplate: TemplateRef<any>;

    /**
     * allows to add a 'close' button in the bottom of the modal.
     */
    @Input() closeButton: boolean = false;

    /**
     * allows to change the close icon, adding a new source to it as a string.
     */
    @Input() closeIconSource: string = 'assets/oc-ng-common-component/close-icon.svg';

    hasLongContent: boolean = false;

    constructor(private modal: NgbActiveModal) {}

    ngAfterViewInit(): void {
        if (this.contentModal.nativeElement.offsetHeight > window.innerHeight / 2) {
            this.hasLongContent = true;
        }
    }

    dismiss(): void {
        this.modal.dismiss();
    }
}
