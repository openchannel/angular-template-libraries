import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { OcApiPaths } from '../oc-ng-common-service.module';
import { Page } from '../model/api/page.model';
import { Transaction } from '../model/api/transaction.model';
import { HttpHeaders } from '@angular/common/http';
import { OcHttpParams } from '../model/api/http-params-encoder-model';

/**
 * Description: API service to work with Transactions.<br>
 *
 * [OpenChannel Documentation]{@link https://support.openchannel.io/documentation/api/#426-transactions}
 *
 * Endpoints:<br>
 *
 * GET 'v2/transactions'<br>
 *
 * GET 'v2/transactions/{transactionId}'<br>
 *
 * POST 'v2/transactions/{transactionId}'<br>
 *
 * DELETE 'v2/transactions/{transactionId}'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class TransactionsService {
    constructor(public httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Returns the list of transactions for the current user
     *
     * @param pageNumber - (optional) Current page index. Starts from >= 1.
     * @param limit - (optional) Count apps into response. Starts from >= 1.
     * @param sort - (optional) Sort apps by specific field.
     * [OpenChannel Documentation]{@link https://support.openchannel.io/documentation/api/#381-sort-document}
     * @param query - (optional) Your specific search query.
     * [OpenChannel Documentation]{@link https://support.openchannel.io/documentation/api/#380-query-document}
     * @returns {Observable<Page<Transaction>>} `Observable<Page<Transaction>>`
     *
     * ### Example
     *
     * `getTransactionsList(1, 10, { date: 1 }, { type: 'payment' });`
     */
    getTransactionsList(pageNumber: number = 1, limit: number = 100, sort: any = null, query: any = null): Observable<Page<Transaction>> {
        const params = new OcHttpParams()
            .append('pageNumber', String(pageNumber))
            .append('limit', String(limit))
            .append('sort', JSON.stringify(sort))
            .append('query', JSON.stringify(query));

        return this.httpRequest.get(`${this.apiPaths.transactions}`, { params });
    }

    /**
     *
     * Description: Returns a transaction by the id
     *
     * @param {string} transactionId - The id of the transaction to be returned
     * @param {HttpHeaders} headers - (optional) HTTP headers for the request
     * @returns {Observable<Transaction>} `Observable<Transaction>`
     *
     * ### Example
     *
     * `getTransactionById('transaction-id');`
     */
    getTransactionById(transactionId: string, headers: HttpHeaders = new HttpHeaders()): Observable<Transaction> {
        return this.httpRequest.get(`${this.apiPaths.transactions}/${transactionId}`, { headers });
    }

    /**
     *
     * Description: Updates a transaction by the id
     *
     * @param {string} transactionId - The id of the transaction to be updated
     * @param {string} customData - A custom JSON object to attach to this transaction
     * @param {HttpHeaders} headers - (optional) HTTP headers for the request
     * @returns {Observable<Transaction>} `Observable<Transaction>`
     *
     * ### Example
     *
     * `updateTransactionById('transaction-id', { department: 'billing' });`
     */
    updateTransactionById(transactionId: string, customData: any, headers: HttpHeaders = new HttpHeaders()): Observable<Transaction> {
        return this.httpRequest.post(`${this.apiPaths.transactions}/${transactionId}`, { customData }, { headers });
    }

    /**
     *
     * Description: Deletes a transaction by the id
     *
     * @param {string} transactionId - The id of the transaction to be deleted
     * @param {HttpHeaders} headers - (optional) HTTP headers for the request
     * @returns {Observable<{}>} `Observable<{}>`
     *
     * ### Example
     *
     * `deleteTransactionById('transaction-id');`
     */
    deleteTransactionById(transactionId: string, headers: HttpHeaders = new HttpHeaders()): Observable<{}> {
        return this.httpRequest.delete(`${this.apiPaths.transactions}/${transactionId}`, { headers });
    }
}
