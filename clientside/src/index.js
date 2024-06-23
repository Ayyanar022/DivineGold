import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,      
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode> 
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate >
        <RouterProvider router={router} />    
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </React.StrictMode>


);


reportWebVitals();
