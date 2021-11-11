import { MetaDefinition } from '@angular/platform-browser';

/**
 * Custom meta tag implementation.
 * Content for this meta can be filled from the specific response data.
 * Used only for config: {@link PageMetaTags}
 *
 * @example
 * const customDescriptionMetaTag: CustomMetaDefinition = {
 *   name: 'og:description',
 *   content: 'Your default description text',
 *   definitionPath: 'app.customData.description'
 * };
 */
export interface CustomMetaDefinition extends MetaDefinition {
    /** Path for getting content from {@link OCMetaTagService.tempPageData} object. */
    definitionPath: string;
}

/**
 * Includes specific array of meta tags for page.
 * Will be applied when router link starts with {@link routerLinkStartsWith}.
 * Used in config {@link MetaTagsPageConfig}.
 *
 * @example
 * const loginPageMetaTags: PageMetaTags = {
 *   routerLinkStartsWith: '/login',
 *   metaTags: [
 *       { name: 'description', content: 'My custom description' },
 *       { name: 'og:image', content: 'https://my.image.com/login.svg' },
 *   ]
 * }
 */
export interface PageMetaTags {
    routerLinkStartsWith: string | null;
    metaTags: OCMetaTagConfigType[];
}

/**
 * Main meta tags configuration for all pages.<br>
 * Used in: {@link OCMetaTagService#getMetaTagsConfig}.
 *
 * @example
 * const metaTags: MetaTagsPageConfig = {
 *   defaultMetaTags: [
 *       { name: 'author', content: 'Default author name' },
 *       { name: 'description', content: 'Default page description' },
 *       { name: 'generator', content: 'Default generator' },
 *       { name: 'og:url', definitionPath: 'windowUrl' },
 *       { name: 'og:title', content: '(social platforms) Default title' },
 *       { name: 'og:image', content: '(social platforms) Default image URL' },
 *       { name: 'og:description', content: '(social platforms) Default page description' },
 *   ],
 *   pages: [
 *       {
 *           routerLinkStartsWith: '/', // custom meta tags for home page.
 *           metaTags: [
 *               { name: 'description', content: 'OpenChannel' },
 *               { name: 'og:title', content: 'OpenChannel' },
 *               { name: 'og:image', content: 'OpenChannel' },
 *               { name: 'og:description', content: 'OpenChannel' },
 *           ],
 *       },
 *       {
 *           routerLinkStartsWith: '/details', // custom meta tags for app details page.
 *           metaTags: [
 *               { name: 'description', content: 'Your default summary text', definitionPath: 'app.customData.summary' },
 *               { name: 'og:title', content: 'Your default name text', definitionPath: 'app.name' },
 *               { name: 'og:image', content: 'Your default image url', definitionPath: 'app.customData.logo' },
 *               { name: 'og:description', content: 'Your default description text', definitionPath: 'app.customData.description' },
 *           ],
 *       },
 *   ],
 * };
 */
export interface MetaTagsPageConfig {
    /** Default meta tags (all pages). Can be override configs from {@link MetaTagsPageConfig#pages} */
    defaultMetaTags: OCMetaTagConfigType[];
    /** Specific meta tags for pages */
    pages: PageMetaTags[];
}

export type OCMetaTagConfigType = MetaDefinition | CustomMetaDefinition;
