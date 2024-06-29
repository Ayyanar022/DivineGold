// import React from 'react'
// import {Auth0Provider} from "@auth0/auth0-react";
// import { useNavigate } from 'react-router-dom';

// const Auth0ProviderWithNavigate = ({children}) => {


// const navigate = useNavigate()

//     const domain = process.env.REACT_APP_AUTH0_DOMAIN;
//     const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
//     const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

//     if(!domain && !clientId && !redirectUri){
//             throw new Error("Unable to initialise Auth")
//     }

//     const onRedirectCallback = (appState,user)=>{
//        navigate("/auth-callback")
//       // navigate(appState?.returnTo || window.location.pathname);
//     }

//   return (
//     <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{redirect_uri:redirectUri}} 
//     onRedirectCallback={onRedirectCallback} >
//            {children}
//     </Auth0Provider>
//   )
// }

// export default Auth0ProviderWithNavigate



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMyUser } from '../api/MyUserApi.js';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();  

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("Unable to initialise Auth");
  }

  const { createUser } = useCreateMyUser();

  const onRedirectCallback = (appState, user) => {
    if (user?.sub && user?.email) {
      createUser({ auth0Id: user?.sub, email: user.email });
    }
    // navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
