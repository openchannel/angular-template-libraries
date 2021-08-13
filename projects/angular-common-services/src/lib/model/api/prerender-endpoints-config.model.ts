/**
 * Class for the special Netlify prerender config. Using by {@link HttpRequestsWatcherInterceptor}.
 * It contains the API endpoints, which should have a special processing for the search crawlers.
 *
 * `excludeAPICall: string[]` - start string of the endpoints which should not be called for the search crawler.
 * @example
 * const prerenderEndpoints: PrerenderEndpointsConfig = {
 *     excludeAPICall: ["/v2/stats/increment/"]
 * }
 */
export class PrerenderEndpointsConfig {
    /**
     * start string of the endpoints which should not be called for the search crawler.
     */
    excludeAPICall?: string[];
}
