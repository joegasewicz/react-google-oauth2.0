import * as React from "react";
import * as ReactDOM from "react-dom";

import "./search.png";

import {
    GoogleButton,
    IAuthorizationOptions,
    GoogleAuth,
    GoogleAuthConsumer,
} from "../src";


function App(props: any) {

    const options: IAuthorizationOptions = {
        clientId: (process.env.CLIENT_ID as string),
        redirectUri: "http://localhost:63342/react-google-Oauth2.0/dist/index.html",
        scopes: ["openid", "profile", "email"],
        includeGrantedScopes: true,
        accessType: "offline",
    };



    return (
        <>
            <GoogleAuth>
                <GoogleAuthConsumer>
                    {({isAuthenticated}: any) => {
                        console.log("isAuthenticated", isAuthenticated);
                        return <GoogleButton
                              className="btn btn-lg"
                              placeholder="demo/search.png" // Optional
                              options={options}
                              apiUrl="http://localhost:5000/google_login"
                              defaultStyle={true} // Optional
                              displayErrors={true}>Sign in with google</GoogleButton>;
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