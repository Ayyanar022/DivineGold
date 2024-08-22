import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { Bounce, ToastContainer } from "react-toastify";
import store from "./store/store";
import { Provider, useDispatch } from "react-redux";
import { useGetCartItem } from "./api/CartApi";
// import { useGetCurrentPrice } from "./api/AdminApi";
import {  setCartItems } from './store/cartSlice.js';
import { useEffect } from "react";

function App() {



  return (
    <Provider store={store} >

 
    <Auth0ProviderWithNavigate>
      <CartInitializer />

      {/* <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      /> */}

    <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ maxWidth: "320px", width: "90%" }} // Adjust container size
    />
  
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-14 mb-12 ">
          <Outlet />
        </main>
        <Footer className="mt-auto hidden lg:block" />
        <MobileNav />
      </div>
    
    </Auth0ProviderWithNavigate>
    </Provider>
  );
  }


  function CartInitializer(){
    const { cartData } = useGetCartItem()
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (cartData?.cartItems) {
  
          dispatch(setCartItems(cartData?.cartItems));
      }
  }, [cartData, dispatch])

  return null
  }

export default App;


