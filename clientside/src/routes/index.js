
import App from "../App";
import Home from "../pages/Home";
import Explore from "../pages/explore/Explore";
import FairPrice from "../pages/fairPrice/FairPrice";
import ContectInfo from "../pages/contectInfo/ContectInfo";
import Admin from "../pages/admin/Admin";
import AuthCallBack from "../pages/AuthCallBack";
import UserProfilePage from '../pages/userProfile/UserProfilePage.jsx'

const router = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "explore", element: <Explore /> },
      { path: "fairPrice", element: <FairPrice /> },
      { path: "contectInfo", element: <ContectInfo /> },
      { path: "admin", element: <Admin /> },
      { path: "auth-callback", element: <AuthCallBack /> },
      { path:"user-profile", element: <UserProfilePage />},
    ],
  },
];

export default router;
