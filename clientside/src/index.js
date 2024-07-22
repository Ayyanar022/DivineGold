

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import {  RouterProvider } from "react-router-dom";
import router from "./routes"; 
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "./context/userContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <QueryClientProvider client={queryClient}>
    <UserProvider >
   <RouterProvider router={router} />
    </UserProvider>
    </QueryClientProvider>  
);

reportWebVitals();

