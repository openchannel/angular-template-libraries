import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { ChartStatisticDataModelResponse, ChartStatisticPeriodModelResponse } from '../model/components/frontend.model';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: Service for setting up site config.<br>
 *
 * Endpoints:
 *
 * GET 'v2/stats/series/period/fields'
 *
 * Methods:
 *
 * getTimeSeries
 *
 * getDateStartByCurrentPeriod
 */
@Injectable({
    providedIn: 'root',
})
export class ChartService {
    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Get chart statistic data
     *
     * @param {string} period - Period of time per devision
     * @param {string} field - Field name
     * @param {number} dateStartMS - timestamp of Start
     * @param {number} dateEndMS - timestamp of End
     * @param {string} appId - (optional)
     * @returns {Observable<ChartStatisticDataModelResponse>} `Observable<ChartStatisticDataModelResponse>`
     *
     * ### Example:
     *
     * `getTimeSeries('month','name', 628376482734, 287364872364, '98agsd87has8d7h8as7d')`
     */
    getTimeSeries(
        period: string,
        field: string,
        dateStartMS: number,
        dateEndMS: number,
        appId?: string,
    ): Observable<ChartStatisticDataModelResponse> {
        const query = appId ? JSON.stringify({ appId }) : '';

        const mainUrl = `${this.apiPaths.stats}/series/${period}/${field}`;

        const params = new OcHttpParams().append('start', String(dateStartMS)).append('end', String(dateEndMS)).append('query', query);

        return this.httpRequest.get(mainUrl, { params }).pipe(
            map(chartResponse => {
                if (chartResponse) {
                    let labelsDataX: string[];
                    let tabularLabels: string[];
                    if (period === 'month') {
                        labelsDataX = chartResponse.map(chart => new Date(chart[0]).toLocaleDateString('default', { month: 'short' }));
                        tabularLabels = chartResponse.map(chart => new Date(chart[0]).toLocaleDateString('default', { month: 'long' }));
                    } else {
                        tabularLabels = labelsDataX = chartResponse
                            .map(chart => new Date(chart[0]))
                            .map(date => {
                                return `${date.toLocaleDateString('default', { month: 'short' })} ${date.getDate()}`;
                            });
                    }
                    return {
                        labelsX: labelsDataX,
                        labelsY: chartResponse.map(chart => chart[1]),
                        tabularLabels,
                    };
                } else {
                    return null;
                }
            }),
        );
    }

    /**
     *
     * Description: Get Start Date by period
     *
     * @param {Date} dateEnd - End Date
     * @param {ChartStatisticPeriodModelResponse} period - Period Data Object
     * @returns {Date} `Date`
     *
     * ### Example
     *
     * `getDateStartByCurrentPeriod(297364872634, {
     *     id:'98sdh9f8hsd9',
     *     label:'label',
     *     active:true,
     *     tabularLabel:'tLabel',
     * };`
     */
    getDateStartByCurrentPeriod(dateEnd: Date, period: ChartStatisticPeriodModelResponse): Date {
        const dateStart = new Date(dateEnd);
        if (period?.id === 'month') {
            dateStart.setFullYear(dateEnd.getFullYear() - 1);
        } else if (period?.id === 'day') {
            dateStart.setTime(dateStart.getTime() - 31 * 24 * 60 * 60 * 1000);
        } else {
            dateStart.setMonth(dateStart.getTime() - 31 * 24 * 60 * 60 * 1000);
        }
        return dateStart;
    }
}
