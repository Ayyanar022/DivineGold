
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetFairPriceDetailsData } from '../../api/FairPriceApi'
import { useCurrentUserConetxt } from '../../context/userContext'
import displayINR from '../../helper/RupeeConvetion'
import { toast } from 'react-toastify'
import { useGetCurrentPrice } from '../../api/AdminApi'
import { useGetMyUser } from '../../api/MyUserApi'
import { TextField } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'


const RadioButton = ({ label, value, checked, onChange }) => {
    return (
        <label className='block  text-sm md:text-md'>
            <input
                type='radio'
                value={value}
                checked={checked}
                onChange={onChange}
                className='mr-2 text-[6px] md:text-xs ' />
            {label}
        </label>
    )
}

const FairPriceDetails = () => {

    //GET CURRENT PRICE
    const [currentPriceCP, setCurrentPriceCP] = useState('')
    const { currentPriceData, isLoading: getCPisLoading } = useGetCurrentPrice()
    const { currentUser, isLoading: isGetLoading } = useGetMyUser()
    const { currentUserData, setCurrentUserData } = useCurrentUserConetxt();


    useEffect(() => {
        if (currentPriceData?.currentPrice) {
            setCurrentPriceCP(Number(currentPriceData?.currentPrice))
        }
    }, [currentPriceData])


    useEffect(() => {
        if ((currentUserData.length <= 0) && currentUser) {
            setCurrentUserData(currentUser)
        }

    }, [currentUser, setCurrentUserData, currentUserData])


    //-------------------------------------------------

    const { itemName, category } = useParams()
    const { fairPriceDetails, isLoading: cardDetailsLoding } = useGetFairPriceDetailsData(itemName, category)
    const details = fairPriceDetails?.data


    const [data, setData] = useState({
        selectedValue: "75halmark",
        itemWeight: '',
        usePriceToken: '',
    })

    const handleChange = (e) => {
        setData(prev => ({ ...prev, selectedValue: e.target.value }));
    }


    const [price, setPrice] = useState({
        bestPrice: '',
        tokenPricediscount: '',
        afterTokenDiscount: ''
    })


    const { isAuthenticated } = useAuth0()
    // PRICE CALCULATIONS
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isAuthenticated) return toast.warning("Please Login..")

        if (!data.itemWeight || Number(data.itemWeight) === 0) {
            toast.info("Please Enter Weight...")
            return
        }
        if (!currentPriceData || getCPisLoading) return

        if (data.selectedValue === "75halmark") {
            let result, token, resultData;
            result = (((details.touch_75 / 100) * data.itemWeight) * currentPriceCP);

            if (Number(data.usePriceToken) > 0 && (currentUserData?.bonousePoints >= Number(data.usePriceToken))) {
                token = Number(data.usePriceToken) * 39
                resultData = Number(result) - token
                setPrice({
                    bestPrice: displayINR(result) || 0,
                    afterTokenDiscount: displayINR(resultData) || 0,
                    tokenPricediscount: displayINR(token) || 0
                })
                return;
            } else {
                setPrice({
                    bestPrice: displayINR(result) || 0,
                    afterTokenDiscount: displayINR(result) || 0,
                    tokenPricediscount: displayINR(0),
                })
                return
            }

        } else if (data.selectedValue === "916halmark") {
            let result, token, resultData;
            result = (((details.touch_92 / 100) * data.itemWeight) * currentPriceCP)

            if (Number(data.usePriceToken) > 0 && (currentUserData?.bonousePoints >= Number(data.usePriceToken))) {
                token = Number(data.usePriceToken) * 39
                resultData = Number(result) - token
                setPrice({
                    bestPrice: displayINR(result) || 0,
                    afterTokenDiscount: displayINR(resultData) || 0,
                    tokenPricediscount: displayINR(token) || 0
                })
                return;
            } else {
                setPrice({
                    bestPrice: displayINR(result) || 0,
                    afterTokenDiscount: displayINR(result) || 0,
                    tokenPricediscount: displayINR(0),
                })
                return
            }

        } else {
            setPrice()
        }

    }


    const handleChangeFeild = (e) => {
        const { name, value } = e.target
        if (value < 0) return
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // CLEAR DATA
    const handleClear = (e) => {
        e.preventDefault();
        setData({
            selectedValue: "75halmark",
            itemWeight: '',
            usePriceToken: '',
        });
        setPrice({})
    }

    const PriceTokenLabel = data?.usePriceToken ? (((currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)) ? (<p className=" text-slate-700">Use Prize Token :</p>) : (<p className=" text-red-500 ">Invalid.! prize token:</p>)) : <p className="  text-slate-700">Use Prize Token :</p>

    return (

        <div className="container  mx-auto  pb-[47px] md:pb-[67px] lg:pb-[34px] bg-white p-4   lg:p-6">
            {(cardDetailsLoding || cardDetailsLoding || isGetLoading) ? (
                <h1 className="text-center">Loading...</h1>
            ) : (
                <div className="flex flex-col md:flex-row   items-center md:gap-6 justify-center lg:w-4/5 mx-auto ">
                    <div className="w-full md:w-1/2 mb-2 md:mb-0 md:p-3 bg-white">
                        {!cardDetailsLoding && (
                            <img
                                src={details?.item_Image}
                                alt={details?.item_category}
                                className="w-full object-scale-down h-[280px] py-2 md:h-[362px]"
                            />
                        )}
                    </div>



                    {/**Product details */}
                    {/* <div className='bg-white'>
                        <div className="w-full  lg:min-w-[500px] min-h-[382px] px-3 md:px-4 lg:px-6 py-4 shadow-lg ">
                            <form>

                                <div className='pb-5 bg-slate-50 p-1 py-2 md:py-4 '>
                                    <div className=" flex gap-2  items-center mb-6">
                                        <h2 className="text-[15px] font-semibold text-slate-700">Available Prize Token :</h2>
                                        <p className=' text-[15px] font-bold text-sm text-slate-800'>{((currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)) ? (currentUserData?.bonousePoints - data?.usePriceToken) : currentUserData?.bonousePoints}</p>
                                    </div>

                                    <div className=" grid grid-cols-2 gap-4 mb-5">
                                        <div className=' lg:w-52 bg-white'>
                                            <TextField
                                                autoFocus
                                                value={data.usePriceToken || ''}
                                                onChange={handleChangeFeild}
                                                name="usePriceToken"
                                                label={PriceTokenLabel}
                                                id="usePriceToken"
                                                type='number'
                                                fullWidth
                                                variant='outlined'
                                            />
                                        </div>
                                        <div className=' lg:w-52 bg-white'>
                                            <TextField
                                                autoFocus
                                                value={data.itemWeight || ''}
                                                onChange={handleChangeFeild}
                                                name="itemWeight"
                                                label="Enter Weight in gram"
                                                id="itemWeight"
                                                type='number'
                                                fullWidth
                                                variant='outlined'
                                            />
                                        </div>
                                    </div>

                                    <div className=" flex flex-wrap  items-center  gap-4 ">
                                        <label className='font-semibold text-[15px] text-slate-700'> Select Quality :</label>
                                        <div className='flex gap-3  items-center justify-center '>
                                            <RadioButton
                                                label="75 HM(18K)"
                                                value="75halmark"
                                                checked={data.selectedValue === '75halmark'}
                                                onChange={handleChange}
                                            />
                                            <RadioButton
                                                label="916 HM(22k)"
                                                value="916halmark"
                                                checked={data.selectedValue === '916halmark'}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>
                                </div>


                              
                                <div className='md:pt-3 '>

                                    <div className='flex justify-between items-center py-1.5 '>
                                        <label className='text-[14px] md:text-md lg:text-[16px] font-semibold tracking-wide text-slate-700'>Fair Price :</label>
                                        <p className='text-[14px] md:text-md lg:text-[16px] font-semibold text-pink-600 tracking-wider'> {price?.bestPrice}</p>
                                    </div>

                                    <div className='flex justify-between items-center py-1.5 '>
                                        <label className='text-[14px] md:text-md lg:text-[16px] font-semibold tracking-wide text-slate-700'>Prize Token Discount :</label>
                                        <p className=' text-[14px] md:text-md lg:text-[16px] font-semibold text-pink-600 tracking-wider'> {price?.tokenPricediscount}</p>
                                    </div>

                                    <div className='flex justify-between items-center py-1.5 '>
                                        <label className='text-[14px] md:text-md lg:text-[16px] font-semibold tracking-wide text-slate-700'>Best Fair Price :</label>
                                        <p className='text-[14px] md:text-md lg:text-[16px] font-semibold text-pink-600 tracking-wider'> {price?.afterTokenDiscount}</p>
                                    </div>
                                </div>

                                <div className='flex  gap-8 pt-2'>
                                    <button className="bg-[#D4AF37] uppercase text-xs sm:text-sm  lg:text-[15px] tracking-wider font-bold p-2 hover:bg-[#C49C2E] transition-all duration-300 text-white my-3 w-full rounded"
                                        onClick={handleSubmit}
                                    >
                                        Show Price
                                    </button>
                                    <button
                                        className="bg-[#333333] uppercase text-xs sm:text-sm lg:text-[15px] tracking-wider font-bold p-2 text-white my-3 w-full rounded hover:bg-[#555555] transition-all duration-300"
                                        onClick={handleClear}
                                    >

                                        Clear Price
                                    </button>
                                </div>


                            </form>
                        </div>
                    </div> */}

                    <div>
                        <div className="w-full lg:min-w-[500px] min-h-[382px] px-1 md:px-4 lg:px-6 py-4 md:shadow-  bg-slate-50  ">
                            <div>
                                <h2 className="text-[14px] md:text-[17px] font-bold  text-gray-800 uppercase ">Find FairPrice </h2>
                                <p className='w-full text-left text-[11px] md:text-[12px] lg:text-[13px]   text-amber-800 mb-2 md:mb-5'>Enter the weight in grams and get the best market price at a glance</p>
                            </div>
                            <form>

                                <div className='pb-5 py-1 md:py-0 '>
                                    <div className=" flex gap-2  items-center mb-4">
                                        <h2 className="text-[14px]  font-semibold text-slate-700">Available Prize Token :</h2>
                                        <p className=' text-[14px]  font-bold text-sm text-slate-800'>{((currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)) ? (currentUserData?.bonousePoints - data?.usePriceToken) : currentUserData?.bonousePoints}</p>
                                    </div>

                                    <div className=" grid grid-cols-2 gap-x-3 md:gap-4 mb-5">
                                        <div className=' lg:w-52 bg-white'>
                                            <TextField
                                                autoFocus
                                                value={data.usePriceToken || ''}
                                                onChange={handleChangeFeild}
                                                name="usePriceToken"
                                                label={PriceTokenLabel}
                                                id="usePriceToken"
                                                type='number'
                                                fullWidth
                                                variant='outlined'

                                            />
                                        </div>
                                        <div className=' lg:w-52 bg-white'>
                                            <TextField
                                                autoFocus
                                                value={data.itemWeight || ''}
                                                onChange={handleChangeFeild}
                                                name="itemWeight"
                                                label="Enter Weight in gram"
                                                id="itemWeight"
                                                type='number'
                                                fullWidth
                                                variant='outlined'
                                            />
                                        </div>
                                    </div>

                                    <div className=" flex flex-wrap  items-center  gap-2 ">
                                        <label className='font-semibold text-[14px] text-slate-700'> Select Quality :</label>
                                        <div className='flex gap-3  items-center justify-center '>
                                            <RadioButton
                                                label="75 HM(18K)"
                                                value="75halmark"
                                                checked={data.selectedValue === '75halmark'}
                                                onChange={handleChange}
                                            />
                                            <RadioButton
                                                label="916 HM(22k)"
                                                value="916halmark"
                                                checked={data.selectedValue === '916halmark'}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>
                                </div>


                                {/**show price */}
                                <div className='md:pt-3 '>

                                    <div className='flex justify-between items-center py-1.5 '>
                                        <label className='text-[14px] md:text-md lg:text-[16px] font-semibold tracking-wide text-slate-700'>Fair Price :</label>
                                        <p className='text-[14px] md:text-md lg:text-[16px] font-semibold text-pink-600 tracking-wider'> {price?.bestPrice}</p>
                                    </div>

                                    <div className='flex justify-between items-center py-1.5 '>
                                        <label className='text-[14px] md:text-md lg:text-[16px] font-semibold tracking-wide text-slate-700'>Prize Token Discount :</label>
                                        <p className=' text-[14px] md:text-md lg:text-[16px] font-semibold text-pink-600 tracking-wider'> {price?.tokenPricediscount}</p>
                                    </div>

                                    <div className='flex justify-between items-center py-1.5 '>
                                        <label className='text-[14px] md:text-md lg:text-[16px] font-semibold tracking-wide text-slate-700'>Best Fair Price :</label>
                                        <p className='text-[14px] md:text-md lg:text-[16px] font-semibold text-pink-600 tracking-wider'> {price?.afterTokenDiscount}</p>
                                    </div>
                                </div>

                                <div className='flex  gap-8 pt-2'>
                                    <button
                                        className="bg-[#D4AF37]  uppercase text-xs sm:text-sm  lg:text-[15px] tracking-wider font-bold p-2 text-white my-3 w-full rounded"
                                        onClick={handleSubmit}
                                    >
                                        Show Price
                                    </button>

                                    <button
                                        className="bg-[#333333] uppercase text-xs sm:text-sm lg:text-[15px] tracking-wider font-bold p-2 text-white my-3 w-full rounded"
                                        onClick={handleClear}
                                    >
                                        Clear Price
                                    </button>
                                </div>


                            </form>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default FairPriceDetails
