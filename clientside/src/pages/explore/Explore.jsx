import React, { useEffect, useState } from "react";
import { category, Gender, itemCategory } from "../../helper/uploadFairPriceItemData";
import { MdClose, MdOutlineKeyboardArrowUp } from "react-icons/md"; // up arraow
import { MdKeyboardArrowDown } from "react-icons/md" // down arrow
import { useFilterJewllDesignExplore, useGetAllJewllDesign } from "../../api/ExploreApi";
import JewllDesignCard from "../../components/explore/JewllDesignCard";
import { useGetIteCategoryConstant, useGetItemGenderConstant, useGetItemNameConstant, useGetItemTypeConstant } from "../../api/AdminApi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useAddUpdateCart } from "../../api/CartApi";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingJewelCard from "../../components/LoadingJewelCard";

const Explore = () => {
  const [selectedGendr, setSelectedGender] = useState([])
  const [selectCategory, setSelectCategory] = useState([])
  const [selectType, setSelectType] = useState([])

  const [genderToggle, setGenderToggle] = useState(true);
  const [typeToggle, settypeToggle] = useState(true);
  const [categoryToggle, setCategoryToggle] = useState(true);

  const [showNave, setShowNave] = useState(false)

  const { isAuthenticated } = useAuth0()

  // onchange for gender
  const handleChangeGender = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedGender([...selectedGendr, value])
    } else {
      setSelectedGender(selectedGendr.filter(gender => gender !== value))
    }
  }


  // onchangefortype
  const handleChangetypes = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectType([...selectType, value])
    } else {
      setSelectType(selectType.filter(type => type !== value))
    }
  }


  // onchnage for category
  const handleChangeCategory = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectCategory([...selectCategory, value])
    } else {
      setSelectCategory(selectCategory.filter(category => category !== value))
    }
  }

  // CONSTANTS DATA 
  const { ConstantItemCategory, isLoading: CategoryIsLoading, refetch: CategoryRefetch } = useGetIteCategoryConstant();
  const { ConstantItemType, isLoading: typeIsLoading, refetch: typeRefetch } = useGetItemTypeConstant();
  const { ConstantItemGender, isLoading: GenderisLoading, refetch: GenderRefetch } = useGetItemGenderConstant();

  // filter sunmit
  const handleFilterSubmit = () => {
    setSelectType([]);
    setSelectCategory([]);
    setSelectedGender([]);
  }


  const { filterData, isLoading: filterLoading } = useFilterJewllDesignExplore(selectedGendr, selectType, selectCategory)

  const nodilterData = (selectCategory?.length > 0 || selectType?.length > 0 || selectedGendr?.length > 0) && (filterData?.length === 0 && <p className="text-center text-red-600 font-semibold text-lg p-2">No Data Found..</p>)

  const { JewellDesignData, isLoading: JewllDataIsLoading } = useGetAllJewllDesign()

  // Prevent background scroll when aside is open
  useEffect(() => {
    if (showNave) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Clean up on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showNave]);



  const dataToRender = filterData && filterData?.length > 0 ? filterData : JewellDesignData;



  // // No Authentication
  // if (!isAuthenticated) {
  //   return (
  //     <div className="w-full h-full bg-white flex items-center justify-center ">
  //       <div className='md:w-[80%]  m-4'>
  //         <h1 className="text-xl md:text-2xl  text-amber-500 bg-amber-100 p-6 border text-center mt-20">Please Login To Access Benifits</h1>

  //       </div>
  //     </div>
  //   )
  // }

  // loading empty  card data count .
  const loadingEmptyCard = new Array(20).fill(null)



  return (

    <div className="w-full  flex mb-[82px]  lg:mb-12">

      {/**filter  */}
      <aside className="hidden md:block  fixed top-0 left-0 md:w-52 lg:w-56 h-full overflow-y-auto  bg-white border-r  shadow-sm">
        <nav className="h-full flex flex-col w-full   border-r shadow-sm">

          <div className="py-5  mb-5 flex justify-around px-3 items-center bg-lime-300 mt-14 ">
            {!filterData ? <p className="text-xl text-slate-800 font-medium tracking-wider uppercase  w-32 cursor-pointer">Filter</p> : <p onClick={handleFilterSubmit} className="text-xl font-medium uppercase text-red-600 tracking-wider w-32 cursor-pointer">Clear</p>}
            <button className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg"><FaArrowRightArrowLeft /></button>
          </div>


          <div className="flex-1 px-5">

            {/**Category */}
            <div className="mb-5">
              <div onClick={() => setCategoryToggle(prev => !prev)} className="flex justify-between items-center gap-2">
                <h3 className="text-md text-slate-700 uppercase tracking-wide font-semibold pb-2 ">Category</h3>
                {!categoryToggle && <MdOutlineKeyboardArrowUp className="text-xl" />}
                {categoryToggle && <MdKeyboardArrowDown className="text-xl" />}
              </div>


              {categoryToggle && ConstantItemCategory?.data?.map((item, index) => (
                <div
                  key={item?._id}
                  className={`flex items-center py-1 px-3 gap-1 
                hover:bg-slate-300 
                ${selectCategory?.includes(item?.itemCategory) ? 'bg-slate-200' : 'bg-white'}`}
                >
                  <input
                    type="checkbox"
                    id={`type${item?._id}`}
                    value={item?.itemCategory}
                    onChange={handleChangeCategory}
                    className="mr-2"
                    name={item?.itemCategory}
                    checked={selectCategory?.includes(item?.itemCategory)}
                  />
                  <label className="text-slate-700 text-md" htmlFor={`type${item?._id}`}>{item?.itemCategory}</label>
                </div>
              ))}


            </div>

            {/**Types */}
            <div className="mb-5">
              <div onClick={() => settypeToggle(prev => !prev)} className="flex justify-between items-center gap-2">
                <h3 className="text-md text-slate-700 uppercase tracking-wide font-semibold pb-2 ">Types</h3>
                {!typeToggle && <MdOutlineKeyboardArrowUp className="text-xl" />}
                {typeToggle && <MdKeyboardArrowDown className="text-xl" />}
              </div>

              {typeToggle && ConstantItemType?.data?.map((item, index) => (
                <div key={item?._id}
                  className={`flex items-center py-1 px-3 gap-1 
                hover:bg-slate-300 
                ${selectType.includes(item?.itemType) ? 'bg-slate-200' : 'bg-white'}`}
                >
                  <input
                    type="checkbox"
                    id={`type${item?._id}`}
                    value={item?.itemType}
                    onChange={handleChangetypes}
                    className="mr-2"
                    name={item?.itemType}
                    checked={selectType.includes(item?.itemType)}
                  />
                  <label className="text-slate-700 text-md" htmlFor={`type${item?._id}`} >{item?.itemType}</label>
                </div>
              ))}

            </div>

            {/**Gender filter */}
            <div className="mb-16 ">
              <div onClick={() => setGenderToggle(prev => !prev)} className="flex justify-between items-center ">
                <h3 className="text-md text-slate-700 uppercase tracking-wide font-semibold pb-2 ">Gender</h3>
                <div>
                  {!genderToggle && <MdOutlineKeyboardArrowUp className="text-xl" />}
                  {genderToggle && <MdKeyboardArrowDown className="text-xl" />}
                </div>

              </div>

              {genderToggle && (<div >
                {Gender && ConstantItemGender?.data?.map((item, index) => (
                  <div key={item?._id}
                    className={`flex items-center py-1 px-3 gap-1 
                  hover:bg-slate-300 
                  ${selectedGendr.includes(item?.itemGender) ? 'bg-slate-200' : 'bg-white'}`}
                  >
                    <input
                      type="checkbox"
                      id={`gender-${item?._id}`}
                      value={item?.itemGender}
                      onChange={handleChangeGender}
                      className="mr-2"
                      name={item?.itemGender}
                      checked={selectedGendr.includes(item?.itemGender)}
                    />
                    <label className="text-slate-700 text-md" htmlFor={`gender-${item?._id}`}>{item?.itemGender}</label>
                  </div>
                ))}
              </div>)}

            </div>

          </div>

        </nav>
      </aside>


      {/* Sliding Aside Panel for Small Devices */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform duration-300 transform ${showNave ? 'translate-x-0' : '-translate-x-full'} md:hidden`}  >
        <div className="overflow-y-auto fixed top-0 left-0 w-3/5 max-w-xs h-full bg-white shadow-lg py-3   px-1">

          <button onClick={() => setShowNave(false)} className="text-right text-xl text-gray-700 " >
            <MdClose size={24} />
          </button>

          <div className="p-3  flex justify-between items-center ">
            {!filterData ? <p className="text-lg text-slate-700 font-bold tracking-wider uppercase  w-32 cursor-pointer">Filter</p> : <p onClick={handleFilterSubmit} className="text-lg w-32 cursor-pointer  text-orange-600 font-bold tracking-wider uppercase ">Clear</p>}
            <button className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg" onClick={() => setShowNave(prev => !prev)} ><FaArrowRightArrowLeft /></button>
          </div>

          <div className="flex-1 px-5 ">
            {/**Gender filter */}
            <div className="mb-5 ">
              <div onClick={() => setGenderToggle(prev => !prev)} className="flex items-center justify-between gap-2">
                <h3 className="text-md  text-slate-700 uppercase tracking-wide font-semibold pb-2">Gender</h3>
                <div>
                  {!genderToggle && <MdOutlineKeyboardArrowUp className="text-xl" />}
                  {genderToggle && <MdKeyboardArrowDown className="text-xl" />}
                </div>

              </div>

              {genderToggle && (<div >
                {Gender && ConstantItemGender?.data?.map((item, index) => (
                  // <div key={item?._id} className="flex items-center mb-2">
                  <div key={item?._id}
                    className={`flex items-center py-1 px-3 gap-1 
                hover:bg-slate-300 
                ${selectedGendr.includes(item?.itemGender) ? 'bg-slate-200' : 'bg-white'}`}
                  >
                    <input
                      type="checkbox"
                      id={`gender-${item?._id}`}
                      value={item?.itemGender}
                      onChange={handleChangeGender}
                      className="mr-2"
                      name={item?.itemGender}
                      checked={selectedGendr.includes(item?.itemGender)}
                    />
                    <label htmlFor={`gender-${item?._id}`}>{item?.itemGender}</label>
                  </div>
                ))}
              </div>)}

            </div>

            {/**Types */}
            <div className="mb-5">
              <div onClick={() => settypeToggle(prev => !prev)} className="flex items-center justify-between gap-2">
                <h3 className="text-md  text-slate-700 uppercase tracking-wide font-semibold pb-2">Types</h3>
                <div>
                  {!typeToggle && <MdOutlineKeyboardArrowUp className="text-xl" />}
                  {typeToggle && <MdKeyboardArrowDown className="text-xl" />}
                </div>
              </div>

              {typeToggle && ConstantItemType?.data?.map((item, index) => (
                // <div key={item?._id} className="flex items-center mb-1">
                <div key={item?._id}
                  className={`flex items-center py-1 px-3 gap-1 
              hover:bg-slate-300 
              ${selectType.includes(item?.itemType) ? 'bg-slate-200' : 'bg-white'}`}
                >
                  <input
                    type="checkbox"
                    id={`type${item?._id}`}
                    value={item?.itemType}
                    onChange={handleChangetypes}
                    className="mr-2"
                    name={item?.itemType}
                    checked={selectType.includes(item?.itemType)}
                  />
                  <label htmlFor={`type${item?._id}`} >{item?.itemType}</label>
                </div>
              ))}

            </div>

            {/**Category */}
            <div className="mb-12">
              <div onClick={() => setCategoryToggle(prev => !prev)} className="flex items-center justify-between gap-2">
                <h3 className="text-md  text-slate-700 uppercase tracking-wide font-semibold pb-2">Category</h3>
                <div>
                  {!categoryToggle && <MdOutlineKeyboardArrowUp className="text-xl" />}
                  {categoryToggle && <MdKeyboardArrowDown className="text-xl" />}
                </div>
              </div>

              {categoryToggle && ConstantItemCategory?.data?.map((item, index) => (
                // <div key={item?._id} className="flex items-center mb-1">
                <div
                  key={item?._id}
                  className={`flex items-center py-1 px-3 gap-1 
              hover:bg-slate-300 
              ${selectCategory?.includes(item?.itemCategory) ? 'bg-slate-200' : 'bg-white'}`}
                >
                  <input
                    type="checkbox"
                    id={`type${item?._id}`}
                    value={item?.itemCategory}
                    onChange={handleChangeCategory}
                    className="mr-2"
                    name={item?.itemCategory}
                    checked={selectCategory?.includes(item?.itemCategory)}
                  />
                  <label htmlFor={`type${item?._id}`} >{item?.itemCategory}</label>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/**main */}

      <main className=" p-1 md:p-2 lg:p-3 w-full ml-0 md:ml-52 pb-7">
        <div className="w-full">
          {nodilterData}
        </div >
        <div className="flex gap-2 items-center ">
          <button className="block md:hidden p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg" onClick={() => setShowNave(prev => !prev)}><FaArrowRightArrowLeft /></button>
          <h2 className="font-bold text-amber-500 text-lg md:text-2xl px-5 py-4">Jewell Designs</h2>
        </div>

        <div className=" w-full h-full grid  gap-2 md:gap-2 lg:gap-3 grid-cols-2 md:px-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {!dataToRender && loadingEmptyCard.map((item, index) => (
            <div key={index}> <LoadingJewelCard /> </div>
          ))}

          {dataToRender && dataToRender?.map((item, index) => (
            <JewllDesignCard key={index} item={item} />
          ))}
        </div>
      </main>


    </div>
  )




};

export default Explore;



