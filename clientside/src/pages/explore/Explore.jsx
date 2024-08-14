import React, { useState } from "react";
import { category, Gender, itemCategory } from "../../helper/uploadFairPriceItemData";
import { MdOutlineKeyboardArrowUp } from "react-icons/md"; // up arraow
import { MdKeyboardArrowDown } from "react-icons/md" // down arrow
import { useFilterJewllDesignExplore, useGetAllJewllDesign } from "../../api/ExploreApi";
import JewllDesignCard from "../../components/explore/JewllDesignCard";


const Explore = () => {
  const [selectedGendr, setSelectedGender] = useState([])
  const [selectCategory, setSelectCategory] = useState([])
  const [selectType, setSelectType] = useState([])

  const [genderToggle, setGenderToggle] = useState(true);
  const [typeToggle, settypeToggle] = useState(true);
  const [categoryToggle, setCategoryToggle] = useState(true);

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

  // filter sunmit
  const handleFilterSubmit = () => {
    setSelectType([]);
    setSelectCategory([]);
    setSelectedGender([]);
  }

  const { filterData, isLoading: filterLoading } = useFilterJewllDesignExplore(selectedGendr, selectType, selectCategory)

  const nodilterData = (selectCategory?.length > 0 || selectType?.length > 0 || selectedGendr?.length > 0) && (filterData?.length === 0 && <p className="text-center text-red-600 font-semibold text-lg p-2">No Data Found..</p>)

  const { JewellDesignData, isLoading: JewllDataIsLoading } = useGetAllJewllDesign()

  if (JewllDataIsLoading || JewllDataIsLoading) {
    return <p>Loading...</p>
  }

  const dataToRender = filterData && filterData?.length > 0 ? filterData : JewellDesignData;

  return <div className="w-full min-h-[calc(100vh-98px)]  flex ">
    {/**filter  */}
    <aside className="hidden md:block w-full max-w-44 shadow min-h-full overflow-y-auto bg-green-500 p-4">

      {!filterData ? <p className="text-xl mb-4 font-semibold">Filter</p> : <button onClick={handleFilterSubmit} className="text-xl mb-4 font-semibold">Clear Filter</button>}

      {/**Gender filter */}
      <div className="mb-3 ">
        <div onClick={() => setGenderToggle(prev => !prev)} className="flex items-center gap-2">
          <h3 className="text-md font-semibold pb-2">Gender</h3>
          {genderToggle && <MdOutlineKeyboardArrowUp />}
          {!genderToggle && <MdKeyboardArrowDown />}

        </div>

        {genderToggle && (<div >
          {Gender && Gender.map((item, index) => (
            <div key={item.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`gender-${index}`}
                value={item?.label}
                onChange={handleChangeGender}
                className="mr-2"
                name={item?.label}
                checked={selectedGendr.includes(item?.label)}
              />
              <label htmlFor={`gender-${index}`}>{item?.label}</label>
            </div>
          ))}
        </div>)}

      </div>

      {/**Types */}
      <div className="mb-3">
        <div onClick={() => settypeToggle(prev => !prev)} className="flex items-center gap-2">
          <h3 className="text-md font-semibold pb-2">Types</h3>
          {typeToggle && <MdOutlineKeyboardArrowUp />}
          {!typeToggle && <MdKeyboardArrowDown />}
        </div>

        {typeToggle && category.map((item, index) => (
          <div className="flex items-center mb-1">
            <input
              type="checkbox"
              id={`type${item?.id}`}
              value={item?.label}
              onChange={handleChangetypes}
              className="mr-2"
              name={item?.label}
              checked={selectType.includes(item?.label)}
            />
            <label htmlFor={`type${item.id}`} >{item?.label}</label>
          </div>
        ))}

      </div>
      {/**Category */}
      <div className="mb-3">
        <div onClick={() => setCategoryToggle(prev => !prev)} className="flex items-center gap-2">
          <h3 className="text-md font-semibold pb-2">Category</h3>
          {categoryToggle && <MdOutlineKeyboardArrowUp />}
          {!categoryToggle && <MdKeyboardArrowDown />}
        </div>

        {categoryToggle && itemCategory.map((item, index) => (
          <div className="flex items-center mb-1">
            <input
              type="checkbox"
              id={`type${item?.id}`}
              value={item?.label}
              onChange={handleChangeCategory}
              className="mr-2"
              name={item?.label}
              checked={selectCategory?.includes(item?.label)}
            />
            <label htmlFor={`type${item.id}`} >{item?.label}</label>
          </div>
        ))}

      </div>

    </aside>

    {/**main */}

    <main className="p-2 w-full h-full">
      <div className="w-full">
        {nodilterData}
      </div>
      <h2 className="font-semibold text-slate-800 text-lg px-2 py-4">Jewell Designs</h2>
      <div className="w-full h-full grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {!JewllDataIsLoading && dataToRender?.map((item, index) => (
          <JewllDesignCard key={index} item={item} />
        ))}
      </div>
    </main>


  </div>
};

export default Explore;
