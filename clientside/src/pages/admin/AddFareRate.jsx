import React, { useState } from 'react'
import UploadFairPrice from '../../components/admin/UploadFairPrice';
import { useCreateFairPriceItem, useUpdateCurrentPrice } from '../../api/AdminApi';
import { toast } from 'react-toastify';

const AddFareRate = () => {

    const { createFairPrice, isLoading, isSuccess, isError } = useCreateFairPriceItem()

    const [openUploadFairPrice, setOpenUploadFairPrice] = useState(false);
    const [currentPrice, setCurrentPrice] = useState('')
    const { updateCurrentPrice, isSuccess: CPisSuccess, isLoading: CPisLoaing } = useUpdateCurrentPrice()

    const hanleUpdateCurrentPrice = (e) => {
        e.preventDefault()
        console.log("hello")
        updateCurrentPrice(currentPrice)
        if (CPisSuccess) {
            toast.success("CP Updated successfull..")
        }
    }


    return (
        <div className=' w-full h-full container'>
            {/** TO ADD CURRENT RATE */}
            <div className='flex justify-center  border-b-2 pb-3'>
                <div className='shadow-md '>
                    <form className='flex  flex-1 gap-2 p-3'>
                        {/* <label className='p-1'>Current Price:</label> */}
                        <input className='p-1 px-2 outline-none border shadow-md' placeholder='Current Price' value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} />
                        <button className='p-1 bg-pink-500 hover:bg-pink-600 px-2 rounded-md text-white' onClick={hanleUpdateCurrentPrice} >Update Current Price</button>
                    </form>
                </div>
            </div>

            <div className=' flex justify-between px-4 py-2 items-center'>
                <h1>Fair Price</h1>
                <button onClick={() => setOpenUploadFairPrice(true)} className='bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded font-medium text-sm text-white'>Upload New</button>
            </div>

            {/**Upload product */}
            {openUploadFairPrice && <UploadFairPrice
                createFairPrice={createFairPrice}
                isCreateLoading={isLoading}
                iscreateSuccess={isSuccess}
                onClose={() => setOpenUploadFairPrice(false)} />}
        </div>
    )
}

export default AddFareRate
