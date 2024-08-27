import React from 'react'

const FairPriceCard = ({ data }) => {
    return (
        <div className='fair-price-card p-4 border h-60 md:h-64  rounded shadow cursor-pointer hover:scale-105 transition-all' >
            <img src={data.item_Image} alt={data.itemName} className='w-full h-[73%] md:h-40 object-cover mb-4 rounded ' />
            <h2 className='md:text-md lg:text-lg text-slate-800 font-semibold border-t-2 border-[#efe3e3]'>{data.itemName}</h2>
            <p className='text-gray-600 text-sm md:text-md pb-1'>{data.category}</p>
        </div>
    )
}

export default FairPriceCard
