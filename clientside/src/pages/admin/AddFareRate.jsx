import React, { useState } from 'react'
import UploadFairPrice from '../../components/admin/UploadFairPrice';

const AddFareRate = () => {

    const [openUploadFairPrice, setOpenUploadFairPrice] = useState(false);
    return (
        <div className=' w-full h-full container'>
            <div className=' flex justify-between px-4 py-2 items-center'>
                <h1>Fair Price</h1>
                <button onClick={() => setOpenUploadFairPrice(true)} className='bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded font-medium text-sm text-white'>Upload New</button>
            </div>

            {/**Upload product */}
            {openUploadFairPrice && <UploadFairPrice onClose={() => setOpenUploadFairPrice(false)} />}
        </div>
    )
}

export default AddFareRate
