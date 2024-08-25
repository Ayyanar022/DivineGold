
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();  

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  // const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
  const redirectUri = `http://localhost:3000`
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;


  if (!domain || !clientId || !redirectUri ||!audience) {
    throw new Error("Unable to initialise Auth");
  }

  const onRedirectCallback = () => {  
    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri ,audience}}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
