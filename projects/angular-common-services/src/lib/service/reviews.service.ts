import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateReviewRequest, ReviewResponse, UpdateReviewRequest } from '../model/api/review.model';
import { Page } from '../model/api/page.model';
import { HttpRequestService } from './http-request-services';
import { map } from 'rxjs/operators';
import { UsersService } from './users.service';
import { QueryUtil } from '../util/query.util';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OCReviewDetailsResponse } from '../model/components/frontend.model';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service for getting reviews.<br>
 *
 * Endpoints:
 *
 * GET 'v2/reviews'
 *
 */
@Injectable({
    providedIn: 'root',
})
export class ReviewsService {
    constructor(private httpService: HttpRequestService, private usersService: UsersService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Get reviews by App id and merge it with user data with pagination
     *
     * @param {string} appId  (required)
     * @param {number} page  (optional) Current page index. Starts from >= 1.
     * @param {number} limit (optional) Count Reviews into response. Starts from >= 1.
     * @param {string} sort (optional) Sort Reviews by specific field.
     * @param {string[]} filter (optional) Array for your specific search filters.
     * @returns {Observable<Page<OCReviewDetailsResponse>>} Observable<Page<OCReviewDetailsResponse>>
     *
     * ### Example
     * ``
     * getReviewsByAppId('a7hsd87ha8sdh8a7sd',1, 10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}")
     * ``
     */
    getReviewsByAppId(
        appId: string,
        sort?: string,
        filter?: string[],
        page?: number,
        limit?: number,
    ): Observable<Page<OCReviewDetailsResponse>> {
        let queries = [`{'appId':'${appId}'}`];
        if (filter) {
            queries = [...queries, ...filter];
        }

        let params = new OcHttpParams().append('query', QueryUtil.getAndQuery(queries)).append('sort', sort);

        if (page > 0 && limit > 0) {
            params = params.append('pageNumber', String(page)).append('limit', String(limit));
        }

        return this.httpService.get(this.apiPaths.reviews, { params }).pipe(
            map((reviewPage: Page<ReviewResponse>) => {
                return {
                    ...reviewPage,
                    list: reviewPage.list.map(review => ({
                        ...review,
                        review: review.description,
                        reviewOwnerName: review.user.name,
                    })),
                };
            }),
        );
    }

    /**
     * Description: Create the new review.
     * @param {ReviewResponse} reviewData data of the review. Must contain fields `appId`, `headline`, `rating`,
     * `description` and optional field `customData`.
     *
     * ### Example:
     * `createReview({appId: 5565322ae4b0a70b13a4563b, headline: "Good App", rating: 400, description: ""})`
     */
    createReview(reviewData: ReviewResponse | CreateReviewRequest): Observable<ReviewResponse> {
        return this.httpService.post(this.apiPaths.reviews, reviewData);
    }

    /**
     * Description: Updating an app review allows users to modify their reviews.
     * @param {ReviewResponse} reviewData data of the review. Must contain fields `reviewId`, `headline`, `rating`,
     * `description` and optional field `customData`.
     *
     * ### Example:
     * `updateReview({reviewId: "5565322ae4b0a70b13a4563b", headline: "Good App", rating: 400, description: ""})`
     */
    updateReview(reviewData: ReviewResponse | UpdateReviewRequest): Observable<ReviewResponse> {
        return this.httpService.patch(`${this.apiPaths.reviews}/${reviewData.reviewId}`, reviewData);
    }

    /**
     * Description: Returns a single, specific, review record.
     * @param {string} reviewId ID of the review.
     *
     * ### Example:
     * `getOneReview("5565322ae4b0a70b13a4563b")`
     */
    getOneReview(reviewId: string): Observable<ReviewResponse> {
        return this.httpService.get(`${this.apiPaths.reviews}/${reviewId}`);
    }

    /**
     * Description: Deletes a review. Returns an empty response on the success.
     * @param reviewId the ID of the review
     *
     * ### Example:
     * `deleteReview("5565322ae4b0a70b13a4563b")`
     */
    deleteReview(reviewId: string): Observable<any> {
        return this.httpService.delete(`${this.apiPaths.reviews}/${reviewId}`);
    }
}
