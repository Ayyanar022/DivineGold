import React, { useState } from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { category, item_Name } from '../../helper/uploadFairPriceItemData'
import { FiUploadCloud } from "react-icons/fi";
import uploadRateforImage from '../../helper/uploadRateForImage';
import { TbHttpDelete } from "react-icons/tb";


const UploadFairPrice = ({ onClose }) => {

    const [data, setData] = useState({
        itemName: '',
        category: '',
        touch_75: '',
        touch_92: "",
        item_Image: [],
        description: '',
    })

    const [UploadedImageName, setUploadedImageName] = useState('')

    const handleChange = (e) => {
        const { value, name } = e.target

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUploadRateForItem = async (e) => {
        const file = e.target.files[0];
        setUploadedImageName(file.name)
        const uploadImage = await uploadRateforImage(file);
        setData((prev) => ({ ...prev, item_Image: uploadImage.url }))
    }

    const handleDeleteImage = () => {
        setData(prev => ({ ...prev, item_Image: [] }))
    }

    return (
        <div className="fixed w-full h-full bg-slate-200 bg-opacity-55 left-0 top-0 bottom-0 right-0 flex justify-center items-center  ">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden  ">
                <div className='flex  items-center pb-3'>
                    <h1 className='font-semibold text-xl'> Upload Fair Price</h1>
                    <div className='w-fit ml-auto hover:text-red-600 cursor-pointer ' onClick={onClose}><IoMdCloseCircleOutline /></div>
                </div>

                <form className='grid px-5 py-4 gap-1 overflow-y-scroll h-full '>
                    <div className='grid'>
                        <label htmlFor='itemName'>Item Name</label>
                        <select className='px-2 py-1 mt-1 bg-slate-100 border text-sm' type='text' id='itemName' name="itemName" placeholder='Enter Item Name' value={data?.itemName} onChange={handleChange} >
                            {item_Name?.map((item, index) => (
                                <option className='p-1' value={item.label} key={item.id}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className='grid mt-2'>
                        <label htmlFor='category'>Category</label>
                        <select className='px-2 py-1 mt-1 bg-slate-100 border text-sm' type='text' id='category' name="category" placeholder='Enter Item Name' value={data?.category} onChange={handleChange} >
                            {category?.map((cat) => (
                                <option className='p-1' value={cat?.label} key={cat.id}>{cat?.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className='grid mt-2'>
                        <label htmlFor='touch_75'>Touch 75</label>
                        <input className='px-2 py-1 mt-1 bg-slate-100 border text-sm' type='number' id='touch_75' name="touch_75" placeholder='Enter 75 touch percentage' value={data?.touch_75} onChange={handleChange} />
                    </div>
                    <div className='grid mt-2'>
                        <label htmlFor='touch_92'>Touch 92</label>
                        <input className='px-2 py-1 mt-1 bg-slate-100 border text-sm' type='number' id='touch_92' name="touch_92" placeholder='Enter 92 touch percentage' value={data?.touch_92} onChange={handleChange} />
                    </div>

                    <div className='grid mt-2 '>
                        <label htmlFor='description'>Description</label>
                        <input className='px-2 py-1 mt-1 bg-slate-100 border text-sm' type='text' id='description' name="description" placeholder='Enter about Item' value={data?.description} onChange={handleChange} />
                    </div>

                    <div className='grid mt-2'>
                        <label >Image</label>

                        <label htmlFor='item_Image' className='cursor-pointer'>
                            <div className='p-3 bg-slate-100 rounded flex items-center gap-2 justify-center  '>
                                <span><FiUploadCloud /></span>
                                <p>upload Image</p>
                                <input type='file' id='item_Image' className='hidden' onChange={handleUploadRateForItem} />
                            </div>
                        </label>

                    </div>


                    {data?.item_Image[0] && (
                        <div className='relative group max-w-[90px] cursor-pointer'>
                            <img src={data?.item_Image} width={90} height={90} className='bg-slate-100 border p-1' />
                            <div onClick={handleDeleteImage} className='absolute bottom-0 text-xl hover:2xl  cursor-pointer bg-red-600 rounded-full p-0.5 text-white hidden group-hover:block'><TbHttpDelete /></div>
                        </div>
                    )}


                    <button className='bg-pink-500 hover:bg-pink-600 p-2 font-semibold mb-7 mt-5' >Upload FairPrice</button>
                </form>
            </div>


        </div>
    )
}

export default UploadFairPrice
