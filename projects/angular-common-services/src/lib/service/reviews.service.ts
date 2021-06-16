import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Review} from '../model/api/review.model';
import {Page} from '../model/api/page.model';
import {HttpRequestService} from './http-request-services';
import {map, mergeMap, tap} from 'rxjs/operators';
import {UsersService} from './users.service';
import {User} from '../model/api/user.model';
import {QueryUtil} from '../util/query.util';
import {OcHttpParams} from '../model/api/http-params-encoder-model';
import {OCReviewDetailsResponse} from '../model/components/frontend.model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {

  constructor(private httpService: HttpRequestService,
              private usersService: UsersService,
              private apiPaths: OcApiPaths) {
  }

  getReviewsByAppId(appId: string, sort?: string, filter?: string, page?: number, count?: number):
    Observable<Page<OCReviewDetailsResponse>> {
    const queries = [`{'appId':'${appId}'}`];
    if (filter) {
      queries.push(filter);
    }

    let params = new OcHttpParams()
      .append('query', QueryUtil.getAndQuery(queries))
      .append('sort', sort);

    if (sort) {
      params = params
        .append('sort', sort);
    }
    if (page > 0 && count > 0) {
      params = params
        .append('pageNumber', String(page))
        .append('limit', String(count));
    }

    let reviewPage: Page<Review>;
    return this.httpService.get(this.apiPaths.reviews, params)
      .pipe(
        tap((pageData: Page<Review>) => reviewPage = pageData),
        mergeMap((pageData: Page<Review>) => this.usersService.getUsersByIds(pageData.list.map(value => value.userId))),
        map((userPage: Page<User>) => {
          const idToUser = new Map<string, User>();
          userPage.list.forEach(user => idToUser.set(user.userId, user));

          const reviews = reviewPage.list.map(review => {
            const reviewDetail: OCReviewDetailsResponse = {
              rating: review.rating,
              review: review.description,
              reviewOwnerName: idToUser.get(review.userId).name
            };
            return reviewDetail;
          });

          return {
            ...reviewPage,
            list: reviews,
          };
        }),
      );
  }
}
