import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export function Auth0ProviderWithNavigate({ children }) {
    const navigate = useNavigate();

    function onRedirectCallback(appState) {
        navigate(appState?.returnTo || window.location.pathname);
    }

    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

    if (!(domain && clientId && redirectUri)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
            }}
            onRedirectCallback={onRedirectCallback}
            useRefreshTokens
            cacheLocation="localstorage"
        >
            {children}
        </Auth0Provider>
    );
}
