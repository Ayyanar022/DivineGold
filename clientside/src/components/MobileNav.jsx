import React from 'react'
import { NavLink } from 'react-router-dom'
import { mobileNav } from '../constant/navigation'

const MobileNav = () => {
    return (
        <section className='lg:hidden w-full h-[53px] md:h-[55px]  bg-white border-t-2 bottom-0 fixed px-2 z-50 '>
            <div className='flex justify-between items-center h-full '>
                {
                    mobileNav.map((el, i) => (
                        <NavLink to={el.href} key={el.label + "mobNav"} className={({ isActive }) => `flex flex-col h-full items-center  justify-center ${isActive && 'text-pink-700 font-bold'}`} >
                            <div>{el?.icon}</div>
                            <sapn className="text-xs">{el?.label}</sapn>
                        </NavLink>
                    ))
                }
            </div>
        </section>
    )
}

export default MobileNav
