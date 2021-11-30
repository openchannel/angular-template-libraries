import { OcButtonType } from '../model/components-basic.model';

export interface ConfirmationModalButton {
    /**
     * Will return as modal result.
     */
    id: string;
    /**
     * Type for creating button.
     */
    type: OcButtonType;
    /**
     * Button text.
     */
    text: string;
}
