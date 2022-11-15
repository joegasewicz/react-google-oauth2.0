[![Build & Test](https://github.com/joegasewicz/react-google-oauth2.0/actions/workflows/test.yml/badge.svg)](https://github.com/joegasewicz/react-google-oauth2.0/actions/workflows/test.yml)
[![Node.js Package](https://github.com/joegasewicz/react-google-oauth2.0/actions/workflows/main.yml/badge.svg)](https://github.com/joegasewicz/react-google-oauth2.0/actions/workflows/main.yml)
[![GitHub license](https://img.shields.io/github/license/joegasewicz/react-google-oauth2.0)](https://github.com/joegasewicz/react-google-oauth2.0/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/joegasewicz/react-google-oauth2.0)](https://github.com/joegasewicz/react-google-oauth2.0/issues)
![npm](https://img.shields.io/npm/v/react-google-oauth2)

# React Google OAuth 2.0
Easily add Google OAuth 2.0 Single Sign On to a React app & let your server handle your access & refresh tokens.
This library will work directly with [Flask JWT Router](https://github.com/joegasewicz/flask-jwt-router) & provide
Google OAuth 2.0 integration out of the box with minimal setup.

Docs: https://joegasewicz.github.io/react-google-oauth2.0/

## Install
```bash
npm install react-google-oauth2
// For React 17 or above use
npm install react-google-oauth2 --force 
```


## Quick Start
```bash
import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    GoogleButton,
    IAuthorizationOptions,
    isLoggedIn,
    createOAuthHeaders,
    logOutOAuthUser,
    GoogleAuth,
} from "react-google-oauth2";

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
    </App>,
    document.getElementById("main"),
);
```
### GoogleAuth Provider & GoogleAuthConsumer
Get notified when a user has logged in successfully by wrapping the
`GoogleButton` component within the `GoogleAuth` provider.
You can then use the `GoogleAuthConsumer` to redirect to your authorized routes
when `{isAuthenticated}` is true.
For example:
```typescript jsx
import {
    GoogleAuth,
    GoogleButton,
    GoogleAuthConsumer,
    IOAuthState,
} from "react-google-oauth2";

<GoogleAuth>
    <GoogleAuthConsumer>
        {({responseState, isAuthenticated}: IOAuthState) => {
            if (!isAuthenticated) {
            return <GoogleButton
                  placeholder="demo/search.png" // Optional
                  options={options}
                  apiUrl="http://localhost:5000/google_login"
                  defaultStyle={true} // Optional
                  displayErrors={true}>Sign in with google</GoogleButton>;
            } else {
                if (responseState.accessToken) { // You can also use isLoggedIn()
                    // Now send a request to your server using  createOAuthHeaders() function
                    fetch(url, {
                        headers: createOAuthHeaders(),
                    })
                    .then(data => console.log("Horay We're logged in!"))
                    .catch(err => console.error("Just because you have a gmail account doesn't mean you have access!"))
                }
            }
        }}
    </GoogleAuthConsumer>
</GoogleAuth>

```
### OAuth2.0 Helper Functions
Check if OAuth2.0 user is logged in
```typescript jsx
if(isLoggedIn()) { // returns true is accessToken exists in LocalStorage
    // user logged code...
}
```
Creat OAuth2.0 Server Headers
```typescript jsx
// Using Fetch API example:
fetch(url, {
    headers: createOAuthHeaders(),
});
```
Log out OAuth2.0 users
```typescript jsx
logOutOAuthUser() // removes the accessToken from LocalStorage
```

### Your Rest API endpoint details
The `GoogleButton` component will make the following request to your api:
```
POST options = {body: { code: <code>, scope: <scope> }} URL = `apiUrl`
```

### Update prompts
If for example your user updates their email in your app & you redirect them
to the login again, Google will by default skip the Google email select screen
& log you in with your existing credentials. To stop this happening you can use the following function:

```typescript
setPrompt("select_account");
```

Below is an example with `setPrompt` function resetting your 
```typescript
const sso_options: IAuthorizationOptions = {
    clientId: "<CLIENT_ID>",
    redirectUri: `http://localhost:3000/login`,
    scopes: ["openid", "profile", "email"],
    accessType: "offline",
};
```
Then in your login component it could look like this:
```typescript
<GoogleAuth>
    <GoogleAuthConsumer>
        {({ responseState, isAuthenticated, setPrompt }: IOAuthState) => {
                if (!isAuthenticated) {
                    // Here we are using Lodash fp to get our prompt value
                    // passed from the React Router location API e.g:
                    // history.push({ pathname: "/login", { prompt: "select_account" });
                    const prompt = fp.get("state.prompt", location);
                    if (prompt) {
                        // this will now set sso_option.prompt = "select_account"
                        // for this login attempt, then the auto login flow will
                        // continue as normal
                        setPrompt(prompt);
                    }
                    return <StyledGoogleButton>
                        <GoogleButton
                            defaultStyle={false}
                            options={sso_option}
                            apiUrl="http://localhost:3000/users/login"
                        >Login</GoogleButton>
                    </StyledGoogleButton>;
                } else {
                    if (responseState?.accessToken && isOAuthLoggedIn()) {
                        updateShouldFetch(isOAuthLoggedIn());
                        if (staff) {
                           return <Redirect to="/staff"/>;
                        } else {
                            return null;
                        }
                    }
                    return null;
                }
        }}
    </GoogleAuthConsumer>
</GoogleAuth>
```

### Access tokens for e2e tests
To test your React app with an e2e testing framework such as [cypressIO](https://www.cypress.io/)
you can use the `exchangeToken` function.

The `exchangeToken` function fetches the new access token and sets it into local storage and also
returns the access token.

Example to fetch and set an access token in local storage
 ```typescript
  exchangeToken(CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET)
  .then(accessToken => {
       console.log(accessToken) // your access token...
   });
 ```
 If you require an access token to run your e2e tests then `exchangeToken` will set and return a new access token.
 ```typescript
import { exchangeToken,getAccessToken, createOAuthHeaders } from "react-google-oauth2";

describe("test something...",  () => {
    Cypress.Commands.add("loginSSO",  (overrides = {}) => {
        Cypress.log({
            "name": "loginSSO",
        });
        // Fetche an access token before each tests only if there isn't one present
        if(!getAccessToken()) { 
            exchangeToken(CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET)
                .then(accessToken => {
                    cy.request({
                        method: 'GET',
                        url: `${API_URL}/staff`,
                        headers: createOAuthHeaders(),
                    });
                });
        }
    });
    beforeEach(() => {
        cy.loginSSO(); 
    });
});

 ```

### Flask-JWT-Router
If you are using Flask as your REST api framework then this library is designed to work
directly with `flask-jwt-router`. See [Flask JWT Router](https://github.com/joegasewicz/flask-jwt-router)
for more details.


### Styling
To Style the `<button>` element with CSS, use `google-oauth-btn` selector. For example:
```
.google-oauth-btn {
    color: red;
    background-color: lime;
}
```
(you can also pass your css selectors directly with Reacts' `className` prop)
