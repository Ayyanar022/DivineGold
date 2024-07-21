import React from 'react'
import { useParams } from 'react-router-dom'

const FairPriceDetails = () => {

    const { itemName, category } = useParams()

    console.log("itemName", itemName, "category", category)


    return (
        <div>
            FairPriceDetails

        </div>
    )
}

export default FairPriceDetails
