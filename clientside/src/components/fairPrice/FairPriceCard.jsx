import React from 'react'

const FairPriceCard = ({ data }) => {
    return (
        <div className='fair-price-card p-4 border h-64  rounded shadow cursor-pointer hover:scale-105 transition-all' >
            <img src={data.item_Image} alt={data.itemName} className='w-full h-40 object-cover mb-4 rounded ' />
            <h2 className='text-lg font-semibold border-t-2 border-[#efe3e3]'>{data.itemName}</h2>
            <p className='text-gray-600'>{data.category}</p>
        </div>
    )
}

export default FairPriceCard
