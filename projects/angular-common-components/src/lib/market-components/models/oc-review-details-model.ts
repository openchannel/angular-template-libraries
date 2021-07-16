import { ComponentsUser, ComponentsUserAccount } from '@openchannel/angular-common-components/src/lib/management-components';

/**
 * Model for the [Review List]{@link OcReviewListComponent} component.
 * @example
 * {
 *     reviewOwnerName: 'John Doe',
 *     rating: 300,
 *     review: 'Some review text',
 *     userId: '5565322ae4b0a70b13a4563b',
 *     reviewId: '88434hjd67487hjs3445h',
 * }
 */
export class OCReviewDetails {
    reviewOwnerName: string;
    rating: number;
    review: string;
    userId?: string;
    reviewId?: string;
}

/**
 * Interface for the review of the user related to the app.
 * @example
 * {
 *     reviewId: '5463cee5e4b042e3e26f1e41',
 *     appId: '5565322ae4b0a70b13a4563b',
 *     appName: 'My App',
 *     userId: '6843gfu34783gfg',
 *     customData: {
 *         name: 'John Smith',
 *         info: 'Some info text'
 *     },
 *     reportDate: 1432695338702,
 *     rating: 400,
 *     headline: 'Great App!',
 *     description: 'It works great and looks good too.',
 *     status: {
 *         value: 'approved',
 *         reason: ''
 *     }
 * }
 */
export interface Review {
    /** The id of this review */
    reviewId?: string;
    /** The headline of the review */
    headline: string;
    /** The main text of the review */
    description: string;
    /** The rating given within this review. The rating is represented as an integer between 100 and 500 (1 – 5 stars) */
    rating: number;
    /** The date (in milliseconds) this Review was posted */
    reportDate?: Date;
    /** The Id of the App that owns this review */
    appId?: string;
    /** The name of the App that owns this review */
    appName?: string;
    /** The id of the User that posted this review */
    userId?: string;
    /** The id of the UserAccount that posted this review */
    userAccountId?: string;
    /** The type for this review */
    type?: string;
    /** The status of this Review */
    status?: ReviewStatus;
    /** The details of the user organization that posted this review */
    user?: ComponentsUser;
    /** The details of the individual user that posted this review */
    userAccount?: ComponentsUserAccount;
    /** A custom JSON object that you can create and attach to this review record */
    customData?: any;
}

/**
 * The current status value.
 * Value meaning:
 *
 * `pending` - reviews have been submitted to the marketplace but are not yet visible to users.
 *
 * `approved` - reviews have been approved by a marketplace administrator and can be viewed by users.
 *
 * `flagged` - reviews have been identified by the system as possibly being spam or containing profanity.
 *
 * `spam` - reviews have been marked as spam by marketplace administrators.
 */
export interface ReviewStatus {
    /** Value of the review status */
    value: string | 'pending' | 'spam' | 'flagged' | 'approved';
    /** Text describing the reason for the current status */
    reason?: string;
}

export declare type ReviewListOptionType = 'EDIT' | 'DELETE';
