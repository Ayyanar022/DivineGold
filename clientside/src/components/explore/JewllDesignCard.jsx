import React from 'react'
import { Link } from 'react-router-dom'
import { CiBag1 } from "react-icons/ci"; // bag icon
import { CiHeart } from "react-icons/ci"; // heart icon
import { useAddUpdateCart } from '../../api/CartApi';

const JewllDesignCard = ({ item }) => {



    const { addUpdateCart, isLoading } = useAddUpdateCart()

    const handleAaddtoCartfun = (id, event) => {

        event.preventDefault() // to prevent navigation
        addUpdateCart(id)
    }

    return (
        <Link to={`/JewllDesign-details/${item?._id}`} className="  h-52   md:h-56 lg:h-60 shadow-md border m-2 rounded-lg overflow-hidden transform transition-transform hover:scale-105">
            <img src={item?.jewellImage[0]} alt="img" className="w-full h-32  md:h-36 lg:h-40  object-cover mb-4 rounded p-1 " />

            <div className="px-2 py-1 bg-white flex">
                <div className='w-3/4'>
                    <p className="text-md md:text-lg font-semibold text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-full ">{item.jewellName}</p>
                    <p className="text-sm text-gray-500 ">{item.jewellType}</p>

                </div>

                <div className='w-1/4 flex justify-center items-center '>
                    <button onClick={(event) => handleAaddtoCartfun(item?._id, event)} className="bg-orange-400 hover:bg-orange-500 transition-all rounded-full p-2 "><CiBag1 /></button>
                </div>

            </div>
        </Link>

    )
}

export default JewllDesignCard
