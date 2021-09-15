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
