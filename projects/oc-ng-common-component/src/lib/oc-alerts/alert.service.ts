import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Alert} from './alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertHolder: Subject<Alert> = new Subject<Alert>();

  constructor() { }

  public getObservableChanges(): Observable<Alert> {
    return this.alertHolder.asObservable();
  }

  public showNewAlert(text: string, displayTime?: number): void {
    this.alertHolder.next({text: text, displayTime: displayTime});
  }
}
