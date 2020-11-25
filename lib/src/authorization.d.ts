/** @internal */
export declare enum GoogleAPIConnectionStrings {
    GOOGLE_OAUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth"
}
/** @public */
interface IAuthorizationBase {
    clientId: string;
    /** Where you React app should redirect to if user has successfully logged in **/
    redirectUri: string;
    responseType?: string;
    /** Valid parameter values are online, which is the default value,
     * and offline  Set the value to offline if your application needs
     * to refresh access tokens when the user is not present at the browser
     */
    accessType?: string;
    state?: string;
    includeGrantedScopes?: boolean;
    loginHint?: string;
    prompt?: string;
}
/** @public */
export interface IAuthorizationOptions extends IAuthorizationBase {
    scopes: Array<string>;
}
/** @internal */
export interface IAuthorization {
    params: IAuthorizationOptions;
    /** Set to  `["openid", "profile"]` by default **/
    scopesStr: string;
}
/** @internal */
export declare class Authorization implements IAuthorization {
    private _googleRedirectURL?;
    queryParamsCode?: string;
    params: IAuthorizationOptions;
    scopesStr: string;
    constructor(params: IAuthorizationOptions, scopesStr: string);
    /**
     * @internal
     * @property googleRedirectURL Access the url for the initial
     * browser call to Google's OAuth 2.0 server. Useful for debugging.
     */
    get googleRedirectURL(): string | undefined;
    set googleRedirectURL(value: string | undefined);
    /** @internal */
    createAuthorizationRequestURL(): void;
    /** @internal */
    static createScopes(scopes: Array<string>): string;
    /** @internal */
    redirect: (e: any) => void;
}
export {};
