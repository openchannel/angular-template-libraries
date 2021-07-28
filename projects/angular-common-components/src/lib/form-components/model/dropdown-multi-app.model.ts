import { Observable } from 'rxjs';
import { FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';

export abstract class AppsSearchService {
    abstract loadDefaultApps(existsAppIDs: string[]): Observable<FullAppData[]>;
    abstract appsSearch(existsAppIDs: FullAppData[], searchText: string): Observable<FullAppData[]>;
}
