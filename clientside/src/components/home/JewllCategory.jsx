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

const JewllCategory = () => {
    return (
        <div className='container mx-auto py-6 md:py-9 lg:py-10 md:px-12'>

            <div className="text-center mb-6">
                <h1 className='text-center text-xl md:text-3xl  text-amber-600 font-semibold'>Discover the Best Market Prices</h1>
                <p className="text-[13px]  md:text-[16px] text-gray-600 mt-2">
                    Discover a curated selection of jewelry categories, each offering exquisite designs to suit every style. Browse through our diverse collections and find the perfect piece for any occasion.
                </p>
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
