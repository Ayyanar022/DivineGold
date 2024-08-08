import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetOneJewllDesign } from '../../api/ExploreApi';
import { useGetCurrentPrice } from '../../api/AdminApi';
import { useGetMyUser } from '../../api/MyUserApi';
import displayINR from '../../helper/RupeeConvetion';
import { toast } from "react-toastify";
import { useCurrentUserConetxt } from '../../context/userContext'

const RadioButton = ({ label, value, checked, onChange }) => {
    return (
        <label className='block mb-2'>
            <input
                type='radio'
                value={value}
                checked={checked}
                onChange={onChange}
                className='mr-2 text-xs ' />
            {label}
        </label>
    )
}

const ExploreCardDetails = () => {

    const [activeImage, setActiveImage] = useState('')
    const [zoomImage, setZoomImage] = useState();
    const [zoomImageOpen, setZoomImageOpen] = useState(false);

    const [price, setPrice] = useState({
        bestPrice: '',
        tokenPricediscount: '',
        afterTokenDiscount: ''
    })

    const [data, setData] = useState({
        selectedValue: "75halmark",
        itemWeight: '',
        usePriceToken: '',
    })
    const [currentPriceCP, setCurrentPriceCP] = useState('')

    // to get current 999 rate
    const { currentPriceData, isLoading: getCPisLoading } = useGetCurrentPrice()

    // to get jewell details
    const params = useParams()
    const _id = params.id;
    const { simgleJewellData, isLoading: isCardLoding } = useGetOneJewllDesign(_id)
    const details = simgleJewellData
    console.log("details", simgleJewellData)

    const { currentUserData, setCurrentUserData } = useCurrentUserConetxt();

    useEffect(() => {
        setActiveImage(simgleJewellData?.jewellImage[0])
    }, [simgleJewellData])

    const handleMouseEnter = (imgUrl) => {
        setActiveImage(imgUrl)
    }

    const handleChange = (e) => {
        setData(prev => ({ ...prev, selectedValue: e.target.value }));
    }

    const emptyImageListing = new Array(4).fill(null); // for loading empty small image


    // get current user details 
    const { currentUser, isLoading: isUserGetLoading } = useGetMyUser();

    //Zomm image
    const handleZoomImage = useCallback(
        (e) => {
            setZoomImageOpen(true);
            const { left, top, width, height } = e.target.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            setZoomImage({
                x: x,
                y: y,
            });
        },
        [zoomImage]
    );

    const handleZoomOut = () => {
        setZoomImageOpen(false);
    };

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



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.itemWeight) {
            toast.info("Please Enter Weight...")
            return
        }
        if (!currentPriceData || getCPisLoading) return


        if (data.selectedValue === "75halmark") {

            const result = (((details.touch_75 / 100) * data.itemWeight) * currentPriceCP);
            console.log("result", result)
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
        <div className='container mx-auto p-4 lg:px-8 '>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-8'>
                {/**Product image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
                        <img src={activeImage} onMouseLeave={handleZoomOut} onMouseMove={handleZoomImage} className='h-full w-full object-scale-down mix-blend-multiply' />

                        {/**Zoom image */}
                        {zoomImageOpen && (<div className=' hidden lg:block absolute min-h-[400px] min-w-[400px] bg-slate-200 p-1 -right-[410px] top-0'>
                            <div
                                className='h-full w-full min-h-[400px] min-w-[400px]  mix-blend-multiply'
                                style={{
                                    backgroundImage: `url(${activeImage})`, backgroundRepeat: "no-repeat",

                                    backgroundPosition: `${zoomImage?.x * 100}% ${zoomImage?.y * 100
                                        }%`,
                                }}>
                            </div>
                        </div>)}

                    </div>

                    <div className='h-full'>
                        {
                            isCardLoding ? (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-hiden h-full'>
                                    {emptyImageListing.map((el, index) => (
                                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loading" + index}> </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-hiden h-full'>
                                    {simgleJewellData?.jewellImage?.map((imgurl, index) => (
                                        <div className='h-20 w-20 bg-slate-200 rounded' key={"img" + imgurl}>
                                            <img src={imgurl} onMouseEnter={() => handleMouseEnter(imgurl)} className='cursor-pointer w-full h-full object-scale-down border mix-blend-multiply' />
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div>

                </div>

                {/**Product details */}
                <div>
                    <div className="w-full lg:min-w-[500px] min-h-[382px] px-6 py-4 bg-gray-100 ">
                        <form>
                            <div className="mb-4 flex gap-2  items-center">
                                <h2 className="text-[15px] font-semibold text-slate-700">Available Prize Token :</h2>
                                <p className=' text-[15px] font-bold text-sm text-slate-800'>{((currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)) ? (currentUserData?.bonousePoints - data?.usePriceToken) : currentUserData?.bonousePoints}</p>
                            </div>
                            <div className="mb-4 ">
                                {
                                    data?.usePriceToken ? (((currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)) ?
                                        (<p className="mb-1 text-[15px] font-semibold text-slate-700">Use Price Token :</p>) : (
                                            <p className="mb-1 text-[15px] text-md text-red-500 font-semibold">Invalid.! prize token:</p>
                                        )) : <p className="mb-1 text-[15px] font-semibold text-slate-700">Use Price Token :</p>
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
                                    className="w-full text-[15px] px-2 py-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4 lg:flex  items-center gap-4">
                                <label className='font-semibold text-[15px] text-slate-700'> Select Quality :</label>
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
                                <label className="block mb-2 text-[15px] font-semibold text-slate-700">Net Weight :</label>
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
            </div>

        </div>
    )
}

export default ExploreCardDetails
