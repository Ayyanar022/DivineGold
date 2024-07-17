import React from 'react'
import { useGetAllFairPrice } from '../../api/FairPriceApi'

const FairPrice = () => {

  const { fairPriceCardData, isLoading } = useGetAllFairPrice()
  console.log("fairPriceCardData", fairPriceCardData)

  return (
    <div>
      FairPrice
      FairPrice
    </div>
  )
}

export default FairPrice
