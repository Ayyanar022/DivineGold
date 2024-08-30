import React from 'react'

import ring from '../../asserts/jewll designs/Ring.webp'
import bangle from '../../asserts/jewll designs/Bangle1.jpeg'
import bracelet from '../../asserts/jewll designs/Braclet3.png'
import chain from '../../asserts/jewll designs/Chain1.png'
import coin from '../../asserts/jewll designs/coin1.webp'
import earing from '../../asserts/jewll designs/earing2.jpg'
import necklace from '../../asserts/jewll designs/Necklace1.jpg'
import haram from '../../asserts/jewll designs/Haram1.webp'
import pendent from '../../asserts/jewll designs/Pendent2.jpg'
import bralet2 from '../../asserts/jewll designs/Bracelet2.avif'
import JewllCategoryCard from './JewllCategoryCard';
import { Link } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md'

const JewllCategory = () => {
    return (
        <div className='container mx-auto py-6 md:py-9 lg:py-10 md:mt-5 md:px-12 bg-[#faf0f8]'>

            <div className=' md:pb-5   w-full  '>
                <div className="flex flex-col items-center justify-center gap-2  md:gap-3 ">
                    <h1 className=" hidden md:block text-center   md:text-2xl lg:text-[30px] text-amber-600 font-bold">
                        Discover Unmatched Jewelry Prices and Rates
                    </h1>
                    <h1 className=" md:hidden text-center text-lg  text-amber-600 font-bold">
                        Discover Unmatched Rates
                    </h1>


                    <Link
                        to="/fairPrice"
                        className="relative flex items-center gap-1 md:gap-4 text-md text-gray-700 md:px-4 md:py-2 transition-colors duration-300 hover-move hover:text-amber-600"
                    >
                        <p className="md:text-lg font-semibold tracking-wider cursor-pointer relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-amber-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                            Explore
                        </p>
                        <span className="cursor-pointer flex items-center justify-center">
                            <MdKeyboardArrowRight className="text-lg text-amber-500 md:text-2xl" />
                        </span>
                    </Link>


                </div>
                {/* <h2 className=' hidden  md:block text-[14px] md:text-[16px] text-gray-600 text-center py-2'>Explore our jewelry collection by category and type to find the best market prices. Simply select an item, enter the weight, and discover the most competitive rates instantly</h2> */}
                <h2 className='  text-justify md:text-center  text-[14px] md:text-[16px] text-gray-600 px-1 py-2'>Explore our jewelry by category and type to find the best market prices. Select an item, enter the weight, and see competitive rates instantly.</h2>
            </div>

            <div className='flex gap-6 overflow-x-auto scrollbar-hiden p-3'>
                <JewllCategoryCard img={ring} name={"Ring"} />
                <JewllCategoryCard img={bangle} name={"Bangle"} />
                <JewllCategoryCard img={bracelet} name={"Bracelet"} />
                <JewllCategoryCard img={chain} name={"Chain"} />
                <JewllCategoryCard img={earing} name={"Earing"} />
                <JewllCategoryCard img={necklace} name={"Necklace"} />
                <JewllCategoryCard img={haram} name={"Haram"} />
                <JewllCategoryCard img={pendent} name={"Pendent"} />
                <JewllCategoryCard img={bralet2} name={"Bracelet"} />
                <JewllCategoryCard img={coin} name={"Coin"} />
            </div>
        </div>
    )
}

export default JewllCategory
