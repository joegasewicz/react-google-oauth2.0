import * as React from "react";
import * as ReactDOM from "react-dom";

import "./search.png";

import {
    GoogleButton,
    IAuthorizationOptions,
    isLoggedIn,
    createOAuthHeaders,
    logOutOAuthUser,
} from "../src";

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
          <GoogleButton
              placeholder="demo/search.png" // Optional
              options={options}
              apiUrl="http://localhost:5000/google_login"
              defaultStyle={true} // Optional
              displayErrors={true}
          />
        </>
    );
}

ReactDOM.render(
    <App>

    </App>,
    document.getElementById("main"),
);