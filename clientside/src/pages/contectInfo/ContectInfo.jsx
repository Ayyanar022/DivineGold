
import React from 'react'
import WhatsAppForm from '../../components/WhatsAppForm'

const ContectInfo = () => {
  return (  
    <div className='px-2 py-4 md:p-4 mx-auto transition-all duration-150 pb-[60px] pd:pb-[76px]   flex flex-col gap-3 md:gap-6  '>
      <div className="flex flex-col items-center justify-center gap-4 p-4  bg-amber-50  rounded-md">
        <h2 className="text-[15px] sm:text-[17px] sm:text-xl md:text-2xl text-gray-800 font-bold text-center">
          Have a Question? We're Here to Help!
        </h2>
        <p className="text-[13px] md:text-md lg:text-[17px]  text-gray-600 text-center">
          If you have any queries or need assistance, feel free to reach out to us. Our team is always ready to provide the support you need.
        </p>
      </div>

      <div className=''>
        <WhatsAppForm />
      </div>

    </div>
  )
}

export default ContectInfo
