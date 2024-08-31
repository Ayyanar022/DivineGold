
import { IoMdHome } from "react-icons/io"; // home icon
import { BiSolidCategoryAlt } from "react-icons/bi"; // explore icon
import { BiSolidComponent } from "react-icons/bi"; // fairprice icon
import { FaUserCircle } from "react-icons/fa"; // userProfile icon
import { FaBlackTie } from "react-icons/fa"; // contect us icon

export const navigation = [
  { label: "Home", href: "/", icon: <IoMdHome />},
  { label: "Explore", href: "explore", icon: <BiSolidCategoryAlt /> },
  { label: "Fair Price", href: "fairPrice", icon: <BiSolidComponent /> },
  { label: "User", href: "user-profile", icon: <FaUserCircle /> },
  { label: "Contact Us", href: "contectInfo", icon: <FaBlackTie /> },

]

export const mobileNav = [
 
  ...navigation
]