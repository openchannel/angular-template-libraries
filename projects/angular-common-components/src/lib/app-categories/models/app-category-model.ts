/**
 * Class consist of necessary fields:
 * ``` typescript
 * {
 *  categoryName: string;
 *  categoryQuery: any;
 * }
 *  ```
 * And not required fields:
 * ``` typescript
 * {
 *  categoryCardClass: string;
 *  categoryLogo: string;
 *  categoryBackgroundImage: string;
 *  categoryTitleColor: string;
 * }
 * ```
 */
export class AppCategoryDetail {
    /** Additional class for the one card */
    categoryCardClass?: string;
    /** url to the category card icon image */
    categoryLogo?: string;
    /** Will be used for category card title. */
    categoryName: string;
    /** queryParams for the routerLink */
    categoryQuery: any;
    /** url to the category card background image */
    categoryBackgroundImage?: string;
    /** set custom color for the category title */
    categoryTitleColor?: string;
}
