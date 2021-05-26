import * as React from "react";
import * as ReactDOM from "react-dom";

import "./search.png";

import {
    GoogleButton,
    IAuthorizationOptions,
    GoogleAuth,
    GoogleAuthConsumer,
    IOAuthState,
} from "../src";



function App(props: any) {

    const _options: IAuthorizationOptions = {
        clientId: (process.env.CLIENT_ID as string),
        redirectUri: "http://localhost:3000",
        scopes: ["openid", "profile", "email"],
        accessType: "offline",
        // loginHint: "joegasewicz@gmail.com",
        // prompt: "select_account"
    };

    return (
        <>
            <GoogleAuth>
                <GoogleAuthConsumer>
                    {({responseState, isAuthenticated, setPrompt, options}: IOAuthState) => {
                        if (!isAuthenticated) {
                            setPrompt();
                            return <GoogleButton
                                placeholder="demo/search.png" // Optional
                                options={_options}
                                apiUrl="http://localhost:5000/ibanez/api/v1/staffs/login"
                                defaultStyle={true} // Optional
                                displayErrors={true}>Sign in with google</GoogleButton>;
                        } else {
                            return <div><h1>Logged In!</h1><h1><code>{JSON.stringify(responseState)}</code></h1></div>;
                            if (responseState?.accessToken) { // You can also use isOAuthLoggedIn()
                                return <div><h1>Logged In!</h1></div>;
                                // Now send a request to your server using  createOAuthHeaders() function
                        //         fetch("http://127.0.0.1:5000/ibanez/api/v1/staffs/google_login",  {
                        //             method: "POST",
                        //             headers: createOAuthHeaders(),
                        //         })
                        //             .then(data => {
                        //                 return <div><h1>Logged In!</h1></div>;
                        //             })
                        //             .catch(err => console.error("Just because you have a gmail account doesn't mean you have access!"))
                            }
                        }
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