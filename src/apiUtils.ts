/** @internal */
import {Dispatch, SetStateAction, useEffect} from "react";

export interface IPayload {
    readonly code: string;
    readonly scope: string;
}

export const GOOGLE_OAUTH2_EXCHANGE_TOKEN_URL = "https://oauth2.googleapis.com/token";

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
export interface IServerResponseState { readonly accessToken?: string; error?: string}
/** @internal */
export interface IServerResponseProps {
    readonly code: string;
    readonly scope: string;
    readonly apiUrl: string;
    responseState: IServerResponseState;
    setResponseState: Dispatch<SetStateAction<IServerResponseState>>;
}
/** @internal */
export function serverResponse(props: IServerResponseProps): void {
    const { code, apiUrl, scope } = props;
    const payload: IPayload = { code, scope };
    postToExchangeApiUrl(apiUrl, payload)
        .then((data: IApiResponseData) => {
            // update responseState accessToken
            if(!("access_token" in data)) {
                props.setResponseState({
                    error: "so access_token in response data!",
                });
            } else {
                props.setResponseState({
                    accessToken: data.access_token,
                });
            }

        })
        .catch(err => {
            props.setResponseState({
                error: err.message,
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

/**
 * @description Get the stored accessToken
 * @return The Access Token or none
 */
export function getAccessToken(): string | null {
    return window.localStorage.getItem("accessToken");
}

/**
 * @description Warning: Please make sure that as of version `0.0.23` we have removed
 * the `application/json` content type headers from this function. This may cause an issue
 * if you originally didn't construct your request content type headers with `application/json`.
 * @example
 * ```
 *  fetch(url, {
 *      headers: createOAuthHeaders(),
 *  })
 * ```
 *
 * If you require your server to handle authenticating multiple users across many resources
 * (or tables) then pass in the name of the resource, for Example:
 * @example
 * ```
 *  fetch(url, {
 *      headers: createOAuthHeaders("users"),
 *  })
 * ```
 *
 *  With the resource value, the following headers are constructed:
 *
 *  @example
 *  ```
 *  {
 *    "X-Auth-Token" : "<TOKEN>",
 *    "X-Auth-Resource": "users",
 *  }
 *  ```
 * @param resource Optional resource name to look up on the server
 * @return Objects
 */
export function createOAuthHeaders(resource?: string): { [k: string]: string } {
    let resourceHeaders = {};
    if(resource) {
        resourceHeaders = {
            "X-Auth-Resource": resource,
        }
    }
    return {
        ...resourceHeaders,
        "X-Auth-Token": `Bearer ${getAccessToken()}`,
    }
}

/** @internal */
export function removeOAuthQueryParams(): void {
    const currentLocation = document.location.href;
    if(document.location.search) {
        const clean_uri = currentLocation.substring(0, currentLocation.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    }
}

/**
 * @description
 * @example
 * ```
 *  exchangeToken(CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET)
 *  .then(accessToken => {
 *       console.log(accessToken) // your access token...
 *   });
 * ```
 * If you require an access token to run your e2e tests then `exchangeToken` will set and return a new access token.
 * @example
 * ```
 *     Cypress.Commands.add("loginSSO",  (overrides = {}) => {
 *       Cypress.log({
 *           "name": "loginSSO",
 *       });
 *       if(!getAccessToken()) {
 *           exchangeToken(CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET)
 *           .then(accessToken => {
 *               cy.request({
 *                   method: 'GET',
 *                   url: `${API_URL}/staff`,
 *                   headers: createOAuthHeaders(),
 *               });
 *           });
 *       }
 *   });
 * ```
 * @param clientId
 * @param refreshToken
 * @param clientSecret
 */
export function exchangeToken(clientId: string, refreshToken: string, clientSecret: string) {
    let url = `${GOOGLE_OAUTH2_EXCHANGE_TOKEN_URL}?`;
    url += `client_id=${clientId}`;
    url += `&grant_type=refresh_token`;
    url += `&refresh_token=${refreshToken}`;
    url += `&client_secret=${clientSecret}`;
    return fetch(url, { method: "POST", })
        .then(data => {
            return data.json().then(data => {
                if (data.error) {
                    throw new Error(data.error);
                } else {
                    window.localStorage.setItem("accessToken", data.access_token);
                    return data.access_token;
                }
            });
        })
        .catch(err => {
            console.debug(err)
            throw new Error("Failed to refresh access token");
        });
}
