import React, { useEffect, useState } from 'react'
import { useGetAllFairPrice } from '../../api/FairPriceApi'
import FairPriceCard from '../../components/fairPrice/FairPriceCard'
import { Link } from 'react-router-dom'

const FairPrice = () => {

  

  const { fairPriceCardData, isLoading } = useGetAllFairPrice()
  const [filterData, setFilterData] = useState([])
  const [filterdcardData, setFilterdCardData] = useState([])

  useEffect(() => {

    const filterfun = () => {
      const result = {}
      fairPriceCardData?.forEach(element => {
        const { item_category, item_Image, category } = element;
        if (!result[item_category] || (category === "Fancy" && result[item_category]?.category !== ("Fancy" || "HighFancy"))) {
          result[item_category] = { item_category, item_Image, category }
        }

        const output = Object.values(result)?.map(({ item_category, item_Image }) => ({ item_category, item_Image }))
        setFilterData(output)
      });
    }
    filterfun()

  }, [fairPriceCardData,])


  const singleFilter = (Itemcategory) => {
    const data = fairPriceCardData?.filter(item => item?.item_category === Itemcategory);
    setFilterdCardData(data)
  }


  return (
    <div className=' mx-auto w-full lg:px-9 py-1 sm:px-3 '>
      <div className='flex items-center gap-4 justify-between overflow-x-auto scrollbar-hiden '>
        {filterData?.map((item) => (
          <div onClick={() => singleFilter(item.item_category)} key={item.id} className='cursor-pointer flex flex-col justify-center items-center  w-full md:w-1/3 p-2'>
            <div className='h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden p-2 bg-slate-200 flex items-center justify-center'>
              <img
                src={item?.item_Image}
                alt={item?.item_category}
                className='w-full h-full object-scale-down mix-blend-multiply transform hover:scale-125 p-0.5 transition-transform duration-200 ease-in-out'
              />
            </div>
            <p className='text-center text-xs md:text-sm capitalize'>{item?.item_category}</p>
          </div>
        ))}
      </div>

      <div className='p-2  py-4'>
        <div onClick={() => setFilterdCardData([])} className='mb-4 text-xl font-semibold cursor-pointer'>All Category</div>
        <div className='grid lg:gap-8 md:gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2'>
          {!isLoading && (filterdcardData.length > 0 ? filterdcardData : fairPriceCardData)?.map((item) => (
            <Link to={`/fairPrice-details/${item.itemName}/${item.category}`}>
              <FairPriceCard key={item.id} data={item} />
            </Link>

          ))}
        </div>
      </div>
    </div>
  )
}

export default FairPrice
