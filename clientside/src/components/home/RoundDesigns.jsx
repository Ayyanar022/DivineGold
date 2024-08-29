import React from 'react'

import img1 from "../../asserts/jewllsRound/bangle.jpeg"
import img2 from "../../asserts/jewllsRound/bangle2.webp"
import img3 from "../../asserts/jewllsRound/stone.jpeg"
import img4 from "../../asserts/jewllsRound/design.jpeg"
import img5 from "../../asserts/jewllsRound/drops2.webp"
import img6 from "../../asserts/jewllsRound/images.jpeg"
import img7 from "../../asserts/jewllsRound/necklace.webp"
import img8 from "../../asserts/jewllsRound/org23l56.jpg"
import img9 from "../../asserts/jewllsRound/pendent.jpg"
import img10 from "../../asserts/jewllsRound/pendent2.jpg"
import img11 from "../../asserts/jewllsRound/vinayaga.jpeg"

import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom'

const RoundDesigns = () => {

    const imageArray = [img1, img2, img10, img8, img11, img6, img9, img5, img7, img3, img4];

    return (
        <div className='container mx-auto  py-6'>
            <div className='w-full flex items-center '>

                <div className=' md:py-5  w-full  '>
                    <div className="flex flex-col items-center justify-center gap-2  md:gap-3 ">
                        <h1 className="text-center text-lg  md:text-2xl lg:text-[30px] text-amber-600 font-bold">
                            New Design Collections
                        </h1>

                        <Link
                            to="/explore"
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
                    <h2 className=' hidden md:block text-[14px] md:text-[16px] text-gray-600 text-center py-2'>Browse through your favorite designs  we got all designs </h2>
                    <h2 className='block md:hidden text-[14px] md:text-[16px] text-gray-600 text-center py-2'>Browse through your favorite designs</h2>
                    
                </div>

            </div>
            <div className='flex overflow-x-auto gap-6 scrollbar-hiden py-3 md:py-5' >
                {imageArray.map((img, index) => (
                    <img className='rounded-full border border-yellow-400 p-1 md:p-2 w-[110px] bg-amber-200 h-[110px] md:w-32 md:h-32 lg:h-36 lg:w-36 object-cover' src={img} alt={img + "img1"} />

                ))}

            </div>

        </div>
    )

}

export default RoundDesigns
