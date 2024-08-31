import React, { useEffect, useState } from 'react'
import { useGetAllFairPrice } from '../../api/FairPriceApi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingJewelCard from '../../components/LoadingJewelCard'
import { useAuth0 } from '@auth0/auth0-react'

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


  const loadingEmptyCard = new Array(10).fill(null)

  const renderFinalData = filterdcardData?.length > 0 ? filterdcardData : fairPriceCardData;

  const { isAuthenticated } = useAuth0()
  // // No Authentication
  if (!isAuthenticated) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center ">
        <div className='md:w-[80%]  m-4'>
          <h1 className="text-xl md:text-2xl   text-amber-500 bg-amber-100 p-6 border text-center mt-20">Please Login..!</h1>

        </div>
      </div>
    )
  }



  return (
    <div className=' mx-auto w-full lg:px-16 py-2 md:py-3 px-2 mb-[55px] lg:mb-[10px]'>

      {/**ROUND jewellType OPTIONS */}
      <div className='flex items-center gap-2 md:gap-4 justify-between overflow-x-auto scrollbar-hiden'>
        {filterData?.length > 0 ? (
          filterData?.map((item) => (

            <div
              onClick={() => singleFilter(item?.jewellCategory)}
              key={item?.id}
              className="cursor-pointer flex flex-col justify-center items-center w-full md:w-1/3 p-2"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-amber-300 border rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
                <img
                  src={item?.jewellImage[0]}
                  alt={item?.jewellCategory}
                  className="w-full h-full object-cover rounded-full transition-transform duration-200 ease-in-out transform hover:scale-110"
                />
              </div>
              <p className="text-center text-xs md:text-sm capitalize">{item?.jewellCategory}</p>
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

      {filterdcardData?.length > 0 && (<div className='flex justify-between md:block space-x-2 md:space-x-5 pt-3 lg:pt-5 px-2 transition-all duration-200'>
        <button className="bg-[#D4AF37] uppercase text-xs    md:tracking-wider font-semibold py-1.5 px-3 md:px-4 hover:bg-[#C49C2E] transition-all duration-300 text-white  rounded"
          onClick={() => TypeFilter(filterdcardData[0]?.jewellCategory, "Traditional")} >
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
      </div>)}





      <div className=' py-4 px-2 '>
        <div className=" md:pb-4   space-y-2" >
          <h2 className="text-[16px] md:text-[19px] lg:text-[22px] tracking-wide font-bold  text-amber-600 capitalize ">Get the overall current market fair prices for each jewelry. </h2>
          <p className=" hidden md:block  md:text-[14px] lg:text-[15px] font-bold  text-gray-500  ">Find the overall best market prices for any jewelry item. Get insights into the current rates across traditional, fancy, and high fancy styles, helping you make informed decisions with ease. </p>
          <p className=" md:hidden text-[12px] text-justify font-medium  text-gray-500  ">Find the overall best current market prices for any jewel. Get insights into the current rates, helping you make decisions with ease. </p>
        </div>

        {filterdcardData?.length > 0 ? (<div onClick={() => setFilterdCardData([])} className='my-3  w-fit  text-lg md:text-xl font-bold cursor-pointer text-amber-500  uppercase transition-all duration-200'>Clear Filter </div>) : (<div className='my-3  w-fit  text-lg md:text-xl font-bold cursor-pointer uppercase text-slate-800 transition-all duration-200'>All jewelry items</div>)}


        <div className='grid gap-3 md:gap-6 lg:gap-12 grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>

          {filterData?.length < 1 && loadingEmptyCard?.map((item, index) => (
            <LoadingJewelCard />
          ))}
          {!isLoading && (renderFinalData)?.map((item) => (

            <Link to={`/fairPrice-details/${item?._id}`} className=" h-[235px]  md:h-56 lg:h-[255px] shadow-md border  rounded-md overflow-hidden transform transition-transform duration-200 hover:scale-105">
              <img src={item?.jewellImage[0]} alt="img" className="w-full h-[76%] md:h-[76%] object-cover  brightness-110 " />

              <div className="px-2 py-1 md:py-1.5  bg-white flex">
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
