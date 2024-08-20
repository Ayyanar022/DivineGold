
import React from 'react'
import { useAddUpdateCart, useGetCartItem } from '../api/CartApi'
import { IoCloseSharp } from "react-icons/io5";
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';

const CartPage = () => {

    const { cartData, isLoading, refetch } = useGetCartItem()

    const { getAccessTokenSilently } = useAuth0()

    //DELETE CART ITEM
    const handleDelete = async (id, refetch) => {
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
        refetch()
    }


    //decrse fun
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

            refetch()
        } catch (err) {
            console.log("error", err)
        }
    }
    // DECRESE COUNT
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





    return (
        <div className='container mx-auto py-10 px-20'>
            <div className=' flex flex-col gap-4 w-1/2 '>

                {
                    cartData?.cartItems?.length > 0 && cartData?.cartItems?.map((item, index) => (
                        <div key={index} className='flex bg-gray-100 border shadow-md p-3 relative'>
                            <img src={item?.productId?.jewellImage[0]} className='w-32 h-32 ' alt='Jewelry Image' />
                            <div className='px-3 flex flex-col gap-1'>
                                <h2>Name    : {item?.productId?.jewellName}</h2>
                                <p>Category : {item?.productId?.jewellCategory}</p>
                                <p>Type     : {item?.productId?.jewellType}</p>
                                <div className='py-3 flex items-center gap-3'>
                                    <button onClick={(event) => handleAaddtoCartfun(item?.productId?._id, item?.quantity, event)} className='text-xl font-bold h-7 w-7 rounded-md bg-green-400 hover:bg-green-600 transition-all'>
                                        +
                                    </button>
                                    <p className='font-semibold'>
                                        {item?.quantity}
                                    </p>
                                    <button onClick={(event) => handleRemovetoCartfun(item?._id, item?.quantity, event)} className='text-xl font-bold h-7 w-7 rounded-md bg-orange-400 hover:bg-orange-600 transition-all'>
                                        -
                                    </button>
                                </div>

                            </div>
                            <IoCloseSharp onClick={() => handleDelete(item?._id, refetch)} className='absolute right-0 top-0 m-3 text-xl  hover:text-red-500 cursor-pointer ' />
                        </div>
                    ))
                }



            </div>
        </div>
    )
}

export default CartPage





