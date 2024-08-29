import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const Admin = () => {


  return (
    <div className=' min-h-[calc(100vh-95px)] hidden lg:flex'>
      <aside className='fixed top-0 left-0 w-56  overflow-y-auto border-r h-full shadow'>
        <div className='w-full flex flex-col  items-center mt-7'>

          <NavLink
            className={({ isActive }) => `hover:bg-slate-100 w-full py-3 text-center 
            uppercase font-semibold text-[15px] text-slate-800 transition-all duration-150
             hover:text-pink-500 ${isActive && 'text-pink-700  bg-slate-200'}`}
            to="CustomerSale" >
            Customer Sale
          </NavLink>

          <NavLink
            className={({ isActive }) => `hover:bg-slate-100 w-full py-3 text-center
             uppercase font-semibold text-[15px] text-slate-800 transition-all duration-150
            hover:text-pink-500 ${isActive && 'text-pink-700  bg-slate-200'}`}
            to="FilterSales" >
            Filter Sale
          </NavLink>



          <NavLink
            className={({ isActive }) => `hover:bg-slate-100 w-full py-3 text-center
             uppercase font-semibold text-[15px] text-slate-800 transition-all duration-150
           hover:text-pink-500 ${isActive && 'text-pink-700  bg-slate-200'}`}
            to="add-farerate" >
            Add FairPrice
          </NavLink>

          <NavLink
            className={({ isActive }) => `hover:bg-slate-100 w-full py-3 text-center
             uppercase font-semibold text-[15px] text-slate-800 transition-all duration-150
            hover:text-pink-500 ${isActive && 'text-pink-700  bg-slate-200'}`}
            to="Explore-card-item">
            Explore Card
          </NavLink>

          <NavLink
            className={({ isActive }) => `hover:bg-slate-100 w-full py-3 text-center
             uppercase font-semibold text-[15px] text-slate-800 transition-all duration-150
           hover:text-pink-500 ${isActive && 'text-pink-700  bg-slate-200'}`}
            to="ConstantsAdd">
            Constants
          </NavLink>
          
          <NavLink
            className={({ isActive }) => `hover:bg-slate-100 w-full py-3 text-center
             uppercase font-semibold text-[15px] text-slate-800 transition-all duration-150
           hover:text-pink-500 ${isActive && 'text-pink-700  bg-slate-200'}`}
            to="allcustomerList" >
            All Customer
          </NavLink>

        </div>
      </aside>

      {/* <div className='p-2 w-full h-full ml-52'> */}
      <div className='flex-1 p-2 h-full ml-[224px] overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default Admin
