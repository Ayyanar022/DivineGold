
import { IoMdHome } from "react-icons/io"; // home icon
import { BiSolidCategoryAlt } from "react-icons/bi"; // explore icon
import { BiSolidComponent } from "react-icons/bi"; // fairprice icon
import { FaUserCircle } from "react-icons/fa"; // userProfile icon
import { FaBlackTie } from "react-icons/fa"; // contect us icon

export const navigation = [
  { label: "Explor", href: "explore", icon: <BiSolidCategoryAlt /> },
  { label: "Fair Price", href: "fairPrice", icon: <BiSolidComponent /> },
  { label: "User", href: "userProfil", icon: <FaUserCircle /> },
  { label: "Contect Us", href: "contectInfo", icon: <FaBlackTie /> },
]

export const mobileNav = [
  {
    label: "Home", href: "/", icon: <IoMdHome />
  },
  ...navigation
]