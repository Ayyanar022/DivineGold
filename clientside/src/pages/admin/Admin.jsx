import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Admin = () => {


  return (
    <div className=' min-h-[calc(100vh-95px)] hidden lg:flex'>
      <aside className='max-w-56 w-full overflow-hidden border-r-2'>
        <div className='w-full flex flex-col gap-3 items-center mt-4'>

          <Link to="allcustomerList" >All Customer</Link>
          <Link to="add-farerate" >Add FairPrice</Link>
          <Link to="Explore-card-item">Explore Card</Link>
        </div>
      </aside>
      <div className='p-2 w-full h-full '>
        <Outlet />
      </div>
    </div>
  )
}

export default Admin
