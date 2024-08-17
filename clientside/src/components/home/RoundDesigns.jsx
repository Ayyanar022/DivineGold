import React from 'react'
// import img1 from '../../asserts/RoundedJewll/earing2.jpg'
// import img2 from '../../asserts/RoundedJewll/jumkas2.webp'
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

const RoundDesigns = () => {

    const imageArray = [img1, img2, img10, img8, img6, img9, img5, img7,];

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
                {imageArray.map((img, index) => (
                    <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36 object-scale-down' src={img} alt={img + "img1"} />

                ))}


                {/* <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img2} alt={img2 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img2} alt={img2 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img2} alt={img2 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img2} alt={img2 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img1} alt={img1 + "img1"} />
                <img className='rounded-full border shadow-lg p-2 w-20 bg-amber-200 h-20 md:w-32 md:h-32 lg:h-36 lg:w-36' src={img2} alt={img2 + "img1"} /> */}

            </div>

        </div>
    )

}

export default RoundDesigns
