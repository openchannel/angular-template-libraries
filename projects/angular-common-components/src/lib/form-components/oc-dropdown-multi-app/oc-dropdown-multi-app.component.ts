import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { remove, isString } from 'lodash';
import { AppsSearchService } from '../model/dropdown-multi-app.model';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'oc-dropdown-multi-app',
    templateUrl: './oc-dropdown-multi-app.component.html',
    styleUrls: ['./oc-dropdown-multi-app.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcDropdownMultiAppComponent),
            multi: true,
        },
    ],
})
export class OcDropdownMultiAppComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() dropdownPlaceholder: string = '';
    @Input() dropdownClearTextAfterSelect: boolean = true;

    @Input() dropdownCustomDropdownItemTemplateRef: TemplateRef<any>;
    @Input() dropdownCustomTagTemplateRef: TemplateRef<any>;

    @Input() defaultAppIDs: string[] = [];

    @Input() itemPreviewName: string = 'App Name :';
    @Input() itemPreviewId: string = 'Id :';
    @Input() itemPreviewVersion: string = 'Version :';

    @Input() tagTooltipLabelText: string = '';

    @Input() set value(value: string[] | any) {
        this.loadAppsByIDsAndPutToResultArray(this.selectAppIDs(value)).subscribe(() => this.updateOutputData());
    }

    @Output() readonly selectedAppsOutput: EventEmitter<FullAppData[]> = new EventEmitter<FullAppData[]>();

    resultApps: FullAppData[] = [];

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private appSearchService: AppsSearchService) {}

    appsSearchFn = (text$: Observable<string>) =>
        text$.pipe(
            switchMap(text => this.appSearchService.appsSearch(this.resultApps, text)),
            takeUntil(this.destroy$),
        );

    ngOnInit(): void {
        this.loadAppsByIDsAndPutToResultArray(this.defaultAppIDs).subscribe(() => this.updateOutputData());
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    addAppToResultArray(appResponse: FullAppData | any): void {
        if (!this.resultApps.find(resultApp => resultApp.appId === appResponse.appId)) {
            this.resultApps.push(appResponse);
            this.updateOutputData();
        }
    }

    removeAppFromResultArray(appResponse: FullAppData): void {
        remove(this.resultApps, app => app?.appId === appResponse.appId);
        this.updateOutputData();
    }

    registerOnChange(onChange: (value: any) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    setDisabledState(isDisabled: boolean): void {}

    writeValue(value: any): void {
        this.loadAppsByIDsAndPutToResultArray(this.selectAppIDs(value)).subscribe();
    }

    onTouched = () => {};

    private loadAppsByIDsAndPutToResultArray(appIdArray: string[]): Observable<FullAppData[]> {
        if (appIdArray?.length > 0) {
            return this.appSearchService.loadDefaultApps(appIdArray).pipe(
                takeUntil(this.destroy$),
                tap(apps => apps.forEach(app => this.addAppToResultArray(app))),
            );
        } else {
            return of([]);
        }
    }

    private updateOutputData(): void {
        this.selectedAppsOutput.emit(this.resultApps);
        this.onChange(this.resultApps.map(app => app.appId));
    }

    private selectAppIDs(data: any): string[] {
        return Array.isArray(data) ? (data as []).filter(isString) : [];
    }

    private onChange: (value: any) => void = () => {};
}
