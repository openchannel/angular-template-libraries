import {
    AbstractControl,
    AbstractControlDirective,
    FormArray,
    FormGroup,
    NgModel
} from '@angular/forms';

export function replaceHTMLTags(text: string): string {
    if (text && text.match(/<[^>]*>/g)) {
        const tmp = document.createElement('div');
        tmp.innerHTML = text;
        return tmp.textContent || tmp.innerText || '';
    }
    return text;
}

export class ControlUtils {

    public static getFullControlPath(control: AbstractControlDirective | AbstractControl | NgModel): string {
        if (!control) {
            return '';
        } else if (control instanceof NgModel || control instanceof AbstractControlDirective) {
            return (control.path || []).join('.');
        } else {
            return this.getFullControlPathByAbstractControl(control, '');
        }
    }

    private static getFullControlPathByAbstractControl(control: AbstractControl, childPath: string): string {
        const parent = control?.parent;
        if (parent) {
            if (parent instanceof FormArray) {
                const { controls } = parent;
                const controlName = Object.keys(controls).find(name => control === controls[name]) || null;
                childPath = this.getFullControlPathByAbstractControl(parent, `[${controlName}].${childPath}`);
            } else if (parent instanceof FormGroup) {
                const { controls } = parent;
                const controlName = Object.keys(controls).find(name => control === controls[name]) || null;
                if(!childPath) {
                    childPath = this.getFullControlPathByAbstractControl(parent, controlName);
                } else {
                    childPath = this.getFullControlPathByAbstractControl(
                        parent, `${controlName}${childPath[0] === '[' ? childPath : `.${childPath}`}`);
                }
            }
        }
        return childPath;
    }

}
