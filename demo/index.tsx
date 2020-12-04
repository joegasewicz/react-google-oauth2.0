import * as React from "react";
import * as ReactDOM from "react-dom";

import "./search.png";

import {
    GoogleButton,
    IAuthorizationOptions,
    isLoggedIn,
    createOAuthHeaders,
    logOutOAuthUser,
    GoogleAuth,
    GoogleAuthConsumer,
    IGoogleButton,
} from "../src";
import {useState} from "react";


function App(props: any) {

    const options: IAuthorizationOptions = {
        clientId: (process.env.CLIENT_ID as string),
        redirectUri: "http://localhost:63327/react-google-Oauth2.0/dist/index.html",
        scopes: ["openid", "profile", "email"],
        includeGrantedScopes: true,
        accessType: "offline",
    };



    return (
        <>
            <GoogleAuth>
                <GoogleButton
                  placeholder="demo/search.png" // Optional
                  options={options}
                  apiUrl="http://localhost:5000/google_login"
                  defaultStyle={true} // Optional
                  displayErrors={true}>Sign in with google</GoogleButton>
                <GoogleAuthConsumer>
                    {({isAuthenticated}: any) => {
                        console.log("isAuthenticated", isAuthenticated);
                        return null;
                    }}
                </GoogleAuthConsumer>
            </GoogleAuth>
        </>
    );
}

ReactDOM.render(
    <App>

    </App>,
    document.getElementById("main"),
);