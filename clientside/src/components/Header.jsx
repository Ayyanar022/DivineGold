import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { CiBag1 } from "react-icons/ci"; // bag icon
import { FaUserCircle } from "react-icons/fa"; // userProfile icon
import { navigation } from '../constant/navigation';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../asserts/logo/apple-touch-icon.png'
import { useSelector } from 'react-redux';
import { useGetMyUser } from '../api/MyUserApi';

const Header = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()
  const totalQuantity = useSelector(state => state?.cart?.totalQuantity);

  const { currentUser, isLoading: isUpdateLoading, refetch: refetchUserData } = useGetMyUser()

  const isAdmin = currentUser && currentUser?.role === "ADMIN_AYAN"
  console.log("currentUser", currentUser?.role)



  return (
    <header className='fixed h-[60px] md:h-16  w-full border-b-2 z-40 shadow-sm bg-white'>
      <div className='  mx-auto px-2  flex items-center h-full'>

        <div className='flex items-center  lg:mr-10'>
          <Link to={"/"}>
            <img src={logo} alt="logo-img" width={45} className='cursor-pointer m-3 ' />
          </Link>
          <h2 className=' text-2xl cursor-pointer font-serif tracking-wider'>DivineGold</h2>
        </div>

        <div className='mx-auto'>
          <nav className='hidden lg:flex gap-7  items-center'>
            {navigation?.map((el, i) => (
              <div key={el.label}>
                <NavLink to={el.href} className={({ isActive }) => `px-1 tracking-wide font-semibold text-md hover:text-amber-600 transition-all ${isActive && 'text-amber-700'}`}  >{el.label} </NavLink>
              </div>
            ))}
          </nav>
        </div>

        {/**for user icons and bag */}
        <div className='ml-auto '>
          <section className='flex justify-center gap-5 lg:mr-7 pr-2 text-xl items-center '>

            {isAuthenticated ? (
              <button className='text-[16px] font-semibold ' onClick={() => logout()}>Logout</button>
            ) : <button className='text-[16px] cursor-pointer font-semibold ' onClick={async () => await loginWithRedirect()}>Login</button>}


            {isAuthenticated && isAdmin && (<Link to={"/admin-chan/CustomerSale"} className='cursor-pointer hidden lg:block'><FaUserCircle /> </Link>)}

            <Link to={"/CartPage"} className='hover:bg-slate-200 transition-all rounded-full p-1 relative' > <CiBag1 />
              <span className='absolute w-4 flex items-center justify-center h-4  text-[10px] bg-red-500  rounded-full  -top-0.5 -right-1 text-white'> {totalQuantity}</span>
            </Link>
          </section>
        </div>

      </div>
    </header>
  )
}

export default Header
