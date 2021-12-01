import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { OcApiPaths } from '../oc-ng-common-service.module';
import { Page } from '../model/api/page.model';
import { Transaction } from '../model/api/transaction.model';

/**
 * Description: API service to work with Transactions.<br>
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
     * @returns {Observable<Page<Transaction>>} `Observable<Page<Transaction>>`
     *
     * ### Example
     *
     * `getTransactionsList();`
     */
    getTransactionsList(): Observable<Page<Transaction>> {
        return this.httpRequest.get(`${this.apiPaths.transactions}`);
    }

    /**
     *
     * Description: Returns a transaction by the id
     *
     * @param {string} transactionId - The id of the transaction to be returned
     * @returns {Observable<Transaction>} `Observable<Transaction>`
     *
     * ### Example
     *
     * `getTransactionById('transaction-id');`
     */
    getTransactionById(transactionId: string): Observable<Transaction> {
        return this.httpRequest.get(`${this.apiPaths.transactions}/${transactionId}`);
    }

    /**
     *
     * Description: Updates a transaction by the id
     *
     * @param {string} transactionId - The id of the transaction to be updated
     * @param {string} customData - A custom JSON object to attach to this transaction
     * @returns {Observable<Transaction>} `Observable<Transaction>`
     *
     * ### Example
     *
     * `updateTransactionById('transaction-id', { department: 'billing' });`
     */
    updateTransactionById(transactionId: string, customData: any): Observable<Transaction> {
        return this.httpRequest.post(`${this.apiPaths.transactions}/${transactionId}`, { customData });
    }

    /**
     *
     * Description: Deletes a transaction by the id
     *
     * @param {string} transactionId - The id of the transaction to be deleted
     * @returns {Observable<{}>} `Observable<{}>`
     *
     * ### Example
     *
     * `deleteTransactionById('transaction-id');`
     */
    deleteTransactionById(transactionId: string): Observable<{}> {
        return this.httpRequest.delete(`${this.apiPaths.transactions}/${transactionId}`);
    }
}
