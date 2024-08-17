import React from 'react'
import img1 from '../../asserts/jewllModel/pexels-james-ranieri-1051163-2064505.jpg'
import img2 from '../../asserts/jewllModel/pexels-qazi-1229414.jpg'

const SomeExplanation = () => {
    return (
        <div className='container mx-auto py-4 md:py-12 bg-slate-50 '>


            <div className="md:flex bg-gray-50 rounded-lg shadow-lg overflow-hidden">
                <div className="w-full md:w-1/2">
                    <img src={img1} alt="Jewelry" className="w-full h-full object-cover" />
                </div>
                <div className="p-5 md:w-1/2 bg-gradient-to-tr from-pink-50 to-white">
                    <h2 className="text-xl md:text-2xl md:2xl font-semibold text-amber-600 mb-4">
                        Welcome to DivineGold
                    </h2>
                    <p className="text-gray-700 mb-4 text-[14px] md:text-[15px]">
                        Where luxury meets affordability. Explore an extensive collection of exquisite jewelry designs, all priced to perfection. Unlock the best deals in the market, tailored just for you.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-800 text-[13px] md:text-[14px]">
                        <li>Discover the best jewelry prices in the market.</li>
                        <li>Browse a wide range of designs with prices at your fingertips.</li>
                        <li>Get real-time pricing for any design you want.</li>
                        <li>Enjoy the market's most competitive prices, updated regularly.</li>
                        <li>Benefit from our unique price token system for additional savings.</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default SomeExplanation
