import React, { useEffect, useState } from 'react'
import { useGetAllFairPrice } from '../../api/FairPriceApi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingJewelCard from '../../components/LoadingJewelCard'

const FairPrice = () => {


  const { fairPriceCardData, isLoading } = useGetAllFairPrice()
  const [filterData, setFilterData] = useState([])
  const [filterdcardData, setFilterdCardData] = useState([])



  useEffect(() => {
    const filterfun = () => {
      const result = {}
      fairPriceCardData?.forEach(element => {
        const { jewellCategory, jewellImage, jewellType } = element;
        if (!result[jewellCategory] || (jewellType === "Fancy" && result[jewellCategory]?.jewellType !== ("Fancy" || "HighFancy"))) {
          result[jewellCategory] = { jewellCategory, jewellImage, jewellType }
        }

        const output = Object.values(result)?.map(({ jewellCategory, jewellImage }) => ({ jewellCategory, jewellImage }))
        setFilterData(output)
      });
    }
    filterfun()

  }, [fairPriceCardData,])


  const singleFilter = (Itemcategory) => {
    const data = fairPriceCardData?.filter(item => item?.jewellCategory === Itemcategory);
    setFilterdCardData(data);
  }

  //FILTER BASED ON TREDITIONAL , FANCY , HIGHFANCY
  const TypeFilter = (jewellType, type) => {
    if (filterdcardData?.length < 1) {
      toast.warning("Select above Category.. ")
      return
    }
    const data = fairPriceCardData?.filter(item => item?.jewellCategory === jewellType && item?.jewellType === type)
    setFilterdCardData(data);
  }


  const loadingEmptyCard = new Array(20).fill(null)

  const renderFinalData = filterdcardData?.length > 0 ? filterdcardData : fairPriceCardData;


  return (
    <div className=' mx-auto w-full lg:px-16 py-2 md:py-3 px-2 mb-[55px] lg:mb-[10px]'>

      {/**ROUND jewellType OPTIONS */}
      <div className='flex items-center gap-2 md:gap-4 justify-between overflow-x-auto scrollbar-hiden'>
        {filterData?.length > 0 ? (
          filterData?.map((item) => (
            <div
              onClick={() => singleFilter(item?.jewellCategory)}
              key={item?.id}
              className='cursor-pointer flex flex-col justify-center items-center w-full md:w-1/3 p-2'
            >
              <div className='h-18 w-18  lg:h-20  lg:w-20 border-amber-300 border rounded-full overflow-hidden bg-slate-200 flex items-center justify-center'>
                <img
                  src={item?.jewellImage[0]}
                  alt={item?.jewellCategory}
                  className='w-full h-full object-cover rounded-full transition-transform duration-200 ease-in-out transform hover:scale-110'
                />
              </div>

              <p className='text-center text-xs md:text-sm capitalize'>{item?.jewellCategory}</p>
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
          onClick={() => TypeFilter(filterdcardData[0]?.jewellCategory, "Treditional")} >
          Treditional
        </button>

        <button className="bg-[#D4AF37] uppercase text-xs  md:tracking-wider font-semibold p-1.5 px-3 md:px-4 hover:bg-[#C49C2E] transition-all duration-300 text-white  rounded"
          onClick={() => TypeFilter(filterdcardData[0]?.jewellCategory, "Fancy")} >
          Fancy
        </button>

        <button className="bg-[#D4AF37] uppercase text-xs   md:tracking-wider font-semibold p-1.5 px-3 md:px-4 hover:bg-[#C49C2E] transition-all duration-300 text-white  rounded"
          onClick={() => TypeFilter(filterdcardData[0]?.jewellCategory, "HighFancy")} >
          High Fancy
        </button>
      </div>


      <div className='  py-4 px-2 '>
        <div onClick={() => setFilterdCardData([])} className='mb-4  w-fit  text-xl font-bold cursor-pointer text-amber-500'>All jewellType</div>

        <div className='grid gap-3 md:gap-6 lg:gap-12 grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>

          {filterData?.length < 1 && loadingEmptyCard?.map((item, index) => (
            <LoadingJewelCard />
          ))}
          {!isLoading && (renderFinalData)?.map((item) => (

            <Link to={`/fairPrice-details/${item?._id}`} className=" h-[195px]  md:h-56 lg:h-[255px] shadow-md border  rounded-md overflow-hidden transform transition-transform duration-200 hover:scale-105">
              <img src={item?.jewellImage[0]} alt="img" className="w-full h-[72%] md:h-[76%] object-cover   " />

              <div className="px-2 py-2 md:py-1.5  bg-white flex">
                <div className='w-full md:pl-1'>
                  <p className="text-[15px] md:text-md lg:text-lg font-semibold text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-full ">{item.jewellName}</p>
                  <p className="text-sm text-gray-500 ">{item.jewellType}</p>
                </div>
              </div>
            </Link >
          ))}

        </div>
      </div>
    </div>
  )




}

export default FairPrice
