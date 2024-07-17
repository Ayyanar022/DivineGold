import React from 'react'
import { useGetAllFairPrice } from '../../api/FairPriceApi'
import FairPriceCard from '../../components/fairPrice/FairPriceCard'

const FairPrice = () => {

  const { fairPriceCardData, isLoading } = useGetAllFairPrice()
  console.log("fairPriceCardData", fairPriceCardData)

  return (
    <div className='container mx-auto p-4'>
      <div>
        <div className='mb-4 text-xl font-semibold'>Category</div>
        <div className='grid gap-4 lg:grid-cols-5 sm:grid-cols-2 grid-cols-1'>
          {!isLoading && fairPriceCardData?.map((item) => (
            <FairPriceCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FairPrice
