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

/**


 * Description: API service for getting reviews.<br>

 * Endpoints:<br>

 * GET 'v2/reviews'<br>

 */
@Injectable({
  providedIn: 'root',
})
export class ReviewsService {

  private readonly REVIEWS_URL = 'v2/reviews';

  constructor(private httpService: HttpRequestService,
              private usersService: UsersService) {
  }

  /**
   * 
   * Description: Get revies by App id and merge it with user data with pagination
   * 
   * @param {string} appId - (required)
   * @param {number} page - (optional) Current page index. Starts from >= 1.
   * @param {number} limit - (optional) Count Reviews into response. Starts from >= 1.
   * @param {string} sort - (optional) Sort Reviews by specific field.
   * @param {string} filter - (optional) Your specific search filter.
   * @returns {Observable<Page<OCReviewDetailsResponse>>} Observable<Page<OCReviewDetailsResponse>>
   * 
   * * ### Example:
   *``
   * getReviewsByAppId('a7hsd87ha8sdh8a7sd',1, 10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}")
   *``
   */
  getReviewsByAppId(appId: string, sort?: string, filter?: string, page?: number, limit?: number):
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
    if (page > 0 && limit > 0) {
      params = params
        .append('pageNumber', String(page))
        .append('limit', String(limit));
    }

    let reviewPage: Page<Review>;
    return this.httpService.get(this.REVIEWS_URL, params)
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
