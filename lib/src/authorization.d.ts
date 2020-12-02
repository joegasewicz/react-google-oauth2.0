/** @internal */
export declare enum GoogleAPIConnectionStrings {
    GOOGLE_OAUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth"
}
/** @public */
interface IAuthorizationBase {
    /** This is your client ID */
    clientId: string;
    /** Where you React app should redirect to if user has successfully logged in **/
    redirectUri: string;
    /** By default this is set to *code* */
    responseType?: string;
    /**
     * Indicates if the api **apiUrl** {@link IGoogleButton} can refresh tokens on the user's
     * behalf. The default value is *online* but if your backend api will refresh the token then
     * you must pass in a string value of *offline* (This is recommended for react apps connected
     * to a REST api backend).
     */
    accessType?: string;
    /**
     * This option is currently unavailable but will be in a added in a future version,
     * TODO - See https://github.com/joegasewicz/react-google-oauth2.0/issues/3
     * */
    state?: string;
    /**
     * Defaulted to true. Any extra scopes the logged in user previously granted
     * will be available within the new access token.
     * */
    includeGrantedScopes?: boolean;
    /** Not required, optional. For prefilling email fields etc. */
    loginHint?: string;
    /**
     * Not required, optional. A space-delimited, case-sensitive list of prompts to
     * present the user. If you don't specify this parameter, the user will be prompted
     * only the first time your project requests access.
     * */
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
