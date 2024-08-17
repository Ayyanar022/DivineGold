import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";

const JewllCategoryCard = ({ img, name }) => {
    return (
        <div className="flex-none w-36 h-48 bg-gradient-to-b from-pink-100 to-pink-50 shadow-lg border border-amber-300 p-2  rounded-md transform hover:scale-105 transition-transform duration-300">
            <img src={img} alt="Earring" className="w-full h-36 object-cover rounded" />
            <div className="flex gap-1 justify-center items-center pt-3 hover-move">
                <p className="text-sm font-medium text-gray-700 cursor-pointer">{name}</p>
                <span className="text-amber-600 cursor-pointer"><MdKeyboardArrowRight size={18} /></span>
            </div>
        </div>
    )
}

export default JewllCategoryCard
