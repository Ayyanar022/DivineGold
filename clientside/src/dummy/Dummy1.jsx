import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCurrentUserConetxt } from '../../context/userContext'
import displayINR from '../../helper/RupeeConvetion'
import { toast } from 'react-toastify'
import { useGetCurrentPrice } from '../../api/AdminApi'
import { useGetMyUser } from '../../api/MyUserApi'
import { useGetOneJewllDesign } from '../../api/ExploreApi'


const RadioButton = ({ label, value, checked, onChange }) => {
    return (
        <label className='block mb-2'>
            <input
                type='radio'
                value={value}
                checked={checked}
                onChange={onChange}
                className='mr-2 ' />
            {label}
        </label>
    )
}

const Dummy1 = () => {

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

    const params = useParams()
    const _id = params.id;
    const { simgleJewellData, isLoading: cardDetailsLoding } = useGetOneJewllDesign(_id)
    const details = simgleJewellData?.data
    console.log("details", simgleJewellData)


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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.itemWeight) {
            toast.info("Please Enter Weight...")
            return
        }
        if (!currentPriceData || getCPisLoading) return


        if (data.selectedValue === "75halmark") {

            const result = (((details.touch_75 / 100) * data.itemWeight) * currentPriceCP);
            if ((currentUserData?.bonousePoints >= Number(data.usePriceToken)) && Number(data.usePriceToken) > 0) {
                const token = Number(data.usePriceToken) * 49
                const resultData = Number(result) - token
                setPrice({
                    bestPrice: displayINR(result) || 0,
                    afterTokenDiscount: displayINR(resultData) || 0,
                    tokenPricediscount: displayINR(token) || 0
                })
                return
            }
            setPrice({ bestPrice: displayINR(result) })

        } else if (data.selectedValue === "916halmark") {

            const result = (((details.touch_92 / 100) * data.itemWeight) * currentPriceCP)
            if ((currentUserData?.bonousePoints >= Number(data.usePriceToken)) && Number(data.usePriceToken) > 0) {
                const token = Number(data.usePriceToken) * 49
                const resultData = Number(result) - token
                setPrice({
                    bestPrice: displayINR(result) || 0,
                    afterTokenDiscount: displayINR(resultData) || 0,
                    tokenPricediscount: displayINR(token) || 0
                })
                return
            }
            setPrice({ bestPrice: displayINR(result) })

        } else {
            setPrice()
        }

    }



    return (

        <div className="container mx-auto p-4">
            {(cardDetailsLoding || cardDetailsLoding || isGetLoading) ? (
                <h1 className="text-center">Loading...</h1>
            ) : (
                <div className="flex flex-col lg:flex-row items-center justify-center lg:w-4/5 mx-auto ">
                    <div className="w-full lg:w-1/2 p-4 ">
                        {!cardDetailsLoding && (
                            <img
                                src={details?.item_Image}
                                alt={details?.item_category}
                                className="w-full h-auto"
                            />
                        )}
                    </div>
                    <div className="w-full lg:w-1/2 p-6 bg-gray-100 ">
                        <form>
                            <div className="mb-4 flex gap-2  items-center">
                                <h2 className="text-md font-semibold">Available Prize Token :</h2>
                                <p className='font-bold'>{((currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)) ? (currentUserData?.bonousePoints - data?.usePriceToken) : currentUserData?.bonousePoints}</p>
                            </div>
                            <div className="mb-4 ">
                                {
                                    data?.usePriceToken ? (((currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)) ?
                                        (<p className="mb-2 text-md font-semibold">Use Price Token :</p>) : (
                                            <p className="mb-2 text-md text-red-500 font-semibold">Invalid.! prize token:</p>
                                        )) : <p className="mb-2 text-md font-semibold">Use Price Token :</p>
                                }

                                <input
                                    type="text"
                                    id="usePriceToken"
                                    value={data.usePriceToken}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            usePriceToken: e.target.value,
                                        }))
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className='text-md font-semibold'> Select Quality :</label>
                                <div className='flex gap-3 mt-2'>
                                    <RadioButton
                                        label="75 Halmark"
                                        value="75halmark"
                                        checked={data.selectedValue === '75halmark'}
                                        onChange={handleChange}
                                    />
                                    <RadioButton
                                        label="916 Halmark"
                                        value="916halmark"
                                        checked={data.selectedValue === '916halmark'}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-md font-semibold">Net Weight :</label>
                                <input
                                    id="itemWeight"
                                    type="text"
                                    value={data.itemWeight}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            itemWeight: e.target.value,
                                        }))
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            {/**show price */}
                            <div>
                                <div className='flex justify-between items-center'>
                                    <label className='text-md font-semibold'>Fair Price :</label>
                                    <p className='p-2 text-lg font-bold text-pink-600'> {price?.bestPrice}</p>
                                </div>
                                {
                                    price?.tokenPricediscount && (<div>
                                        <div className='flex justify-between items-center'>
                                            <label className='text-md font-semibold'>Prize Token Discount :</label>
                                            <p className='p-2 text-lg font-bold text-pink-600'> {price?.tokenPricediscount}</p>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <label className='text-md font-semibold'>Best Fair Price :</label>
                                            <p className='p-2 text-lg font-bold text-pink-600'> {price?.afterTokenDiscount}</p>
                                        </div>
                                    </div>)
                                }


                            </div>
                            <button
                                className="bg-pink-500 p-2 text-white my-3 w-full rounded"
                                onClick={handleSubmit}
                            >
                                Show Me Best Price
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dummy1
