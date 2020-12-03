import {default as React, useContext, useEffect, useState} from "react";
import {
    Authorization,
    IAuthorizationOptions,
} from "./authorization";
import {
    serverResponse,
    storeAccessToken,
    isLoggedIn,
    removeOAuthQueryParams,
} from "./_apiUtils";

/** @public */
export interface IGoogleButton {
    /** Placeholder image displayed next to button text */
    readonly placeholder?: string;
    /** Remove default styles. The placeholder prop has no effect if placeholder is set to false */
    readonly defaultStyle?: boolean;
    /** See IAuthorizationRequestParams */
    readonly options: IAuthorizationOptions;
    /**
     * @property
     * @optional
     * A React component or any function that returns a React component.
     * This would normally be used to display a preloader to the user whilst
     * the OAuth2.0 login strategy is in flight. By default a `Loading...`
     * message will be displayed.
     * @example
     * ```
     * <GoogleButton
     *    callback={() => <>"Loading..."</>}
     *    // other props...
     * />
     * ```
     */
    readonly callback?: () => React.ReactHTMLElement<any>;
    /** The url of the api to perform the exchange */
    readonly apiUrl: string;
    /**
     * Optional. Default set to false.
     * Display an error to the user (will be displayed in a child `div` element).
     */
    readonly displayErrors?: boolean;
}
/** @internal */
type TypeButtonStyles = { [key: string]: string };
/** @internal */
interface IServerResponseState { readonly accessToken?: string; error?: string}
/** @internal */
interface IServerResponse {
    readonly email?: string;
    error?: string;
    readonly code: string;
    readonly scope: string;
    readonly client_id: string;
    readonly apiUrl: string;
    responseState: IServerResponseState;
    setResponseState: any; // TODO
}
/** @internal */
const SERVER_RESPONSE_STATE = { };

/** @internal */
const buttonStyling: TypeButtonStyles = {
    backgroundSize: "20px 20px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "12px 10px",
    textIndent: "19px",
    border: "1px solid #bdc3c7",
    padding: "9px 23px",
    borderRadius: "9px",
    backgroundColor: "#bdc3c7",
    fontSize: "18px",
};
interface IOAuthState {
    isAuthenticated: boolean;
    readonly _updateOAuth?: Function;
}
/** @internal */
const GoogleAuthContext = React.createContext<IOAuthState>({
    isAuthenticated: true});
export const GoogleAuthProvider = GoogleAuthContext.Provider;
export const GoogleAuth = GoogleAuthContext.Consumer;
/** @internal */
const _getBackgroundImg = (placeholder: string, styles: TypeButtonStyles): TypeButtonStyles => {
    if(placeholder) {
        return { ...styles, backgroundImage: `url(${placeholder})` };
    }
    return styles;
}
/** @internal */
interface IInnerButtonProps extends IGoogleButton {
    isAuthenticated: boolean;
    _updateOAuth: (t: any) => void;
    error?: string;
}
/** @internal */
export const InnerButton = (props: IInnerButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const {
        placeholder = "",
        defaultStyle = true,
        options,
        displayErrors = false,
        isAuthenticated,
        _updateOAuth,
    } = props;

    const scopes = Authorization.createScopes(options.scopes);
    const auth = new Authorization(options, scopes);
    auth.createAuthorizationRequestURL();

    const styles = defaultStyle ? _getBackgroundImg(placeholder, buttonStyling) : undefined;
    if(props.error) {
        console.error(`[React-Google-OAuth2] Error: ${props.error}
         - To display the error to the user, set IGoogleProps displayErrors to true.
         See https://joegasewicz.github.io/react-google-oauth2.0/`);
    }
    removeOAuthQueryParams();
    return <>
          <GoogleAuthProvider value={{_updateOAuth, isAuthenticated}}>
            <button style={styles} onClick={auth.redirect} >Sign in with google</button>
            {(props.displayErrors && props.error) && <div>{props.error}</div>}
          </GoogleAuthProvider>
    </>
}
/**
 * @example
 * **Quick Start:**
 *
 * First create an options object that implements an {@link  IAuthorizationOptions} type.
 * Check the {@link  IAuthorizationOptions} and {@link  IAuthorizationBase} types for
 * all required properties. Then, pass the options to the {@link GoogleButton} component.
 *
 * ```IAuthorizationOptions
 *  const options:  = {
 *      clientId: (process.env.CLIENT_ID as string),
 *       redirectUri: "http://localhost:3000",
 *       scopes: ["openid", "profile", "email"],
 *       includeGrantedScopes: true,
 *       accessType: "offline",
 *   };
 *
 *   <GoogleButton
 *         placeholder="demo/search.png"
 *         options={options}
 *         apiUrl="http://localhost:5000/google_login"
 *   />
 * ```
 * @param props see IGoogleButton
 * @constructor
 */
export const GoogleButton = (props: IGoogleButton & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { callback } = props;
    const [responseState, setResponseState] = useState<IServerResponseState>(SERVER_RESPONSE_STATE);
     const [isAuthenticated, setOAuthState] = useState(false);
    const _updateOAuth = (isAuth: boolean) => setOAuthState(!isAuth)
    const oauthContext = useContext<IOAuthState>(GoogleAuthContext);
    const currentUrl = new URLSearchParams(window.location.search);
    const queryParamsCode = currentUrl.get("code");
    const queryParamsError = currentUrl.get("error");
    if(responseState.accessToken && !isLoggedIn()) {
        storeAccessToken(responseState.accessToken);
        useEffect(() =>
            (oauthContext as any)._updateOAuth(isAuthenticated)
            , []);
        console.debug("`accessToken` set in local storage.");
        return null;
    } else if (responseState.error) {
        console.error(`[React-Google-OAuth2] Error: Api call failed with ${responseState.error} error.`);
        return <InnerButton
                {...props}
                placeholder={props.placeholder}
                error={responseState.error}
                _updateOAuth={_updateOAuth}
                apiUrl={props.apiUrl}
                isAuthenticated={isAuthenticated}
                options={props.options}
        />;
    } else if (queryParamsCode && !isLoggedIn()) {
        // Get rest of params
        const queryParamsEmail = currentUrl.get("email") || "";
        const queryParamsScope = currentUrl.get("scope") || "";
        const serverResponseProps: IServerResponse = {
            email: queryParamsEmail,
            scope: queryParamsScope,
            code: queryParamsCode,
            client_id: props.options.clientId,
            apiUrl: props.apiUrl,
            responseState,
            setResponseState,
        };
        removeOAuthQueryParams();
        useEffect(() => {
           serverResponse(serverResponseProps);
        }, []);
        console.debug("Waiting for remote api response");
        return callback ? callback() : <>Loading...</>;
    } else if(queryParamsError) {
        console.error(`Error: Google login attempt failed with ${queryParamsError} error.`)
        return <InnerButton
                {...props}
                placeholder={props.placeholder}
                error={responseState.error}
                _updateOAuth={_updateOAuth}
                apiUrl={props.apiUrl}
                isAuthenticated={isAuthenticated}
                options={props.options}
        />;;
    }
    // Display button with no errors
    return <InnerButton
                {...props}
                placeholder={props.placeholder}
                error={responseState.error}
                _updateOAuth={_updateOAuth}
                apiUrl={props.apiUrl}
                isAuthenticated={isAuthenticated}
                options={props.options}
        />;;
}
