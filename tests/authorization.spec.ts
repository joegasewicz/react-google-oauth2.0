import {
    Authorization, IAuthorizationOptions
} from "../src";

describe("#Authentication()", () => {
    delete window.location;
    (window.location as any) = jest.mock;
    (window.location.replace as any) = jest.fn();

  describe("#IAuthorization", () => {
        const testParamsOne: IAuthorizationOptions = {
            clientId: "<CLIENT_ID>",
            redirectUri: "http://localhost:3000",
            scopes: ["openid", "profile", "email"],
            includeGrantedScopes: true,
        };
        const scopesOne = "apples%20bananas%20plums";
        const auth = new Authorization(testParamsOne, scopesOne);
        auth.createAuthorizationRequestURL();
      it("Should have members", () => {
            expect(auth).toHaveProperty("params");
            expect(auth).toHaveProperty("scopesStr");
            expect(auth).toHaveProperty("googleRedirectURL");
      });
  });

  describe("#createScopes()", () => {
        it("should return a string of scopes", () => {
            const scopesOne = ["apples", "bananas", "plums"];
            const scopesTwo = ["apples"];
            const scopesThree = ([] as any);
            expect(Authorization.createScopes(scopesOne)).toEqual("apples%20bananas%20plums");
            expect(Authorization.createScopes(scopesTwo)).toEqual("apples");
            expect(Authorization.createScopes(scopesThree)).toEqual("");
        });
    });

    describe("#createAuthorizationRequest()", () => {
        const testParamsOne: IAuthorizationOptions = {
            clientId: "<CLIENT_ID>",
            redirectUri: "http://localhost:3000",
            scopes: ["openid", "profile", "email"],
            includeGrantedScopes: true,
        };
        const scopesOne = "apples%20bananas%20plums";
        const auth = new Authorization(testParamsOne, scopesOne);
        auth.createAuthorizationRequestURL();
        it("should return the expects url", () => {
            const expectedResult = "https://accounts.google.com/o/oauth2/v2/auth?" +
                "scope=apples%20bananas%20plums&" +
                "include_granted_scopes=true&" +
                "response_type=code&" +
                "redirect_uri=http://localhost:3000&" +
                "client_id=<CLIENT_ID>";
            expect(auth.googleRedirectURL).toEqual(expectedResult);
        });
    });

    describe("#redirect()", () => {
        const testParamsOne: IAuthorizationOptions = {
            clientId: "<CLIENT_ID>",
            redirectUri: "http://localhost:3000",
            scopes: ["openid", "profile", "email"],
            includeGrantedScopes: true,
        };
        const scopesOne = "apples%20bananas%20plums";
        const auth = new Authorization(testParamsOne, scopesOne);
        it("It should throw", () => {
            expect(() => auth.redirect({})).toThrow(ReferenceError);
        });
        it("It should redirect", () => {
           auth.createAuthorizationRequestURL();
           expect(auth.redirect({})).toEqual(undefined);
        });
    });
});
