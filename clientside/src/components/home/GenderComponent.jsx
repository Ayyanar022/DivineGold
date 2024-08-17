import React from 'react'
import men1 from '../../asserts/Gender images/men2.webp'
import women from '../../asserts/Gender images/woemn1.webp'
import boybaby from '../../asserts/Gender images/childboy1.webp'
import girlbaby from '../../asserts/Gender images/childgirl1.avif'
import GenderCard from './GenderCard'


const GenderComponent = () => {
    return (
        <div className='container mx-auto py-4 md:py-8 '>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-amber-600  text-center">
                Shop by Gender: Find Your Ideal Jewelry
            </h2>
            <p className="text-[13px]  md:text-[16px] lg:text-[18px] text-gray-600 text-center pb-7">
                Browse our jewelry selection by gender to discover styles that match your identity and taste.
            </p>

            <div className='flex flex-wrap md:gap-2 gap-1 lg:gap-5 justify-around w-full '>

                <GenderCard img={men1} name="Men" />
                <GenderCard img={women} name="Women" />
                <GenderCard img={boybaby} name="BoyBaby" />
                <GenderCard img={girlbaby} name="GirlBaby" />
            </div>
        </div>
    )
}

export default GenderComponent
