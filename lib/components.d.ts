import * as React from "react";
import { IAuthorizationOptions } from "../src";
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
interface IGoogleAuthContext {
    queryParamsCode: boolean;
}
export declare const GoogleAuth: React.Provider<IGoogleAuthContext>;
export declare const GoogleAuthConsumer: React.Consumer<IGoogleAuthContext>;
/**
 * @example
 *
 *      <GoogleButton placeholder="demo/search.png" />
 *s
 * @param props see IGoogleButton
 * @constructor
 */
export declare const InnerButton: (props: IGoogleButton & {
    error?: string;
}) => JSX.Element;
export declare const GoogleButton: (props: IGoogleButton) => JSX.Element;
export {};
