/**
 * Gallery Item interface
 * @property {string} title - String value with image title
 * @property {string} description - String value with description for the title
 * @property {string} image - Image URL value, not set this value if your data is video
 * @property {string} video Video URL value, not set this value if your data is image
 */
export interface GalleryItem {
    title?: string;
    description?: string;
    image?: string;
    video?: string;
    mediaWidth?: number;
}

/**
 * Interface for the media item of the [Image Gallery]{@link OcImageGalleryComponent}.
 * Setting height and width of the item in different units.
 * @property {string} height set height of the media.
 * @property {string} width set width of the media
 *
 * @example
 * {
 *     height: "192px",
 *     width: "100%"
 * }
 */
export interface GalleryMediaDimensions {
    height: string;
    width: string;
}

/**
 * Interface for the configuration of the path of icons, used in [Image Gallery Component]{@link OcImageGalleryComponent}.
 * @property {string} arrowRight path to the right arrow icon of the carousel
 * @property {string} arrowLeft path to the left arrow icon of the carousel
 * @property {string} closeIcon path to the close cross icon of the modal window
 *
 * @example
 * {
 *     arrowLeft: "assets/angular-common-components/arrow-left.svg",
 *     arrowRight: "assets/angular-common-components/arrow-right.svg",
 *     closeIcon: "assets/angular-common-components/cross.svg",
 * }
 */
export interface GalleryIconsAssets {
    /** path to the right arrow icon of the carousel */
    arrowLeft?: string;
    /** path to the left arrow icon of the carousel */
    arrowRight?: string;
    /** path to the close cross icon of the modal window */
    closeIcon?: string;
}

export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37,
}
