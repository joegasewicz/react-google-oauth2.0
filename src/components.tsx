import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    Authorization,
    GoogleAPIConnectionStrings,
    IAuthorizationOptions,
} from "../src";
import {useState} from "react";

export interface IGoogleButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Placeholder image displayed next to button text */
    placeholder?: string;
    /** Remove default styles. The placeholder prop has no effect if placeholder is set to false */
    defaultStyle?: boolean;
    /** See IAuthorizationRequestParams */
    options: IAuthorizationOptions;
    /** Could be your preloader or any other dumb component */
    callback?: () => React.ReactHTMLElement<any>;
    /** The url of the api to perform the exchange */
    apiUrl: string;
}
/** @internal */
type TypeButtonStyles = { [key: string]: string };
/** @internal */
interface IGoogleAuthContext { queryParamsCode: boolean; }
/** @internal */
interface IServerResponseState { accessToken: string; }
/** @internal */
interface IPayload { }
/** @internal */
interface IApiResponseData { accessToken: string; }
/** @internal */
interface IServerResponse {
    callback?: () => any;
    email?: string;
    error?: string;
    code: string;
    scope: string;
    client_id: string;
    apiUrl: string;
}
/** @internal */
const SERVER_RESPONSE_STATE = { };
/** @internal */
const DEFAULT_GOOGLE_AUTH_STATE = { queryParamsCode: false };
/** @internal */
const buttonStyling: TypeButtonStyles = {
    backgroundSize: "20px 20px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "12px 10px",
    textIndent: "19px",
    border: "1px solid #bdc3c7",
    padding: "9px 23px",
    borderRadius: "9px",
    backgroundColor: "##bdc3c7",
    fontSize: "18px",
};
/** @internal */
const GoogleAuthContext = React.createContext<IGoogleAuthContext>(DEFAULT_GOOGLE_AUTH_STATE);
export const GoogleAuth = GoogleAuthContext.Provider;
export const GoogleAuthConsumer = GoogleAuthContext.Consumer;
/** @internal */
const _getBackgroundImg = (placeholder: string, styles: TypeButtonStyles): TypeButtonStyles => {
    if(placeholder) {
        return { ...styles, backgroundImage: `url(${placeholder})` };
    }
    return styles;
}
/** @internal */
export const InnerButton = (props: IGoogleButton & { error?: string}) => {
    const { placeholder = "", defaultStyle = true, options } = props;

    const scopes = Authorization.createScopes(options.scopes);
    const auth = new Authorization(options, scopes);
    auth.createAuthorizationRequestURL();

    const styles = defaultStyle ? _getBackgroundImg(placeholder, buttonStyling) : undefined;
    return <button style={styles} onClick={auth.redirect} >Sign in with google</button>
}
/** @internal */
async function postToExchangeApiUrl(apiUrl: string, code: string) {
    const res = await fetch(apiUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({code,}),
    });
    return res.json();
}
/** @internal */
function serverResponse(props: IServerResponse) {
    const { callback, email, error, code, apiUrl, scope } = props;
    // TODO Make request with client_id & code to Flask API
    postToExchangeApiUrl(apiUrl, code)
        .then((data: IApiResponseData) => {

        })
        .catch(err => {
            // TODO
        });
}
/**
 * @example
 *
 *      <GoogleButton placeholder="demo/search.png" />
 *s
 * @param props see IGoogleButton
 * @constructor
 */
export const GoogleButton = (props: IGoogleButton) => {
    const { callback } = props;
    const [responseState, setResponseState] = useState<IServerResponseState>(SERVER_RESPONSE_STATE);
    const currentUrl = new URLSearchParams(window.location.search);
    const queryParamsCode = currentUrl.get("code");
    const queryParamsError = currentUrl.get("error");
    if(responseState.accessToken) {
        window.localStorage.setItem("accessToken", responseState.accessToken);
        console.debug("`accessToken` set in local storage.")
        return null;
    } else if (queryParamsCode) {
        // Get rest of params
        const queryParamsEmail = currentUrl.get("email") || "";
        const queryParamsScope = currentUrl.get("scope") || "";
        const serverResponseProps: IServerResponse = {
            callback: callback,
            email: queryParamsEmail,
            scope: queryParamsScope,
            code: queryParamsCode,
            client_id: props.options.clientId,
            apiUrl: props.apiUrl,
        };
        serverResponse(serverResponseProps);
        return callback ? callback() : <>Loading...</>;
    } else if(queryParamsError) {
        return <InnerButton {...props} error={queryParamsError} />;
    }
        return <InnerButton {...props} />;
}