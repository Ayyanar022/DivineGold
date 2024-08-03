import React, { useState } from "react";
import { category, Gender, itemCategory } from "../../helper/uploadFairPriceItemData";
import { MdOutlineKeyboardArrowUp } from "react-icons/md"; // up arraow
import { MdKeyboardArrowDown } from "react-icons/md" // down arrow
import { useGetAllJewllDesign } from "../../api/ExploreApi";
import JewllDesignCard from "../../components/explore/JewllDesignCard";


const Explore = () => {
  const [selectedGendr, setSelectedGender] = useState([])
  const [selectCategory, setSelectCategory] = useState([])
  const [selectType, setSelectType] = useState([])
  const [selctedFilter, setSelectedFilter] = useState([])

  const [genderToggle, setGenderToggle] = useState(false);
  const [typeToggle, settypeToggle] = useState(false);
  const [categoryToggle, setCategoryToggle] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedFilter((prev) => (
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    ))
  }

  const { JewellDesignData, isLoading: JewllDataIsLoading } = useGetAllJewllDesign()


  return <div className="w-full min-h-[calc(100vh-98px)]  flex ">
    {/**filter  */}
    <aside className="hidden md:block w-full max-w-44 shadow min-h-full overflow-y-auto bg-green-500 p-4">
      <h2 className="text-xl mb-4 font-semibold">Filter</h2>

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
                value={item.label}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor={`gender-${index}`}>{item.label}</label>
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
              onChange={handleChange}
              className="mr-2"
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
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor={`type${item.id}`} >{item?.label}</label>
          </div>
        ))}

      </div>

    </aside>

    {/**main */}

    <main className="p-2 w-full h-full">
      <h2 className="font-semibold text-slate-800 text-lg px-2 py-4">Jewell Designs</h2>
      <div className="w-full h-full grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {!JewllDataIsLoading && JewellDesignData?.map((item, index) => (
          <JewllDesignCard key={index} item={item} />
        ))}
      </div>
    </main>


  </div>;
};

export default Explore;
