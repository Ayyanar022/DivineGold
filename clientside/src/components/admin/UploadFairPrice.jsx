import React from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";


const UploadFairPrice = ({ onClose }) => {
    return (

        <div className="fixed w-full h-full bg-slate-200 bg-opacity-55 left-0 top-0 bottom-0 right-0 flex justify-center items-center ">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden ">
                <div className='flex  items-center'>
                    <h1 className='font-semibold text-xl'> Upload Fair Price</h1>
                    <div className='w-fit ml-auto hover:text-red-600 cursor-pointer ' onClick={onClose}><IoMdCloseCircleOutline /></div>
                </div>
            </div>


        </div>
    )
}

export default UploadFairPrice
