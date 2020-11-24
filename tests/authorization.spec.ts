import {
    IAuthorizationRequestParams,
    GoogleAPIConnectionStrings,
    Authorization
} from "../src";

describe("auth0_2_0", () => {
  describe("#createScopes()", () => {
        it("should return a string of scopes", () => {
            const scopes = ["apples", "bananas", "plums"];
            const auth = new Authorization();
            expect(auth.createScopes(scopes)).toEqual("apples%20bananas%20plums");
        });
    });

    describe("#createAuthorizationRequest()", () => {
        it("should return the expects url", () => {
            const auth = new Authorization();
            const testParams: IAuthorizationRequestParams = {
                    clientId: "",
                    redirectUri: "http://localhost:3000",
                    scopes: auth.createScopes(["openid", "profile", "email"]),
                    includeGrantedScopes: true,
            };
            const expectedResult = "https://accounts.google.com/o/oauth2/v2/auth?" +
                "scope=openid%20profile%20email&" +
                "include_granted_scopes=true&" +
                "response_type=code&" +
                "redirect_uri=http://localhost:3000&client_id=604043290993-4gsqa63gjqnjhl4kemjmt7369bgoagqc.apps.googleusercontent.com";
            expect(auth.createAuthorizationRequest(testParams)).toEqual(expectedResult);
        });
    });
});
