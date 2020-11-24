export declare enum GoogleAPIConnectionStrings {
    GOOGLE_0AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth"
}
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
export interface IAuthorizationOptions extends IAuthorizationBase {
    scopes: Array<string>;
}
export interface IAuthorization {
    params: IAuthorizationOptions;
    /** Set to  `["openid", "profile"]` by default **/
    scopesStr: string;
}
/**
 *
 */
export declare class Authorization implements IAuthorization {
    private _googleRedirectURL?;
    queryParamsCode?: string;
    params: IAuthorizationOptions;
    scopesStr: string;
    constructor(params: IAuthorizationOptions, scopesStr: string);
    get googleRedirectURL(): string | undefined;
    set googleRedirectURL(value: string | undefined);
    /**
     * @example
     *
     *      https://accounts.google.com/o/oauth2/v2/auth?
     *      scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
     *      access_type=offline&
     *      include_granted_scopes=true&
     *      response_type=code&
     *      state=state_parameter_passthrough_value&
     *      redirect_uri=https%3A//oauth2.example.com/code&
     *      client_id=client_id
     *
     *      scopes: openid profile email
     *
     * @param params
     */
    createAuthorizationRequestURL(): void;
    /** @internal */
    static createScopes(scopes: Array<string>): string;
    /** @internal */
    redirect: (e: any) => void;
}
export {};
