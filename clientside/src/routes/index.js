import { createBrowserRouter } from "react-router-dom";
import Home from ".././pages/Home";
import App from "../App";
import Explore from "../pages/explore/Explore";
import FairPrice from "../pages/fairPrice/FairPrice";
import ContectInfo from "../pages/contectInfo/ContectInfo";
import UserProfil from "../pages/UserProfil";
import Admin from "../pages/admin/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "explore", element: <Explore /> },
      { path: "fairPrice", element: <FairPrice /> },
      { path: "contectInfo", element: <ContectInfo /> },
      { path: "userProfil", element: <UserProfil /> },
      { path: "admin", element: <Admin /> },

    ],
  },
]);

export default router;
