import React, { useEffect, useState } from 'react'
import { useGetAllFairPrice } from '../../api/FairPriceApi'
import FairPriceCard from '../../components/fairPrice/FairPriceCard'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth0 } from '@auth0/auth0-react'
import LoadingJewelCard from '../../components/LoadingJewelCard'

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
    setFilterdCardData(data);
  }

  //FILTER BASED ON TREDITIONAL , FANCY , HIGHFANCY
  const TypeFilter = (category, type) => {
    if (filterdcardData?.length < 1) {
      toast.warning("Select above category.. ")
      return
    }
    const data = fairPriceCardData?.filter(item => item?.item_category === category && item?.category === type)
    setFilterdCardData(data);
  }


  const loadingEmptyCard = new Array(20).fill(null)

  const renderFinalData = filterdcardData?.length > 0 ? filterdcardData : fairPriceCardData;


  return (
    <div className=' mx-auto w-full lg:px-14 py-2 md:py-3 px-2 mb-[55px] lg:mb-[10px]'>

      {/**ROUND CATEGORY OPTIONS */}
      <div className='flex items-center gap-2 md:gap-4 justify-between overflow-x-auto scrollbar-hiden'>
        {filterData?.length > 0 ? (
          filterData?.map((item) => (
            <div
              onClick={() => singleFilter(item?.item_category)}
              key={item?.id}
              className='cursor-pointer flex flex-col justify-center items-center w-full md:w-1/3 p-2'
            >
              <div className='h-16 w-16 md:h-16 lg:h-20 md:w-16 lg:w-20 border-amber-300 border rounded-full overflow-hidden p-2 bg-slate-200 flex items-center justify-center'>
                <img
                  src={item?.item_Image}
                  alt={item?.item_category}
                  className='w-full h-full object-scale-down mix-blend-multiply transform hover:scale-125 p-0.5 transition-transform duration-200 ease-in-out'
                />
              </div>
              <p className='text-center text-xs md:text-sm capitalize'>{item?.item_category}</p>
            </div>
          ))
        ) : (
          loadingEmptyCard.map((item, index) => (
            <div key={index} className='cursor-pointer flex flex-col justify-center items-center w-full md:w-1/3 p-2 animate-pulse '  >
              <div className='h-16 text-xs md:text-sm w-16 md:h-16 lg:h-20 md:w-16 lg:w-20 border-amber-200 border rounded-full overflow-hidden p-2 bg-pink-50 flex items-center justify-center'>
                Loading..
              </div>
            </div>
          ))
        )}
      </div>



      <div className='flex justify-between md:block space-x-2 md:space-x-5 pt-3 lg:pt-5 px-2 transition-all duration-200'>
        <button className="bg-[#D4AF37] uppercase text-xs    md:tracking-wider font-semibold py-1.5 px-3 md:px-4 hover:bg-[#C49C2E] transition-all duration-300 text-white  rounded"
          onClick={() => TypeFilter(filterdcardData[0]?.item_category, "Treditional")} >
          Treditional
        </button>

        <button className="bg-[#D4AF37] uppercase text-xs  md:tracking-wider font-semibold p-1.5 px-3 md:px-4 hover:bg-[#C49C2E] transition-all duration-300 text-white  rounded"
          onClick={() => TypeFilter(filterdcardData[0]?.item_category, "Fancy")} >
          Fancy
        </button>

        <button className="bg-[#D4AF37] uppercase text-xs   md:tracking-wider font-semibold p-1.5 px-3 md:px-4 hover:bg-[#C49C2E] transition-all duration-300 text-white  rounded"
          onClick={() => TypeFilter(filterdcardData[0]?.item_category, "HighFancy")} >
          High Fancy
        </button>
      </div>


      <div className='  py-4 px-2 '>
        <div onClick={() => setFilterdCardData([])} className='mb-4  w-fit  text-xl font-bold cursor-pointer text-amber-500'>All Category</div>

        <div className='grid gap-3 md:gap-6 lg:gap-9 grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>

          {filterData?.length < 1 && loadingEmptyCard?.map((item, index) => (
            <LoadingJewelCard />
          ))}


          {!isLoading && (renderFinalData)?.map((item) => (
            <Link to={`/fairPrice-details/${item?.itemName}/${item?.category}`}>
              <FairPriceCard key={item?.id} data={item} />
            </Link>
          ))}

        </div>
      </div>
    </div>
  )




}

export default FairPrice
