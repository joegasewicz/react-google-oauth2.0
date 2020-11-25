import * as React from "react";
import { IAuthorizationOptions } from "../src";
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
}
/** @internal */
interface IGoogleAuthContext {
    readonly queryParamsCode: boolean;
}
/** @internal */
export interface IApiResponseData {
    readonly access_token: string;
}
/** @internal */
export interface IPayload {
    readonly email: string;
    readonly code: string;
    readonly scope: string;
}
export declare const GoogleAuth: React.Provider<IGoogleAuthContext>;
export declare const GoogleAuthConsumer: React.Consumer<IGoogleAuthContext>;
/** @internal */
export declare const InnerButton: (props: IGoogleButton & {
    error?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element;
/** @internal */
export declare function postToExchangeApiUrl(apiUrl: string, payload: IPayload): Promise<IApiResponseData>;
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
export declare const GoogleButton: (props: IGoogleButton & React.ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element | null;
export {};
