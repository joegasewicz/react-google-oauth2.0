import * as React from "react";
import { IAuthorizationOptions } from "../src";
export interface IGoogleButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Placeholder image displayed next to button text */
    readonly placeholder?: string;
    /** Remove default styles. The placeholder prop has no effect if placeholder is set to false */
    readonly defaultStyle?: boolean;
    /** See IAuthorizationRequestParams */
    readonly options: IAuthorizationOptions;
    /** Could be your preloader or any other dumb component */
    readonly callback?: () => React.ReactHTMLElement<any>;
    /** The url of the api to perform the exchange */
    readonly apiUrl: string;
}
/** @internal */
interface IGoogleAuthContext {
    readonly queryParamsCode: boolean;
}
export declare const GoogleAuth: React.Provider<IGoogleAuthContext>;
export declare const GoogleAuthConsumer: React.Consumer<IGoogleAuthContext>;
/** @internal */
export declare const InnerButton: (props: IGoogleButton & {
    error?: string;
}) => JSX.Element;
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
export declare const GoogleButton: (props: IGoogleButton) => JSX.Element | null;
export {};
