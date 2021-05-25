import {default as React, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {
    Authorization,
    IAuthorizationOptions,
} from "./authorization";
import {
    serverResponse,
    storeAccessToken,
    isLoggedIn,
    removeOAuthQueryParams, IServerResponseState, IServerResponseProps,
} from "./apiUtils";

/** @public */
export interface IGoogleButton {
    /** Placeholder image displayed next to button text. The placeholder prop has no effect if placeholder is set to false */
    readonly placeholder?: string;
    /** Remove default styles.
     *  To Style the <button> element with CSS, use `google-oauth-btn`. For example:
     *  ```
     *  .google-oauth-btn {
     *      color: red;
     *      background-color: lime;
     *  }
     *  ```
     * (you can also pass your css selectors directly with Reacts' `className` prop)
     * */
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
/** @internal */
interface IServerResponse {
    readonly email?: string;
    error?: string;
    readonly code: string;
    readonly scope: string;
    readonly client_id: string;
    readonly apiUrl: string;
    responseState: IServerResponseState;
    setResponseState: Dispatch<SetStateAction<IServerResponseState>>;
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

export interface IOAuthState {
    isAuthenticated?: boolean;
    setOAuthState: Function;
    responseState?: IServerResponseState;
    options?: IAuthorizationOptions;
    setOptions: Function;
    selectAccountPrompt: Function;
    /**
     * ```
     *    import {
     *       responseState
     *   } from "react-google-oauth2";
     *
     *   <GoogleAuth>
     *   {({responseState}) => {
     *       // access the token from the state
     *       console.log(responseState.accessToken) // <ACCESS_TOKEN>
     *   }}
     *   </GoogleAuth>
     * ```
     */
    setResponseState: Dispatch<SetStateAction<IServerResponseState>>;
}
/** @internal */
const DEFAULT_GOOGLE_AUTH_CONTEXT = {
    setOAuthState: () => {},
    setOptions: () => {},
    selectAccountPrompt: () => {},
    setResponseState: () => {},
};
/** @internal */
const GoogleAuthContext = React.createContext<IOAuthState>(DEFAULT_GOOGLE_AUTH_CONTEXT);
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
        <button style={styles} onClick={auth.redirect} className={`${props.className} google-oauth-btn`}>{props.children}</button>
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
    const { options, setOptions, responseState, setOAuthState, setResponseState, isAuthenticated } = useContext<IOAuthState>(GoogleAuthContext);
    const [serverResponseState, setServerResponseState] = useState<IServerResponse>();
    const currentUrl = new URLSearchParams(window.location.search);
    const queryParamsCode = currentUrl.get("code");
    const queryParamsError = currentUrl.get("error");
    useEffect(() => {
        if (!options && setOptions) {
            setOptions(props.options);
        }
    }, [props.options]);
    useEffect(() => {
        if(responseState && !Object.keys(responseState).length && serverResponseState) {
            serverResponse(serverResponseState);
        }
    }, [serverResponseState, responseState]);
    useEffect(() => {
        if(responseState?.accessToken && !isLoggedIn()) {
            storeAccessToken(responseState.accessToken as string);
            console.debug("`accessToken` set in local storage.");
            if (typeof setOAuthState === "function" && !isAuthenticated) {
                setOAuthState(true);
            }
        }
    }, [responseState?.accessToken]);
    // Add any updates to the options state
    let mergedPropsAndStateOptions = {
        ...props.options,
        ...options,
    }
    let _inner =
        <InnerButton
            {...props}
            placeholder={props.placeholder}
            error={responseState?.error}
            options={mergedPropsAndStateOptions}
        />;
    if (responseState?.error) {
        console.error(`[React-Google-OAuth2] Error: Api call failed with ${responseState?.error} error.`);
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
            responseState: responseState as IServerResponseState,
            setResponseState: setResponseState as Dispatch<SetStateAction<IServerResponseState>>,
        };
        removeOAuthQueryParams();
        setServerResponseState(serverResponseProps);
        console.debug("Waiting for remote api response");
        return callback ? callback() : <>Loading...</>;
    } else if (queryParamsError) {
        console.error(`Error: Google login attempt failed with ${queryParamsError} error.`)
        return _inner;
    }
    // Display button with no errors
    return _inner;
}
function selectAccountPrompt(setOptions: Function, options?: IAuthorizationOptions) {
    return () => {
        if (options && options.prompt !== "select_account") {
            setOptions({
                ...options,
                prompt: "select_account",
            } as IAuthorizationOptions);
        }
    };
}

export const GoogleAuth = (props: any) => {
    const [responseState, setResponseState] = useState<IServerResponseState>(SERVER_RESPONSE_STATE);
    const [isAuthenticated, setOAuthState] = useState<boolean>(isLoggedIn());
    const [options, setOptions] = useState<IAuthorizationOptions>();

    const _providerProps: IOAuthState = {
        isAuthenticated,
        setOAuthState,
        responseState,
        setResponseState,
        options,
        setOptions,
        selectAccountPrompt: selectAccountPrompt(setOptions, options),
    };
    return  (
        <GoogleAuthProvider value={_providerProps}>
            {props.children}
        </GoogleAuthProvider>
    );
}