import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetFairPriceDetailsData } from '../../api/FairPriceApi'


const FairPriceDetails = () => {

    const { itemName, category } = useParams()
    const { fairPriceDetails, isLoading: cardDetailsLoding } = useGetFairPriceDetailsData(itemName, category)
    // const { item_Image, item_category, touch_75, touch_92 } = fairPriceDetails?.data
    const details = fairPriceDetails?.data
    console.log("details", details)


    return (
        <div className='container mx-auto '>
            {cardDetailsLoding ? <h1>Loading...</h1> : (
                <div className='flex items-center justify-center'>
                    <div className='w-1/2 h-full p-4 '>

                        {!cardDetailsLoding && <img src={details?.item_Image} alt={details?.item_category} />}
                    </div>
                    <div className='w-1/2 p-4 bg-gray-100 h-full'>
                        <h2></h2>                        

                    </div>
                </div>
            )}


        </div>
    )
}

export default FairPriceDetails
