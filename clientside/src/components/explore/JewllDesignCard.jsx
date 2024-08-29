import React from 'react'
import { Link } from 'react-router-dom'
import { CiBag1 } from "react-icons/ci"; // bag icon
import { useAddUpdateCart } from '../../api/CartApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cartSlice.js';

const JewllDesignCard = ({ item }) => {


    const { addUpdateCart, isLoading, } = useAddUpdateCart()
    const dispatch = useDispatch();

    const handleAaddtoCartfun = async (id, event) => {

        event.preventDefault() // to prevent navigation
        const data = await addUpdateCart(id)
        if (data?.success) {
            toast.success(data?.message.toString())
            dispatch(addItemToCart({ _id: id, quantity: 1 }));
        }
        if (!data?.success) {
            toast.warning(data?.message.toString())
        }
    }

    return (
        <Link to={`/JewllDesign-details/${item?._id}`} className=" h-[195px]  md:h-56 lg:h-[255px] shadow-md border  rounded-md overflow-hidden transform transition-transform duration-200 hover:scale-105">
            <img src={item?.jewellImage[0]} alt="img" className="w-full h-[72%] md:h-[76%] object-cover   " />

            <div className="px-2 py-2 md:py-1.5  bg-white flex">
                <div className='w-3/4 md:pl-1'>
                    <p className="text-[15px] md:text-md lg:text-lg font-semibold text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-full ">{item.jewellName}</p>
                    <p className="text-sm text-gray-500 ">{item.jewellType}</p>
                </div>

                <div className='w-1/4 flex justify-center items-center '>
                    <button onClick={(event) => handleAaddtoCartfun(item?._id, event)} className="bg-orange-400 hover:bg-orange-500 transition-all rounded-full p-1.5 md:p-2 "><CiBag1 /></button>
               </div>
            </div>
        </Link >

    )
}

export default JewllDesignCard
