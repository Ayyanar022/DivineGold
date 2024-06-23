import React from 'react'
import {Auth0Provider} from "@auth0/auth0-react";

const Auth0ProviderWithNavigate = ({children}) => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

    if(!domain && !clientId && !redirectUri){
            throw new Error("Unable to initialise Auth")
    }

    const onRedirectCallback = (appState,user)=>{
        console.log("user",user)
    }

  return (
<Auth0Provider domain={domain} clientId={clientId} authorizationParams={{redirect_uri:redirectUri}} 
onRedirectCallback={onRedirectCallback}
>
    {children}
</Auth0Provider>
  )
}

export default Auth0ProviderWithNavigate
