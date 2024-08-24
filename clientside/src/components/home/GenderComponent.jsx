import React from 'react'
import men1 from '../../asserts/Gender images/Razor Edge Band - Platinum _ 6mm _ Matte.jpeg'
import women from '../../asserts/Gender images/download.jpeg'
import boybaby from '../../asserts/Gender images/childboy2.avif'
import girlbaby from '../../asserts/Gender images/download (2).jpeg'
import GenderCard from './GenderCard'


const GenderComponent = () => {
    return (
        <div className='container mx-auto py-4 md:py-6 px-1 bg-slate-100 '>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-amber-600  text-center">
                Search by Gender: Find Your Ideal Jewelry
            </h2>
            <p className="text-[13px]  md:text-[16px] lg:text-[18px] text-gray-600 text-center pb-7">
                Browse our jewelry selection by gender to discover styles that match your identity and taste.
            </p>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-10 lg:mx-6'>

                <GenderCard img={men1} name="Men" />
                <GenderCard img={women} name="Women" />
                <GenderCard img={boybaby} name="BoyBaby" />
                <GenderCard img={girlbaby} name="GirlBaby" />
            </div>
        </div>
    )
}

export default GenderComponent
