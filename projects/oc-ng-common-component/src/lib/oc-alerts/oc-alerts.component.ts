import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AlertService} from './alert.service';
import {Subscription} from 'rxjs';
import {OcAlertComponent} from '../oc-alert/oc-alert.component';

@Component({
  selector: 'oc-alerts',
  templateUrl: './oc-alerts.component.html',
  styleUrls: ['./oc-alerts.component.scss']
})
export class OcAlertsComponent implements OnInit, OnDestroy {

  @ViewChild('container', {static: true, read: ViewContainerRef}) container: ViewContainerRef;

  private changesSubscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.changesSubscription = this.alertService.getObservableChanges()
      .subscribe(nextAlert => {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(OcAlertComponent);
        const componentRef = this.container.createComponent(componentFactory);
        componentRef.instance.text = nextAlert.text;
        if (nextAlert.displayTime > 0) {
          setTimeout(() => {
            componentRef.destroy();
          }, nextAlert.displayTime);
        } else {
          componentRef.instance.dismissible = true;
          componentRef.instance.closeClick.subscribe(() => componentRef.destroy());
        }
      });
  }

  ngOnDestroy(): void {
    this.changesSubscription.unsubscribe();
  }
}
