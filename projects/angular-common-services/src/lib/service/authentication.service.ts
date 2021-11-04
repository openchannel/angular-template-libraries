import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable, of, throwError } from 'rxjs';
import { LoginRequest, LoginResponse, RefreshTokenRequest } from '../model/api/login.model';
import { AuthHolderService } from './auth-holder.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { OcApiPaths } from '../oc-ng-common-service.module';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { SiteAuthConfig } from '../model/api/market.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(private httpService: HttpRequestService, private authHolderService: AuthHolderService, private apiPaths: OcApiPaths) {}

    initCsrf(): Observable<any> {
        return this.httpService.get(`${this.apiPaths.authorization}/csrf`);
    }

    getAuthConfig(): Observable<SiteAuthConfig> {
        return this.httpService.get(`${this.apiPaths.authorization}/config`);
    }

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.httpService.post(`${this.apiPaths.authorization}/external/token`, request);
    }

    /**
     * Endpoint to exchange code from auth server for LoginResponse
     * @param code from auth server
     * @param redirectUri uri that initiated login procedure
     */
    verifyCode(code: string, redirectUri: string): Observable<LoginResponse> {
        const params = new OcHttpParams().append('code', code).append('redirectUri', redirectUri);

        return this.httpService.post(`${this.apiPaths.authorization}/external/verify`, {}, { params });
    }

    refreshToken(request: RefreshTokenRequest, headers: HttpHeaders = new HttpHeaders()): Observable<LoginResponse> {
        return this.httpService.post(`${this.apiPaths.authorization}/refresh`, request, { headers });
    }

    logOut(): Observable<void> {
        const requestBody = {
            accessToken: this.authHolderService.accessToken,
            refreshToken: this.authHolderService.refreshToken,
        };
        return this.httpService.post(`${this.apiPaths.authorization}/logout`, requestBody);
    }

    refreshTokenSilent(): Observable<any> {
        return this.refreshToken({ refreshToken: this.authHolderService.refreshToken }, new HttpHeaders({ 'x-handle-error': '401' })).pipe(
            tap((response: LoginResponse) => this.authHolderService.persist(response.accessToken, response.refreshToken)),
            catchError(err => {
                this.authHolderService.clearTokensInStorage();
                return throwError(err);
            }),
        );
    }

    tryLoginByRefreshToken(): Observable<boolean> {
        return of(this.authHolderService.isLoggedInUser()).pipe(
            mergeMap((isLogged: boolean) => {
                if (isLogged) {
                    return of(isLogged);
                } else if (!this.authHolderService.refreshToken) {
                    return of(false);
                } else {
                    return this.refreshTokenSilent().pipe(
                        map(() => this.authHolderService.isLoggedInUser()),
                        catchError(() => of(false)),
                    );
                }
            }),
        );
    }
}
