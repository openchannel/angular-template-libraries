import { AbstractControl, AbstractControlDirective, FormArray, FormGroup, NgModel } from '@angular/forms';

export function replaceHTMLTags(text: string): string {
    if (text && text.match(/<[^>]*>/g)) {
        const tmp = document.createElement('div');
        tmp.innerHTML = text;
        return tmp.textContent || tmp.innerText || '';
    }
    return text;
}

export class ControlUtils {
    static getFullControlPath(control: AbstractControlDirective | AbstractControl | NgModel): string {
        if (!control) {
            return '';
        } else if (control instanceof NgModel || control instanceof AbstractControlDirective) {
            return (control.path || []).join('.');
        } else {
            return this.getFullControlPathByAbstractControl(control, '');
        }
    }

    private static getFullControlPathByAbstractControl(childControl: AbstractControl, childPath: string): string {
        const parentControl = childControl?.parent;
        if (parentControl) {
            if (parentControl instanceof FormArray) {
                const controlName = this.getControlName(parentControl, childControl);
                return this.getFullControlPathByAbstractControl(parentControl, `[${controlName}].${childPath}`);
            } else if (parentControl instanceof FormGroup) {
                const controlName = this.getControlName(parentControl, childControl);
                if (!childPath) {
                    return this.getFullControlPathByAbstractControl(parentControl, controlName);
                } else {
                    const childPathWithSeparator = childPath[0] === '[' ? childPath : `.${childPath}`;
                    return this.getFullControlPathByAbstractControl(parentControl, `${controlName}${childPathWithSeparator}`);
                }
            }
        }
        return childPath;
    }

    private static getControlName(parentControl: FormArray | FormGroup, childControl: AbstractControl): string {
        const { controls } = parentControl;
        return Object.keys(controls).find(name => childControl === controls[name]) || null;
    }
}
