import {createOAuthHeaders, getAccessToken, IPayload, postToExchangeApiUrl, serverResponse} from "../src/apiUtils";

describe("apiUtils", () => {
    describe("#postToExchangeApiUrl()", () => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    access_token: "<ACCESS_TOKEN>"
                })
            })
        );
        it("Should return expected response data ", async () => {
            const payload: IPayload = {
                code: "", scope: ""
            }
            const result = await postToExchangeApiUrl("", payload);
            expect(result).toEqual({access_token: "<ACCESS_TOKEN>"});
        });

    });
    describe("#serverResponse(()", () => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    access_token: "<ACCESS_TOKEN>"
                })
            })
        );

        xit("Should return expected response data ",  async (done) => {
            let responseState = {};
            const props = {
                code: "<AUTH_CODE>",
                apiUrl: "/users",
                scope:  ["openid", "profile", "email"],
                setResponseState: jest.fn((_state: any) => {
                    responseState = {...responseState, ..._state}
                }),
            };

            await serverResponse(props as any);
            expect(responseState).toEqual({access_token: "<ACCESS_TOKEN>"});
            done();
        });
    });
    describe("#storeAccessToken()", () => {

    });
    describe("#isLoggedIn()", () => {

    });
    describe("#logOutOAuthUser()", () => {

    });
    describe("#getAccessToken()", () => {

    });
    describe("#createOAuthHeaders()", () => {

        it("should create headers", () => {
            const headers = createOAuthHeaders();
            expect(headers).toEqual({
                "X-Auth-Token": `Bearer ${getAccessToken()}`,
            })
        });
       it("should create headers with resource", () => {
            const headers = createOAuthHeaders("users");
            expect(headers).toEqual({
                "X-Auth-Resource": "users",
                "X-Auth-Token": `Bearer ${getAccessToken()}`,
            })
        });

    });
    describe("#removeOAuthQueryParams()", () => {

    });
});
