import { Injectable } from '@angular/core';
import { AbstractControl, NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { OnNewErrorsEvent, OnRemoveErrorEvent, ServerErrorModel } from '../model/oc-error.model';
import { remove } from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class OcErrorService {
    serverErrorList: ServerErrorModel[] = [];

    readonly serverErrorEvent = new Subject<OnNewErrorsEvent | OnRemoveErrorEvent>();

    setServerErrorList(messages: any): void {
        this.serverErrorList = messages;
        this.serverErrorEvent.next({
            type: 'onNewErrors',
            value: this.serverErrorList,
        });
    }

    clearError(error: any): void {
        const removedItems = remove(this.serverErrorList, item => item.field === error.field);
        if (removedItems.length > 0) {
            this.serverErrorEvent.next({
                type: 'onRemovedError',
                value: removedItems,
            });
        }
    }

    hasServerError(control: NgModel | AbstractControl, errorCode: string): boolean {
        return control?.errors?.serverErrorValidator?.code === errorCode;
    }
}
