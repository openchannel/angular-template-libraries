import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OcHttpParams} from '../model/api/http-params-encoder-model';
import {
  ChartStatisticDataModelResponse,
  ChartStatisticPeriodModelResponse
} from '../model/components/frontend.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private readonly STATS_URL = 'v2/stats';

  constructor(private httpRequest: HttpRequestService) {
  }

  getTimeSeries(period: string, fields: string, dateStartMS: number, dateEndMS: number, appId?: string)
      : Observable<ChartStatisticDataModelResponse> {

    const query = appId ? JSON.stringify({appId}) : '';

    const mainUrl = `${this.STATS_URL}/series/${period}/${fields}`;

    const params = new OcHttpParams()
      .append('start', String(dateStartMS))
      .append('end', String(dateEndMS))
      .append('query', query);

    return this.httpRequest.get(mainUrl, { params }).pipe(
      map(chartResponse => {
        if (chartResponse) {
          let labelsDataX: string[];
          let tabularLabels: string[];
          if (period === 'month') {
            labelsDataX = chartResponse.map(chart => new Date(chart[0])
              .toLocaleDateString('default', {month: 'short'}));
            tabularLabels = chartResponse.map(chart => new Date(chart[0])
              .toLocaleDateString('default', {month: 'long'}));
          } else {
            tabularLabels = labelsDataX = chartResponse.map(chart => new Date(chart[0])).map(date => {
              return `${date.toLocaleDateString('default', {month: 'short'})} ${date.getDate()}`;
            });
          }
          return {
            labelsX: labelsDataX,
            labelsY: chartResponse.map(chart => chart[1]),
            tabularLabels
          };
        } else {
          return null;
        }
      })
    );
  }

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
