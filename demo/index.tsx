import * as React from "react";
import * as ReactDOM from "react-dom";

import "./search.png";

import {  GoogleButton, IAuthorizationOptions } from "../lib";

function App(props: any) {

    const options: IAuthorizationOptions = {
        clientId: (process.env.CLIENT_ID as string),
        redirectUri: "http://localhost:3000/react-google-Oauth2.0/dist/index.html",
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
          />
        </>
    );
}

ReactDOM.render(
    <App>

    </App>,
    document.getElementById("main"),
);