import React from 'react'
// import logo from '../asserts/goldlogopng.png';
import { Link, NavLink } from 'react-router-dom';
import { CiBag1 } from "react-icons/ci"; // bag icon
import { CiHeart } from "react-icons/ci"; // heart icon
import { FaUserCircle } from "react-icons/fa"; // userProfile icon
import { navigation } from '../constant/navigation';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../asserts/logo/apple-touch-icon.png'


const Header = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()

  return (
    <header className='fixed h-14  w-full border-b-2 z-40 shadow-sm bg-white'>
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
                <NavLink to={el.href} className={({ isActive }) => `px-1 tracking-wide font-semibold hover:text-amber-600 transition-all ${isActive && 'text-amber-700'}`}  >{el.label} </NavLink>
              </div>
            ))}
          </nav>
        </div>

        {/**for user icons and bag */}
        <div className='ml-auto '>
          <section className='flex justify-center gap-5 lg:mr-7 pr-2 text-xl items-center '>

            {isAuthenticated ? (
              <button className='text-sm font-semibold ' onClick={() => logout()}>Logout</button>
            ) : <button className='text-sm cursor-pointer font-semibold ' onClick={async () => await loginWithRedirect()}>Login</button>}


            {/* <p>{user?.email}</p> */}
            {isAuthenticated && <Link to={"/admin-chan/add-farerate"} className='cursor-pointer hidden lg:block'><FaUserCircle /> </Link>}
            <div> <CiHeart /> </div>
            <div> <CiBag1 /> </div>
          </section>
        </div>

      </div>
    </header>
  )
}

export default Header
