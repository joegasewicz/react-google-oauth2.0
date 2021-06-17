import React from "react";
import renderer from "react-test-renderer";
import {GoogleButton, IAuthorizationOptions} from "../src";
const googleComponents = require("../src/apiUtils");
import {act} from 'react-test-renderer';


describe("#GoogleButton", () => {
    delete window.location;
    (window.location as any) = jest.mock;
    (window.location.replace as any) = (x: string) => window.location.href = x;

    const testParamsOne: IAuthorizationOptions = {
        clientId: "<CLIENT_ID>",
        redirectUri: "http://localhost:3000",
        scopes: ["openid", "profile", "email"],
        includeGrantedScopes: true,
    };

    it("should render a component", () => {
        const component =  <GoogleButton
                  placeholder="demo/search.png" // Optional
                  options={testParamsOne}
                  apiUrl="http://localhost:5000/google_login"
                  defaultStyle={true} // Optional
              />
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should contain text", () => {
        const component =  <GoogleButton
            placeholder="demo/search.png" // Optional
            options={testParamsOne}
            apiUrl="http://localhost:5000/google_login"
            defaultStyle={true} // Optional
        >Sign in with google</GoogleButton>

        const googleButton = renderer.create(component);
        const button = googleButton.root;
        expect(button.findByType("button").props.children).toEqual("Sign in with google");
    });

    it("should contain styles", () => {
        const component =  <GoogleButton
            placeholder="demo/search.png" // Optional
            options={testParamsOne}
            apiUrl="http://localhost:5000/google_login"
            defaultStyle={true} // Optional
        />

        const googleButton = renderer.create(component);
        const button = googleButton.root;
        expect(button.findByType("button").props.style.backgroundSize).toEqual("20px 20px");
        expect(button.findByType("button").props.style.backgroundRepeat).toEqual("no-repeat");
        expect(button.findByType("button").props.style.backgroundPosition).toEqual("12px 10px");
        expect(button.findByType("button").props.style.textIndent).toEqual("19px");
        expect(button.findByType("button").props.style.border).toEqual("1px solid #bdc3c7");
        expect(button.findByType("button").props.style.padding).toEqual("9px 23px");
        expect(button.findByType("button").props.style.borderRadius).toEqual("9px");
        expect(button.findByType("button").props.style.backgroundColor).toEqual("#bdc3c7");
        expect(button.findByType("button").props.style.fontSize).toEqual("18px");
        expect(button.findByType("button").props.style.backgroundImage).toEqual("url(demo/search.png)");
    });

    it("should contain option props", () => {
        const component =  <GoogleButton
            placeholder="demo/search.png" // Optional
            options={testParamsOne}
            apiUrl="http://localhost:5000/google_login"
            defaultStyle={true} // Optional
        />

        const googleButton = renderer.create(component);
        expect(googleButton.root.props.placeholder).toEqual("demo/search.png");
        expect(googleButton.root.props.apiUrl).toEqual("http://localhost:5000/google_login");
        expect(googleButton.root.props.defaultStyle).toEqual(true);
        expect(googleButton.root.props.options.clientId).toEqual("<CLIENT_ID>");
        expect(googleButton.root.props.options.redirectUri).toEqual("http://localhost:3000");
        expect(googleButton.root.props.options.scopes).toEqual(["openid", "profile", "email"]);
        expect(googleButton.root.props.options.includeGrantedScopes).toEqual(true);
    });

    it("should redirect to Googles login page", () => {
        const component =  <GoogleButton
            placeholder="demo/search.png" // Optional
            options={testParamsOne}
            apiUrl="http://localhost:5000/google_login"
            defaultStyle={true} // Optional
        />

        const googleButton = renderer.create(component);
        const button = googleButton.root.findByType("button");
        button.props.onClick();
        const expected = "https://accounts.google.com/o/oauth2/v2/auth?" +
            "scope=openid%20profile%20email&" +
            "access_type=offline&" +
            "include_granted_scopes=true&" +
            "response_type=code&" +
            "redirect_uri=http://localhost:3000&" +
            "client_id=<CLIENT_ID>";
        expect(window.location.href).toEqual(expected);
    });

    it("should send a request to the backend API and return loading component", async () => {
        window.location.search = "http://localhost:3000?email=<EMAIL>&code=<CODE>&scope=<SCOPES>";
        let googleButton;
        const spy = jest.fn();
        await act(async () => {

            const component =  <GoogleButton
                placeholder="demo/search.png" // Optional
                options={testParamsOne}
                apiUrl="http://localhost:5000/google_login"
                defaultStyle={true} // Optional
            />
            googleButton  = renderer.create(component);

            jest.spyOn(googleComponents,  "serverResponse")
                .mockImplementation(spy);

        });
        expect.assertions(2);
        expect((googleButton as any).root.children[0]).toEqual("Loading...");
        // TODO update this test with at least 1 call to serverResponse
        expect(googleComponents.serverResponse).toHaveBeenCalledTimes(0);

    });

    xit("should set token on response from API", async () => {
        // TODO Need updating to test the useContext updates
        const spy = jest.fn();
        await act( async () => {

        const component =  <GoogleButton
            placeholder="demo/search.png" // Optional
            options={testParamsOne}
            apiUrl="http://localhost:5000/google_login"
            defaultStyle={true} // Optional
        />
        const googleButton = renderer.create(component);

        jest.spyOn(React,  "useContext")
            .mockImplementation(() => [{isAuthenticated: true}, jest.fn()]);
        jest.spyOn(googleComponents, "storeAccessToken")
            .mockImplementation(spy);
        });

        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith("<access_token>");
    });

    xit("should not recall exchange server if access token is in localStorage", () => {
         // TODO Need updating to test the useContext updates
        const spy1 = jest.fn();
        const spy2 = jest.fn();
        jest.spyOn(googleComponents, "isLoggedIn")
            .mockImplementation(() => true);
        jest.spyOn(React,  "useState")
                .mockImplementation(() => [{accessToken: "<access_token>"}, jest.fn()]);
        jest.spyOn(googleComponents, "serverResponse")
            .mockImplementation(spy1);

        jest.spyOn(googleComponents, "storeAccessToken")
            .mockImplementation(spy2);

        const component =  <GoogleButton
            placeholder="demo/search.pnz" // Optional
            options={testParamsOne}
            apiUrl="http://localhost:5000/google_login"
            defaultStyle={true} // Optional
        />

        const googleButton = renderer.create(component);
        expect(spy1).toBeCalledTimes(0);
        expect(spy2).toBeCalledTimes(0);
    });

});