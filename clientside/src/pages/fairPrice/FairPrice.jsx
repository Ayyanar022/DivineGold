import React, { useEffect, useState } from 'react'
import { useGetAllFairPrice } from '../../api/FairPriceApi'
import FairPriceCard from '../../components/fairPrice/FairPriceCard'

const FairPrice = () => {

  const { fairPriceCardData, isLoading } = useGetAllFairPrice()
  console.log("fairPriceCardData", fairPriceCardData)


  return (
    <div className='container mx-auto w-full lg:px-9 py-1 sm:px-3 '>

      <div className='flex '>
        {fairPriceCardData?.map((item) => (
          <div key={item.id} className='cursor-pointer flex flex-col justify-center items-center  w-full md:w-1/3 p-2'>
            <div className='h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden p-2 bg-slate-200 flex items-center justify-center'>
              <img
                src={item?.item_Image}
                alt={item?.itemName}
                className='w-full h-full object-scale-down mix-blend-multiply transform hover:scale-110 p-1 transition-transform duration-200 ease-in-out'
              />
            </div>
            <p className='text-center text-xs md:text-sm capitalize'>{item?.item_category}</p>
          </div>
        ))}
      </div>

      <div className='px-2'>
        <div className='mb-4 text-xl font-semibold'>Category</div>
        <div className='grid lg:gap-8 md:gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2'>
          {!isLoading && fairPriceCardData?.map((item) => (
            <FairPriceCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FairPrice
