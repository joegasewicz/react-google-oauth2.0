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
type TypeGoogleButton = IGoogleButton & React.ButtonHTMLAttributes<HTMLButtonElement>;
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
    isAuthenticated?: boolean;
    setOAuthState?: Function;
}
/** @internal */
const GoogleAuthContext = React.createContext<IOAuthState>({});
/** @internal */
export const GoogleAuthProvider = GoogleAuthContext.Provider;
/**
 * @example
 * Get notified when a user has logged in successfully by wrapping the GoogleButton
 * component within the GoogleAuth provider. For example:
 * ```
 *    import {
 *       GoogleAuth
 *   } from "react-google-oauth2";
 *
 *   <GoogleAuth>
 *   {({isAuthenticated}) => {
 *       // isAuthenticated will get set to true when a user has successfully logged in.
 *       console.log("value: ", isAuthenticated); // value: true or false
 *       return <GoogleButton
 *                 // options...
 *               />
 *   }}
 *   </GoogleAuth>
 * ```
 */
export const GoogleAuthConsumer = GoogleAuthContext.Consumer;
/** @internal */
const _getBackgroundImg = (placeholder: string, styles: TypeButtonStyles): TypeButtonStyles => {
    if(placeholder) {
        return { ...styles, backgroundImage: `url(${placeholder})` };
    }
    return styles;
}

/** @internal */
interface IInnerButtonProps extends IGoogleButton {
    error?: string;
}
/** @internal */
export const InnerButton = (props: IInnerButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const {
        placeholder = "",
        defaultStyle = true,
        options,
        displayErrors = false,
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
        <button style={styles} onClick={auth.redirect} >{props.children}</button>
        {(displayErrors && props.error) && <div>{props.error}</div>}
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
export function GoogleButton(props: TypeGoogleButton) {
    const {callback} = props;
    const oauthContext = useContext<IOAuthState>(GoogleAuthContext);
    const currentUrl = new URLSearchParams(window.location.search);
    const queryParamsCode = currentUrl.get("code");
    const queryParamsError = currentUrl.get("error");
    let _inner =
        <InnerButton
            {...props}
            placeholder={props.placeholder}
            error={(oauthContext as any).responseState.error}
            options={props.options}
        />;
    if ((oauthContext as any).responseState.accessToken && !isLoggedIn()) {
        storeAccessToken((oauthContext as any).responseState.accessToken);
        console.debug("`accessToken` set in local storage.");
        if(typeof (oauthContext as any).setOAuthState === "function") {
            useEffect(() => {
                (oauthContext as any).setOAuthState(true);
            });
        }
        return null;
    } else if ((oauthContext as any).responseState.error) {
        console.error(`[React-Google-OAuth2] Error: Api call failed with ${(oauthContext as any).responseState.error} error.`);
        return _inner;
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
            responseState: (oauthContext as any).responseState,
            setResponseState: (oauthContext as any).setResponseState,
        };
        removeOAuthQueryParams();
        useEffect(() => {
            serverResponse(serverResponseProps);
        }, []);
        console.debug("Waiting for remote api response");
        return callback ? callback() : <>Loading...</>;
    } else if (queryParamsError) {
        console.error(`Error: Google login attempt failed with ${queryParamsError} error.`)
        return _inner;
    }
    // Display button with no errors
    return _inner;
}

export const GoogleAuth = (props: any) => {
    const [responseState, setResponseState] = useState<IServerResponseState>(SERVER_RESPONSE_STATE);
      const [isAuthenticated, setOAuthState] = useState<boolean>(isLoggedIn());
    const _providerProps = {
        isAuthenticated,
        setOAuthState,
        responseState,
        setResponseState,
    };
    return  (
        <GoogleAuthProvider value={_providerProps}>
            {props.children}
        </GoogleAuthProvider>
    );
}