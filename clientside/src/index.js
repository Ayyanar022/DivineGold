import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0ProviderWithNavigate >
      <RouterProvider router={router} />    
    </Auth0ProviderWithNavigate>
  </React.StrictMode>


);


reportWebVitals();
