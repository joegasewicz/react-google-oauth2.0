React Google OAuth 2.0

[![GitHub license](https://img.shields.io/github/license/joegasewicz/react-google-oauth2.0)](https://github.com/joegasewicz/react-google-oauth2.0/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/joegasewicz/react-google-oauth2.0)](https://github.com/joegasewicz/react-google-oauth2.0/issues)
![npm](https://img.shields.io/npm/v/react-google-oauth2)


Docs: https://joegasewicz.github.io/react-google-oauth2.0/

## Install
```bash
npm install react-google-oauth2
```


## Usage
```bash
import * as React from "react";
import * as ReactDOM from "react-dom";

import {  GoogleButton, IAuthorizationOptions } from "../src";

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
          <GoogleButton placeholder="demo/search.png" options={options} />
        </>
    );
}

ReactDOM.render(
    </App>,
    document.getElementById("main"),
);
```