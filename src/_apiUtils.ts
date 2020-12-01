/** @internal */
export interface IPayload {
    readonly email: string;
    readonly code: string;
    readonly scope: string;
}
/** @internal */
export interface IApiResponseData { readonly access_token: string; }
/** @internal */
export async function postToExchangeApiUrl(apiUrl: string, payload: IPayload): Promise<IApiResponseData> {
    const res: Response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    return res.json();
}
/** @internal */
export function serverResponse(props: any): void {
    const { email = "", code, apiUrl, scope } = props;
    const payload: IPayload = { code, email, scope };
    postToExchangeApiUrl(apiUrl, payload)
        .then((data: IApiResponseData) => {
            // update responseState accessToken
            props.setResponseState({
                accessToken: data.access_token,
            });
        })
        .catch(err => {
            props.setResponseState({
                error: err,
            })
        });
}
/** @internal */
export function storeAccessToken(token: string): void {
     window.localStorage.setItem("accessToken", token);
}

/**
 * @example
 * ```
 *  if(isLoggedIn()) { // returns true is accessToken exists in LocalStorage
 *      // user logged code...
 *  }
 * ```
 */
export function isLoggedIn(): boolean {
    return !!window.localStorage.getItem("accessToken");
}

/**
 * @example
 * ```
 *  logOutOAuthUser() // removes the accessToken from LocalStorage
 * ```
 * @return void
 */
export function logOutOAuthUser(): void {
    window.localStorage.removeItem("accessToken");
}

export function _getAccessToken() {
    return window.localStorage.getItem("accessToken");
}

/**
 * @example
 * ```
 *  fetch(url, {
 *      headers: createOAuthHeaders(),
 *  })
 * ```
 * @return Object
 */
export function createOAuthHeaders(): Object {
    return {
        "Content-type": "application/json",
        "X-Auth-Token": `Bearer ${_getAccessToken()}`
    }
}