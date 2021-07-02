import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { remove } from 'lodash';
import { AppsSearchService } from '../model/dropdown-multi-app.model';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'oc-dropdown-multi-app',
    templateUrl: './oc-dropdown-multi-app.component.html',
    styleUrls: ['./oc-dropdown-multi-app.component.scss'],
})
export class OcDropdownMultiAppComponent implements OnInit, OnDestroy {
    @Input() dropdownPlaceholder: string = '';
    @Input() dropdownClearTextAfterSelect: boolean = true;

    @Input() dropdownCustomDropdownItemTemplateRef: TemplateRef<any>;
    @Input() dropdownCustomTagTemplateRef: TemplateRef<any>;

    @Input() defaultAppIDs: string[] = [];

    @Input() itemPreviewName: string = 'App Name :';
    @Input() itemPreviewId: string = 'Id :';
    @Input() itemPreviewVersion: string = 'Version :';

    resultApps: FullAppData[] = [];

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private appSearchService: AppsSearchService) {
    }

    appsSearchFn = (text$: Observable<string>) =>
        text$.pipe(
            switchMap(text => this.appSearchService.appsSearch(this.resultApps, text)),
            takeUntil(this.destroy$),
        );

    ngOnInit(): void {
        this.loadDefaultApps();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    addAppToResultArray(appResponse: FullAppData | any): void {
        if (!this.resultApps.find(resultApp => resultApp.appId === appResponse.appId)) {
            this.resultApps.push(appResponse);
        }
    }

    removeAppFromResultArray(appResponse: FullAppData): void {
        remove(this.resultApps, app => app?.appId === appResponse.appId);
    }

    loadDefaultApps(): void {
        if (this.defaultAppIDs?.length > 0) {
            this.appSearchService
                .loadDefaultApps(this.defaultAppIDs)
                .pipe(
                    takeUntil(this.destroy$),
                    tap(apps => apps.forEach(app => this.addAppToResultArray(app))),
                )
                .subscribe();
        }
    }
}
