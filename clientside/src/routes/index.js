
import App from "../App";
import Home from "../pages/Home";
import Explore from "../pages/explore/Explore";
import FairPrice from "../pages/fairPrice/FairPrice";
import ContectInfo from "../pages/contectInfo/ContectInfo";
import Admin from "../pages/admin/Admin";
import AuthCallBack from "../pages/AuthCallBack";
import UserProfilePage from '../pages/userProfile/UserProfilePage.jsx'
import Allcustomer from "../pages/admin/Allcustomer.jsx";
import AddFareRate from "../pages/admin/AddFareRate.jsx";
import { createBrowserRouter } from "react-router-dom";
import FairPriceDetails from "../pages/fairPrice/FairPriceDetails.jsx";


// const {} = useGetCurrentPrice

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "explore", element: <Explore /> },
      { path: "fairPrice", element: <FairPrice /> },
      { path: "contectInfo", element: <ContectInfo /> },      
      { path: "auth-callback", element: <AuthCallBack /> },
      { path: "user-profile", element: <UserProfilePage />},
      { 
        path: "admin-chan",
        element: <Admin />,
        children:[
          { path: "allcustomerList", element: <Allcustomer />},
          { path: "add-farerate", element: <AddFareRate />}
        ]
       },
       { path: "fairPrice-details/:itemName/:category",element:< FairPriceDetails />}
    ],
  },
])

export default router;

