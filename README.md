[![GitHub license](https://img.shields.io/github/license/joegasewicz/react-google-oauth2.0)](https://github.com/joegasewicz/react-google-oauth2.0/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/joegasewicz/react-google-oauth2.0)](https://github.com/joegasewicz/react-google-oauth2.0/issues)
![npm](https://img.shields.io/npm/v/react-google-oauth2)

# React Google OAuth 2.0
Easily add Google OAuth 2.0 Single Sign On to a React app & let your server handle your access & refresh tokens.

Docs: https://joegasewicz.github.io/react-google-oauth2.0/

## Install
```bash
npm install react-google-oauth2
```


## Quick Start
```bash
import * as React from "react";
import * as ReactDOM from "react-dom";

import {  GoogleButton, IAuthorizationOptions } from "../src";

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
### Your Rest API endpoint details
The `GoogleButton` component will make the following request to your api:
```
POST options = {body: { code: <code> }} URL = `apiUrl`
```
