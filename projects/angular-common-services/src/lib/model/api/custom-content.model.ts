export interface SiteContentResponse {
    siteId: string;
    contentId: string;
    type: string;
    created: number;
    lastUpdated: number;
    customData: any;
}

export interface SecuritySettingsResponse {
    /**
     * The character limit for any string in the request body.
     * Any request will be validated on the CAP side by this character limit.
     * When any string value in the request body will be more then {@link maxCharacters}, CAP return response with 400 status.
     */
    maxCharacters: number;
    /**
     * User can create a review without app ownership.
     * Used for endpoint: https://support.openchannel.io/documentation/api/#448-reviews-create-review .
     * When this property is true, CAP will inject property 'mustOwnApp' with the 'false' value.
     */
    allowReviewsWithoutOwnership: boolean;
}
