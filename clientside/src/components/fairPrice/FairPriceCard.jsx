import React from 'react'

const FairPriceCard = ({ data }) => {
    return (
        <div className='fair-price-card p-4 border rounded shadow'>
            <img src={data.item_Image} alt={data.itemName} className='w-full h-40 object-cover mb-4 rounded' />
            <h2 className='text-lg font-semibold'>{data.itemName}</h2>
            <p className='text-gray-600'>{data.category}</p>
        </div>
    )
}

export default FairPriceCard
