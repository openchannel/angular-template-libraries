import { OcButtonType } from '../model/components-basic.model';

export interface ConfirmationModalButton {
    /**
     * When a user clicks on this button, the ID will return as the modal result.
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
