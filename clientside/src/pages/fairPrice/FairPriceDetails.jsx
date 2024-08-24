// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { useGetFairPriceDetailsData } from '../../api/FairPriceApi'
// import { useCurrentUserConetxt } from '../../context/userContext'
// import displayINR from '../../helper/RupeeConvetion'
// import { toast } from 'react-toastify'
// import { useGetCurrentPrice } from '../../api/AdminApi'
// import { useGetMyUser } from '../../api/MyUserApi'


// const RadioButton = ({ label, value, checked, onChange }) => {
//     return (
//         <label className='block mb-2'>
//             <input
//                 type='radio'
//                 value={value}
//                 checked={checked}
//                 onChange={onChange}
//                 className='mr-2 ' />
//             {label}
//         </label>
//     )
// }

// const FairPriceDetails = () => {

//     //GET CURRENT PRICE
//     const [currentPriceCP, setCurrentPriceCP] = useState('')
//     const { currentPriceData, isLoading: getCPisLoading } = useGetCurrentPrice()
//     const { currentUser, isLoading: isGetLoading } = useGetMyUser()
//     const { currentUserData, setCurrentUserData } = useCurrentUserConetxt();


//     useEffect(() => {
//         if (currentPriceData?.currentPrice) {
//             setCurrentPriceCP(Number(currentPriceData?.currentPrice))
//         }
//     }, [currentPriceData])


//     useEffect(() => {
//         if ((currentUserData.length <= 0) && currentUser) {
//             setCurrentUserData(currentUser)
//         }

//     }, [currentUser, setCurrentUserData, currentUserData])


//     //-------------------------------------------------

//     const { itemName, category } = useParams()
//     const { fairPriceDetails, isLoading: cardDetailsLoding } = useGetFairPriceDetailsData(itemName, category)
//     const details = fairPriceDetails?.data


//     const [data, setData] = useState({
//         selectedValue: "75halmark",
//         itemWeight: '',
//         usePriceToken: '',
//     })

//     const handleChange = (e) => {
//         setData(prev => ({ ...prev, selectedValue: e.target.value }));
//     }


//     const [price, setPrice] = useState({
//         bestPrice: '',
//         tokenPricediscount: '',
//         afterTokenDiscount: ''
//     })

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!data.itemWeight) {
//             toast.info("Please Enter Weight...")
//             return
//         }
//         if (!currentPriceData || getCPisLoading) return


//         if (data.selectedValue === "75halmark") {

//             const result = (((details.touch_75 / 100) * data.itemWeight) * currentPriceCP);
//             if ((currentUserData?.bonousePoints >= Number(data.usePriceToken)) && Number(data.usePriceToken) > 0) {
//                 const token = Number(data.usePriceToken) * 49
//                 const resultData = Number(result) - token
//                 setPrice({
//                     bestPrice: displayINR(result) || 0,
//                     afterTokenDiscount: displayINR(resultData) || 0,
//                     tokenPricediscount: displayINR(token) || 0
//                 })
//                 return
//             }
//             setPrice({ bestPrice: displayINR(result) })

//         } else if (data.selectedValue === "916halmark") {

//             const result = (((details.touch_92 / 100) * data.itemWeight) * currentPriceCP)
//             if ((currentUserData?.bonousePoints >= Number(data.usePriceToken)) && Number(data.usePriceToken) > 0) {
//                 const token = Number(data.usePriceToken) * 49
//                 const resultData = Number(result) - token
//                 setPrice({
//                     bestPrice: displayINR(result) || 0,
//                     afterTokenDiscount: displayINR(resultData) || 0,
//                     tokenPricediscount: displayINR(token) || 0
//                 })
//                 return
//             }
//             setPrice({ bestPrice: displayINR(result) })

//         } else {
//             setPrice()
//         }

//     }



//     return (

//         <div className="container mx-auto p-4">
//             {(cardDetailsLoding || cardDetailsLoding || isGetLoading) ? (
//                 <h1 className="text-center">Loading...</h1>
//             ) : (
//                 <div className="flex flex-col lg:flex-row items-center justify-center lg:w-4/5 mx-auto ">
//                     <div className="w-full lg:w-1/2 p-4 ">
//                         {!cardDetailsLoding && (
//                             <img
//                                 src={details?.item_Image}
//                                 alt={details?.item_category}
//                                 className="w-full h-auto"
//                             />
//                         )}
//                     </div>



//                     <div className="w-full lg:w-1/2 p-6 bg-gray-100 ">
//                         <form>
//                             <div className="mb-4 flex gap-2  items-center">
//                                 <h2 className="text-md font-semibold">Available Prize Token :</h2>
//                                 <p className='font-bold'>{((currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)) ? (currentUserData?.bonousePoints - data?.usePriceToken) : currentUserData?.bonousePoints}</p>
//                             </div>
//                             <div className="mb-4 ">
//                                 {
//                                     data?.usePriceToken ? (((currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)) ?
//                                         (<p className="mb-2 text-md font-semibold">Use Price Token :</p>) : (
//                                             <p className="mb-2 text-md text-red-500 font-semibold">Invalid.! prize token:</p>
//                                         )) : <p className="mb-2 text-md font-semibold">Use Price Token :</p>
//                                 }

//                                 <input
//                                     type="text"
//                                     id="usePriceToken"
//                                     value={data.usePriceToken}
//                                     onChange={(e) =>
//                                         setData((prev) => ({
//                                             ...prev,
//                                             usePriceToken: e.target.value,
//                                         }))
//                                     }
//                                     className="w-full p-2 border border-gray-300 rounded"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className='text-md font-semibold'> Select Quality :</label>
//                                 <div className='flex gap-3 mt-2'>
//                                     <RadioButton
//                                         label="75 Halmark"
//                                         value="75halmark"
//                                         checked={data.selectedValue === '75halmark'}
//                                         onChange={handleChange}
//                                     />
//                                     <RadioButton
//                                         label="916 Halmark"
//                                         value="916halmark"
//                                         checked={data.selectedValue === '916halmark'}
//                                         onChange={handleChange}
//                                     />
//                                 </div>

//                             </div>
//                             <div className="mb-4">
//                                 <label className="block mb-2 text-md font-semibold">Net Weight :</label>
//                                 <input
//                                     id="itemWeight"
//                                     type="text"
//                                     value={data.itemWeight}
//                                     onChange={(e) =>
//                                         setData((prev) => ({
//                                             ...prev,
//                                             itemWeight: e.target.value,
//                                         }))
//                                     }
//                                     className="w-full p-2 border border-gray-300 rounded"
//                                 />
//                             </div>
//                             {/**show price */}
//                             <div>
//                                 <div className='flex justify-between items-center'>
//                                     <label className='text-md font-semibold'>Fair Price :</label>
//                                     <p className='p-2 text-lg font-bold text-pink-600'> {price?.bestPrice}</p>
//                                 </div>
//                                 {
//                                     price?.tokenPricediscount && (<div>
//                                         <div className='flex justify-between items-center'>
//                                             <label className='text-md font-semibold'>Prize Token Discount :</label>
//                                             <p className='p-2 text-lg font-bold text-pink-600'> {price?.tokenPricediscount}</p>
//                                         </div>
//                                         <div className='flex justify-between items-center'>
//                                             <label className='text-md font-semibold'>Best Fair Price :</label>
//                                             <p className='p-2 text-lg font-bold text-pink-600'> {price?.afterTokenDiscount}</p>
//                                         </div>
//                                     </div>)
//                                 }


//                             </div>
//                             <button
//                                 className="bg-pink-500 p-2 text-white my-3 w-full rounded"
//                                 onClick={handleSubmit}
//                             >
//                                 Show Me Best Price
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default FairPriceDetails




import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetFairPriceDetailsData } from '../../api/FairPriceApi'
import { useCurrentUserConetxt } from '../../context/userContext'
import displayINR from '../../helper/RupeeConvetion'
import { toast } from 'react-toastify'
import { useGetCurrentPrice } from '../../api/AdminApi'
import { useGetMyUser } from '../../api/MyUserApi'
import { TextField } from '@mui/material'


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


    // PRICE CALCULATIONS
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.itemWeight) {
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

        <div className="container  mx-auto bg-gradient-to-r from-[#e3d6f9] to-[#f3e9f9] pb-[60px] lg:pb-[47px] p-4 md:p-6">
            {(cardDetailsLoding || cardDetailsLoding || isGetLoading) ? (
                <h1 className="text-center">Loading...</h1>
            ) : (
                <div className="flex flex-col md:flex-row   items-center gap-6 justify-center lg:w-4/5 mx-auto ">
                    <div className="w-full md:w-1/2 p-3 bg-white">
                        {!cardDetailsLoding && (
                            <img
                                src={details?.item_Image}
                                alt={details?.item_category}
                                className="w-full object-scale-down h-[382px]"
                            />
                        )}
                    </div>



                    {/**Product details */}
                    <div className='bg-white'>
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
                    </div>

                </div>
            )}
        </div>
    )
}

export default FairPriceDetails
