/** @internal */
export interface IPayload {
    readonly email: string;
    readonly code: string;
    readonly scope: string;
}
/** @internal */
export interface IApiResponseData {
    readonly access_token: string;
}
/** @internal */
export declare function postToExchangeApiUrl(apiUrl: string, payload: IPayload): Promise<IApiResponseData>;
/** @internal */
export declare function serverResponse(props: any): void;
/** @internal */
export declare function storeAccessToken(token: string): void;
/**
 * @example
 * ```
 *  if(isLoggedIn()) { // returns true is accessToken exists in LocalStorage
 *      // user logged code...
 *  }
 * ```
 */
export declare function isLoggedIn(): boolean;
/**
 * @example
 * ```
 *  logOutOAuthUser() // removes the accessToken from LocalStorage
 * ```
 * @return void
 */
export declare function logOutOAuthUser(): void;
export declare function _getAccessToken(): string | null;
/**
 * @example
 * ```
 *  fetch(url, {
 *      headers: createOAuthHeaders(),
 *  })
 * ```
 * @return Object
 */
export declare function createOAuthHeaders(): Object;
