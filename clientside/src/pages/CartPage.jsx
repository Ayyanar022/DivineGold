
import React, { useEffect, useState } from 'react'
import { useAddUpdateCart, useGetCartItem } from '../api/CartApi'
import { IoCloseSharp } from "react-icons/io5";
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import WhatsAppForCart from '../components/home/WhatsAppForCart';
import { GiPlantWatering } from "react-icons/gi";

import { useDispatch } from 'react-redux';
import { removeItemToCart, addItemToCart, } from '../store/cartSlice.js';

const CartPage = () => {

    const { cartData, isLoading: cartIsLoading, refetch } = useGetCartItem()
    console.log("cartData", cartData?.cartItems)
    const { getAccessTokenSilently } = useAuth0()
    const dispatch = useDispatch();



    //DELETE CART ITEM
    const handleDelete = async (id, qty, refetch) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:7000/api/cart`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            })
            if (!response.ok) throw new Error("Somthing went wrong")
            dispatch(removeItemToCart({ _id: id, quantity: -qty }));

            refetch()
        } catch (err) {
            console.log("error", err)
        }
    }

    // INCRESE COUNT
    const { addUpdateCart, isLoading: increseIsLoaing } = useAddUpdateCart()

    const handleAaddtoCartfun = async (id, qty, event) => {
        event.preventDefault() // to prevent navigation

        if (qty >= 3) {
            toast.info("Max quantity is 3")
            return;
        }
        await addUpdateCart(id)
        dispatch(addItemToCart({ _id: id, quantity: 1 }));
        refetch()
    }

    // DECRESE COUNT---------------------
    const decresecount = async (id, qty, refetch) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:7000/api/cart`, {
                method: 'put',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, qty })
            })
            if (!response.ok) throw new Error("Something went wrong")
            dispatch(removeItemToCart({ _id: id, quantity: -1 }));
            refetch()
        } catch (err) {
            console.log("error", err)
        }
    }


    const handleRemovetoCartfun = async (id, qty, event) => {
        event.preventDefault() // to prevent navigation

        if (qty > 0) {
            const dec = 1
            decresecount(id, dec, refetch);

            return
        } else {
            return
        }
    }

    //------------------------------------------------

    const [whatsappData, setWhatsAppData] = useState([])

    // FORMATING AND SET AS A MESSAGE    
    const handleCheckOut = () => {
        if (cartData?.cartItems?.length <= 3 && cartData?.cartItems?.length > 0) {

            const formattedItems = cartData?.cartItems?.map((item, index) =>
                `${index + 1}. ${item?.productId?.jewellName}  Qty :${item.quantity}`
            )
            setWhatsAppData(formattedItems);
        } else {
            toast.warning("Max 3 items only..");
        }
    }

    const emptyLoading = cartIsLoading ? "Bag is Loading..." : "Bag is Empty ";


    return (
        <div className='container mx-auto py-5 lg:py-10 px-6 lg:px-20 flex flex-col md:flex-row gap-10 lg:gap-14 min-h-screen'>
            <div className=' flex flex-col gap-4  w-full md:w-1/2 '>

                {
                    cartData?.cartItems?.length > 0 ? (cartData?.cartItems?.map((item, index) => (
                        <div key={index} className='flex bg-gray-100 border shadow-md p-2 md:p-3 relative'>
                            <img src={item?.productId?.jewellImage[0]} className='w-28 md:w-32 h-28 md:h-32 ' alt='Jewelry Image' />
                            <div className='px-3 flex flex-col gap-1'>
                                <h2 className='text-sm md:lg'>Name    : {item?.productId?.jewellName}</h2>
                                <p className='text-sm md:lg'>Category : {item?.productId?.jewellCategory}</p>
                                <p className='text-sm md:lg'>Type     : {item?.productId?.jewellType}</p>
                                <div className='py-3 flex items-center gap-3'>
                                    <button onClick={(event) => handleAaddtoCartfun(item?.productId?._id, item?.quantity, event)} className='text-lg md:text-xl font-bold h-6 w-6 md:h-7 :w-7  rounded-md bg-green-400 hover:bg-green-600 transition-all'>
                                        +
                                    </button>
                                    <p className='font-semibold'>
                                        {item?.quantity}
                                    </p>
                                    <button onClick={(event) => handleRemovetoCartfun(item?._id, item?.quantity, event)} className='text-lg md:text-xl font-bold h-6 w-6 md:h-7 :w-7 rounded-md bg-orange-400 hover:bg-orange-600 transition-all'>
                                        -
                                    </button>
                                </div>

                            </div>
                            <IoCloseSharp onClick={() => handleDelete(item?._id, item?.quantity, refetch)} className='absolute right-0 top-0 m-1 md:m-3 text-md md:text-xl  hover:text-red-500 cursor-pointer ' />
                        </div>
                    ))) : (

                        <h2 className='text-3xl py-16  bg-gray-100  shadow-lg text-center font-bold text-orange-500 flex gap-2 items-center justify-center'>{emptyLoading} <GiPlantWatering className='text-lime-500' /></h2>
                    )
                }
            </div>

            <div className='md:w-1/2  w-full flex flex-col  lg:bg-gray-100 lg:py-3'>
                <button onClick={handleCheckOut} className='text-center   font-bold text-lg lg:text-xl text-slate-900 px-4 py-2 lg:mx-10   bg-orange-400 hover:bg-orange-500 transition-all rounded-md'>CheckOut</button>
                <WhatsAppForCart data={whatsappData} />
            </div>
        </div>
    )
}

export default CartPage





