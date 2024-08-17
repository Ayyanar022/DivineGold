import React from 'react'
import img1 from '../../asserts/RoundedJewll/earing2.jpg'
import img2 from '../../asserts/RoundedJewll/jumkas2.webp'
import line1 from '../../asserts/linepng/line1.jpg'

const RoundDesigns = () => {
    return (
        <div className='container mx-auto py-4 md:py-6'>    
            <div className='w-full flex items-center '>
                <div className='py-5 w-full  '>
                    <h1 className='text-center text-xl md:text-3xl  text-amber-600 font-semibold'>New Design collections</h1>
                    <h2 className=' text-xs md:text-lg text-center'>Browse through your favorite designs . we got all designs </h2>
                    <hr class="border-t border-gray-300 my-4 md:my-5  "></hr>
                </div>



            </div>
            <div className='flex overflow-x-auto gap-6 scrollbar-hiden ' >
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />

            </div>

        </div>
    )
}

export default RoundDesigns
