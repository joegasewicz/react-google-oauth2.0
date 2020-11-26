import { IApiResponseData, IPayload } from "./components";
/** @internal */
export declare function postToExchangeApiUrl(apiUrl: string, payload: IPayload): Promise<IApiResponseData>;
/** @internal */
export declare function serverResponse(props: any): void;
/** @internal */
export declare function storeAccessToken(token: string): void;
