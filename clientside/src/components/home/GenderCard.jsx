import React from 'react'

const GenderCard = ({ img, name }) => {
    return (

        <div className=' h-[200px]  md:h-[260px] lg:h-[335px] bg-sky-100 border shadow-md hover:shadow-lg p-2' >
            <img src={img} alt="men" className='w-full h-[87%] object-cover' />
            <p className='text-center p-1 md:p-2 font-semibold md:text-lg' >{name}</p>
        </div>

    )
}

export default GenderCard
