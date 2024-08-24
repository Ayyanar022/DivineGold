import React from 'react'

const GenderCard = ({ img, name }) => {
    return (

        <div className='flex-none w-40 h-[250px] md:w-60 md:h-[345px] bg-sky-100 border shadow-md hover:shadow-lg p-2' >
            <img src={img} alt="men" className='w-full h-52 md:h-72 object-cover' />
            <p className='text-center p-1 md:p-2 font-semibold md:text-lg' >{name}</p>
        </div>

    )
}

export default GenderCard
