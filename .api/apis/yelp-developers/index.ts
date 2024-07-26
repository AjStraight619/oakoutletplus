import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'yelp-developers/1.0 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * This endpoint returns up to three review excerpts for a given business ordered by <a
   * href="https://www.yelp-support.com/article/How-is-the-order-of-reviews-determined?"
   * target="_blank">Yelp's default sort order</a>.
   *
   * **Note:** at this time, the API does not return businesses without any reviews.
   *
   * To use this endpoint, make the GET request to the following URL with the ID of the
   * business you want to get reviews for.
   * Normally, you'll get the Business ID from <a
   * href="https://docs.developer.yelp.com/reference/v3_business_search"
   * target="_blank">/v3/businesses/search</a>,
   * <a href="https://docs.developer.yelp.com/reference/v3_business_phone_search"
   * target="_blank">/v3/businesses/search/phone</a>, <a
   * href="https://docs.developer.yelp.com/reference/v3_transaction_search"
   * target="_blank">/v3/transactions/{transaction_type}/search</a> or
   * <a href="https://docs.developer.yelp.com/reference/v3_autocomplete"
   * target="_blank">/v3/autocomplete</a>.
   *
   *
   * @summary Reviews
   * @throws FetchError<400, types.V3BusinessReviewsResponse400> Bad Request. Message varies depending on failure scenario
   * @throws FetchError<401, types.V3BusinessReviewsResponse401> The API key has either expired or doesn't have the required scopes to query this
   * endpoint.
   *
   * | code  | description |
   * | ------------- | ------------- |
   * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
   * endpoint.  |
   * | TOKEN_INVALID  | Invalid API key or authorization header.  |
   *
   * @throws FetchError<403, types.V3BusinessReviewsResponse403> The API key provided is not currently able to query this endpoint.
   * @throws FetchError<404, types.V3BusinessReviewsResponse404> Resource Not Found
   * @throws FetchError<413, types.V3BusinessReviewsResponse413> The length of the request exceeded the maximum allowed
   * @throws FetchError<429, types.V3BusinessReviewsResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
   * limit for this endpoint. Try reducing the rate at which you make queries.
   * @throws FetchError<500, types.V3BusinessReviewsResponse500> Internal Server Error
   * @throws FetchError<503, types.V3BusinessReviewsResponse503> Service Unavailable
   */
  v3_business_reviews(metadata: types.V3BusinessReviewsMetadataParam): Promise<FetchResponse<200, types.V3BusinessReviewsResponse200>> {
    return this.core.fetch('/v3/businesses/{business_id_or_alias}/reviews', 'get', metadata);
  }

  /**
   * Return a business's review highlights
   *
   *
   * @summary Review Highlights
   * @throws FetchError<400, types.V3BusinessReviewHighlightsResponse400> Bad Request. Message varies depending on failure scenario
   * @throws FetchError<401, types.V3BusinessReviewHighlightsResponse401> The API key has either expired or doesn't have the required scopes to query this
   * endpoint.
   *
   * | code  | description |
   * | ------------- | ------------- |
   * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
   * endpoint.  |
   * | TOKEN_INVALID  | Invalid API key or authorization header.  |
   *
   * @throws FetchError<403, types.V3BusinessReviewHighlightsResponse403> The API key provided is not currently able to query this endpoint.
   * @throws FetchError<404, types.V3BusinessReviewHighlightsResponse404> Resource Not Found
   * @throws FetchError<413, types.V3BusinessReviewHighlightsResponse413> The length of the request exceeded the maximum allowed
   * @throws FetchError<429, types.V3BusinessReviewHighlightsResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
   * limit for this endpoint. Try reducing the rate at which you make queries.
   * @throws FetchError<500, types.V3BusinessReviewHighlightsResponse500> Internal Server Error
   * @throws FetchError<503, types.V3BusinessReviewHighlightsResponse503> Service Unavailable
   */
  v3_business_review_highlights(metadata: types.V3BusinessReviewHighlightsMetadataParam): Promise<FetchResponse<200, types.V3BusinessReviewHighlightsResponse200>> {
    return this.core.fetch('/v3/businesses/{business_id_or_alias}/review_highlights', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { V3BusinessReviewHighlightsMetadataParam, V3BusinessReviewHighlightsResponse200, V3BusinessReviewHighlightsResponse400, V3BusinessReviewHighlightsResponse401, V3BusinessReviewHighlightsResponse403, V3BusinessReviewHighlightsResponse404, V3BusinessReviewHighlightsResponse413, V3BusinessReviewHighlightsResponse429, V3BusinessReviewHighlightsResponse500, V3BusinessReviewHighlightsResponse503, V3BusinessReviewsMetadataParam, V3BusinessReviewsResponse200, V3BusinessReviewsResponse400, V3BusinessReviewsResponse401, V3BusinessReviewsResponse403, V3BusinessReviewsResponse404, V3BusinessReviewsResponse413, V3BusinessReviewsResponse429, V3BusinessReviewsResponse500, V3BusinessReviewsResponse503 } from './types';
