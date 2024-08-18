import React from 'react'
import { Link } from 'react-router-dom'
import { CiBag1 } from "react-icons/ci"; // bag icon
import { CiHeart } from "react-icons/ci"; // heart icon

const JewllDesignCard = ({ item }) => {

    return (
        <Link to={`/JewllDesign-details/${item?._id}`} className="  h-52   md:h-64 shadow-md border m-2 rounded-lg overflow-hidden transform transition-transform hover:scale-105">
            <img src={item?.jewellImage[0]} alt="img" className="w-full h-32 md:h-40 object-cover mb-4 rounded p-1 " />
            <div className="px-2 py-1 border-t">
                <p className="text-md md:text-lg font-semibold text-gray-700 ">{item.jewellName}</p>
                <div className='flex justify-between'>
                    <p className="text-sm text-gray-500 ">{item.jewellType}</p>
                    <div className='flex gap-1.5 md:gap-3'>
                        <spam className="text-xs md:text-lg p-1 bg-green-300 hover:bg-green-500 transition-all rounded-full"><CiHeart /></spam>
                        <spam className=" text-xs md:text-lg p-1 bg-orange-300 hover:bg-orange-500 transition-all rounded-full"><CiBag1 /></spam>

                    </div>

                </div>

            </div>
        </Link>

    )
}

export default JewllDesignCard
