import React from 'react'

const Benifits = () => {
    return (
        <div className='container mx-auto py-4 md:py-6 lg:my-8'>
            <div className='flex flex-col gap-3 '>
                <h2 className=" hidden md:block text-xl md:text-2xl lg:text-3xl font-semibold text-amber-600 mb-4 text-center">
                    Unlock Value with Transparent Pricing & Exclusive Rewards
                </h2>
                <h2 className="text-lg md:hidden  font-semibold text-amber-600 mt-3 text-center">
                  Transparent Pricing & Rewards
                </h2>
                <div className='border lg:mx-10 border-slate-300 hover:border-amber-500 p-4 md:py-5 md:px-8'>
                    {/* Desktop View */}
                    <p className='text-gray-600 hidden md:block'>
                        <span className='font-bold text-amber-500'>Best Price Finder:</span> Easily compare current market prices for jewelry based on design, quality, and weight. Get the best deal for each individual design , ensuring you make the most informed purchase.
                    </p>

                    {/* Mobile View */}
                    <p className='text-[14px] md:text-[16px] text-gray-600 md:hidden text-justify'>
                        <span className='font-bold text-amber-500'>Best Price Finder:</span>  Easily find best current market prices for jewelry. Get the best deal for each individual design , ensuring you make the most informed purchase.
                    </p>
                </div>




                <div className='border lg:mx-10 border-slate-300 hover:border-amber-500 p-4 md:py-5 md:px-8 md:mt-5'>
                    {/* Desktop View */}
                    <p className='text-gray-600 hidden md:block'>
                        <span className='font-bold text-amber-500'>Turning your referrals into real savings:</span> Share our platform with others and both you and your referral will receive price tokens worth ₹34 each. Accumulate these tokens and redeem them as discounts on your future jewelry purchases, turning your referrals into real savings.
                    </p>

                    {/* Mobile View */}
                    <p className='text-[14px] md:text-[16px] text-gray-600 md:hidden text-justify'>
                        <span className='font-bold text-amber-500'>Turning your referrals into real savings:</span> Refer others and both earn ₹34 tokens. Redeem tokens for discounts on future jewelry purchases.turning your referrals into real savings.
                    </p>
                </div>


            </div>
            <div>

            </div>
        </div>
    )
}

export default Benifits
