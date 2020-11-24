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
}

/** @internal */
type TypeButtonStyles = { [key: string]: string };

/** @internal */
const buttonStyling: TypeButtonStyles = {
    backgroundSize: "20px 20px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "12px 10px",
    textIndent: "19px",
    border: "1px solid #bdc3c7",
    padding: "9px 23px",
    borderRadius: "9px",
    backgroundColor: "##bdc3c7"
};


interface IGoogleAuthContext {
    queryParamsCode: boolean;
}

const DEFAULT_GOOGLE_AUTH_STATE = {
    queryParamsCode: false,

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

/**
 * @example
 *
 *      <GoogleButton placeholder="demo/search.png" />
 *s
 * @param props see IGoogleButton
 * @constructor
 */
export const InnerButton = (props: IGoogleButton & { error?: string}) => {
    const { placeholder = "", defaultStyle = true, options } = props;

    const scopes = Authorization.createScopes(options.scopes);
    const auth = new Authorization(options, scopes);
    auth.createAuthorizationRequestURL();

    const styles = defaultStyle ? _getBackgroundImg(placeholder, buttonStyling) : undefined;
    return <button style={styles} onClick={auth.redirect} >Sign in with google</button>
}

/** @internal */
interface IServerResponse {
    callback?: () => any;
    email?: string;
    error?: string;
    code: string;
    scope: string;
    client_id: string;
}

interface IServerResponseState {

}

const SERVER_RESPONSE_STATE = {

};

/** @internal */
function ServerResponse(props: IServerResponse) {
    const { callback, email, error, code, scope } = props;
    const [responseState, setResponseState] = useState<IServerResponseState>(SERVER_RESPONSE_STATE);
    return callback ? callback() : <>Loading...</>;
    // TODO Make request with client_id & code to Flask API
}

export const GoogleButton = (props: IGoogleButton) => {
    const { callback } = props;
    const currentUrl = new URLSearchParams(window.location.search);
    const queryParamsCode = currentUrl.get("code");
    const queryParamsError = currentUrl.get("error");

    if(queryParamsCode) {
        // Get rest of params
        const queryParamsEmail = currentUrl.get("email") || "";
        const queryParamsScope = currentUrl.get("scope") || "";
        return <ServerResponse
            callback={callback}
            email={queryParamsEmail}
            scope={queryParamsScope}
            code={queryParamsCode}
            client_id={props.options.clientId}
        />;
    }
    else if(queryParamsError) {
        return <InnerButton {...props} error={queryParamsError} />;
    }
    return <InnerButton {...props} />;
    }


