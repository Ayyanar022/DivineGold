import React from 'react'

import img1 from "../../asserts/jewllsRound/bangle.jpeg"
import img2 from "../../asserts/jewllsRound/bangle2.webp"
import img3 from "../../asserts/jewllsRound/chanin.webp"
import img4 from "../../asserts/jewllsRound/drops.webp"
import img5 from "../../asserts/jewllsRound/drops2.webp"
import img6 from "../../asserts/jewllsRound/images.jpeg"
import img7 from "../../asserts/jewllsRound/necklace.webp"
import img8 from "../../asserts/jewllsRound/org23l56.jpg"
import img9 from "../../asserts/jewllsRound/pendent.jpg"
import img10 from "../../asserts/jewllsRound/pendent2.jpg"

import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom'

const RoundDesigns = () => {

    const imageArray = [img1, img2, img10, img8, img6, img9, img5, img7, img3, img4];

    return (
        <div className='container mx-auto  py-6'>
            <div className='w-full flex items-center '>

                <div className=' md:py-5  w-full  '>
                    <div className="flex flex-col items-center justify-center gap-2  md:gap-6 ">
                        <h1 className="text-center text-xl sm:text-2xl md:text-3xl text-amber-600 font-bold">
                            New Design Collections
                        </h1>

                        <Link
                            to="/explore"
                            className="relative flex  items-center gap-2 text-md h-7 text-gray-700 md:px-4 md:py-2 transition-colors duration-300 hover-move hover:text-amber-600"
                        >
                            <p className="md:text-lg font-semibold tracking-wider cursor-pointer after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-amber-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                                Explore
                            </p>
                            <span className="cursor-pointer">
                                <MdKeyboardArrowRight className="w-7 p-1 lg:p-2 h-7 md:h-8 md:w-8 lg:h-9 lg:w-9" />
                            </span>
                        </Link>


                    </div>
                    <h2 className=' text-[14px] md:text-[16px] text-gray-600 text-center py-2'>Browse through your favorite designs . we got all designs </h2>
                    <hr class="border-t border-gray-300 my-4 md:my-5  "></hr>
                </div>

            </div>
            <div className='flex overflow-x-auto gap-6 scrollbar-hiden ' >
                {imageArray.map((img, index) => (
                    <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36 object-scale-down' src={img} alt={img + "img1"} />

                ))}

            </div>

        </div>
    )

}

export default RoundDesigns
