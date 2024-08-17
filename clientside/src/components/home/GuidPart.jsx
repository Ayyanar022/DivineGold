

import React from 'react'
import img1 from '../../asserts/common/pexels-arunodhai-568948.jpg'
// import img1 from '../../asserts/common/pexels-entero-15171470.jpg'

const GuidPart = () => {
    return (
        <div className='container mx-auto py-4 md:py-8 bg-slate-50 '>


            <div className=" md:flex md:w-[80%] bg-gray-50 rounded-lg shadow-lg overflow-hidden mx-auto">

                <div className="p-5 md:w-2/3 bg-gradient-to-b from-teal-50 to-blue-50">
                    <section>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-amber-600 mb-4">
                            1. Best Price Finder
                        </h2>
                        <p className="text-gray-700 mb-4 ">
                            Compare prices for jewelry based on weight, design, and metal type (18k and 22k) with our <span className='font-semibold'>FairPrice page</span>. Get the best deals and ensure you’re getting value for your money.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-amber-600 mb-4">
                            2. Explore a Wide Range of Designs
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Explore a wide range of jewelry designs on our <sapn className='font-semibold'>Explore page</sapn>. Find detailed pricing for each design and discover styles that fit your taste and budget.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-amber-600 mb-4">
                            3. Get Clear & current Pricing Information
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Access clear and precise pricing information for every design. Make informed decisions with up-to-date data on all our jewelry pieces.
                        </p>
                    </section>

                </div>

                <div className="md:w-1/3">
                    <img src={img1} alt="Jewelry" className="w-full h-full object-cover" />
                </div>

            </div>



        </div>
    )
}

export default GuidPart

