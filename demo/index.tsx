import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    Authorization,
    GoogleButton,
    GoogleAPIConnectionStrings,
    IAuthorizationOptions,
    IGoogleButton,
    GoogleAuth,
    GoogleAuthConsumer,
} from "../src";

function App(props: any) {

    const options: IAuthorizationOptions = {
        clientId: "your_client_id",
        redirectUri: "http://localhost:3000",
        scopes: ["openid", "profile", "email"],
        includeGrantedScopes: true,
        accessType: "offline",
    };

    return (
        <>
            <GoogleAuth value={undefined}>
                <GoogleButton placeholder="demo/search.png" options={options} />
            </GoogleAuth>

        </>
        );
}

ReactDOM.render(
    <App>

    </App>,
    document.getElementById("main"),
);