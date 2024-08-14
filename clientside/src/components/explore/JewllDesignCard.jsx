import React from 'react'
import { Link } from 'react-router-dom'

const JewllDesignCard = ({ item }) => {

    return (
        <Link to={`/JewllDesign-details/${item?._id}`} className="w-48 h-64 shadow-md border m-2 rounded-lg overflow-hidden transform transition-transform hover:scale-105">
            <img src={item?.jewellImage[0]} alt="img" className="w-full h-44 object-cover mb-2 border-b " />
            <div className="px-2 py-1">
                <p className="text-lg font-semibold text-gray-800">{item.jewellName}</p>
                <p className="text-sm text-gray-500">{item.jewellType}</p>
            </div>
        </Link>

    )
}

export default JewllDesignCard
