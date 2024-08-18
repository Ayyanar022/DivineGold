import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { Bounce, ToastContainer } from "react-toastify";
// import { useGetCurrentPrice } from "./api/AdminApi";

function App() {


  // return (

  //   <Auth0ProviderWithNavigate>
    
  //   <ToastContainer
  //         position="bottom-right"
  //         autoClose={2000}
  //         hideProgressBar={false}
  //         newestOnTop
  //         closeOnClick
  //         rtl={false}
  //         pauseOnFocusLoss={false}
  //         draggable
  //         pauseOnHover
  //         theme="light"
  //         transition={Bounce}
  //         />

  //     <div className="pb-12 lg:pb-0 ">
  //     <Header />
  //     <main className="pt-14 min-h-[calc(100vh-40px)]  ">
  //     <Outlet />
  //     </main>
  //     <div className="hidden lg:block">
  //     <Footer />
  //     </div>
    
  //    <MobileNav />
  //   </div>

  // </Auth0ProviderWithNavigate>

  // );

  return (
    <Auth0ProviderWithNavigate>
      <ToastContainer
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
      />
  
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-14">
          <Outlet />
        </main>
        <Footer className="mt-auto hidden lg:block" />
        <MobileNav />
      </div>
    </Auth0ProviderWithNavigate>
  );
  

}

export default App;


