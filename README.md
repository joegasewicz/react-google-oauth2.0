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
} from "../src";

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
POST options = {body: { code: <code>, email: <email>, scope: <scope> }} URL = `apiUrl`
```

### Flask-JWT-Router
If you are using Flask as your REST api framework then this library is designed to work
directly with `flask-jwt-router`. See [Flask JWT Router](https://github.com/joegasewicz/flask-jwt-router)
for more details.