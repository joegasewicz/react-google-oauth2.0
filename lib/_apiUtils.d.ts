/** @internal */
export interface IPayload {
    readonly email: string;
    readonly code: string;
    readonly scope: string;
}
/** @internal */
export interface IApiResponseData {
    readonly access_token: string;
}
/** @internal */
export declare function postToExchangeApiUrl(apiUrl: string, payload: IPayload): Promise<IApiResponseData>;
/** @internal */
export declare function serverResponse(props: any): void;
/** @internal */
export declare function storeAccessToken(token: string): void;
