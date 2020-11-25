export enum GoogleAPIConnectionStrings {
    GOOGLE_0AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth",
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
export class Authorization implements IAuthorization {

    private _googleRedirectURL?: string;

    public queryParamsCode?: string;

    public params: IAuthorizationOptions;

    public scopesStr: string;

    constructor(params: IAuthorizationOptions, scopesStr: string) {
        this.params = params;
        this.scopesStr = scopesStr;
    }

    public get googleRedirectURL() {
        return this._googleRedirectURL;
    }

    public set googleRedirectURL(value: string | undefined) {
        this._googleRedirectURL = value;
    }

    /** @internal */
    public createAuthorizationRequestURL(): void {
        const {
            accessType,
            includeGrantedScopes = true,
            responseType = "code",
            state = null,
            redirectUri,
            clientId,
        } = this.params;
        const domain = GoogleAPIConnectionStrings.GOOGLE_0AUTH_ENDPOINT;
        let url: string;
        url = `${domain}?scope=${this.scopesStr}&`;
        url = accessType ? `${url}access_type=${accessType}&` : url;
        url = `${url}include_granted_scopes=${includeGrantedScopes}&`;
        url = `${url}response_type=${responseType}&`;
        url = state ? `${url}state=${state}&` : url;
        url = `${url}redirect_uri=${redirectUri}&`;
        url = `${url}client_id=${clientId}`;
        this.googleRedirectURL = url;
    }

    /** @internal */
    public static createScopes(scopes: Array<string>): string {
        let str = "";
        scopes.map((scope, i) => {
            if (scopes.length - 1 === i) {
                str += `${scope}`;
            } else {
                str += `${scope}%20`;
            }
        });
        return str;
    }

    /** @internal */
    public redirect = (e: any): void => {
        if(this.googleRedirectURL) {
            window.location.replace(this.googleRedirectURL)
        } else {
            throw new Error("Error creating redirect url to Google's authorization server");
        }
    }
}