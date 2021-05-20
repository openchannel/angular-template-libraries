export class OverallRatingSummary {
    rating = 0;
    reviewCount = 0;
    1 = 0;
    2 = 0;
    3 = 0;
    4 = 0;
    5 = 0;

    constructor(rating?: number, reviewCount?: number) {
        this.rating = rating ? rating : 0;
        this.reviewCount = reviewCount ? reviewCount : 0;
    }
}
