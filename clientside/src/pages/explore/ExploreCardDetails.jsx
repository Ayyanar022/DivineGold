// import React, { useCallback, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { useGetOneJewllDesign } from '../../api/ExploreApi';
// import { useGetCurrentPrice } from '../../api/AdminApi';
// import { useGetMyUser } from '../../api/MyUserApi';
// import displayINR from '../../helper/RupeeConvetion';
// import { toast } from "react-toastify";
// import { useCurrentUserConetxt } from '../../context/userContext'
// import { TextField } from '@mui/material';
// import { useAuth0 } from '@auth0/auth0-react';

// const RadioButton = ({ label, value, checked, onChange }) => {
//     return (
//         <label className='block  text-sm md:text-md'>
//             <input
//                 type='radio'
//                 value={value}
//                 checked={checked}
//                 onChange={onChange}
//                 className='mr-2 text-[6px] md:text-xs ' />
//             {label}
//         </label>
//     )
// }

// const ExploreCardDetails = () => {

//     const [activeImage, setActiveImage] = useState('')
//     const [zoomImage, setZoomImage] = useState();
//     const [zoomImageOpen, setZoomImageOpen] = useState(false);

//     const { isAuthenticated } = useAuth0();

//     const [price, setPrice] = useState({
//         bestPrice: '',
//         tokenPricediscount: '',
//         afterTokenDiscount: ''
//     })

//     const [data, setData] = useState({
//         selectedValue: "75halmark",
//         itemWeight: '',
//         usePriceToken: '',
//     })

//     // CLEAR DATA
//     const handleClear = (e) => {
//         e.preventDefault();
//         setData({
//             selectedValue: "75halmark",
//             itemWeight: '',
//             usePriceToken: '',
//         });
//         setPrice({})
//     }

//     const [currentPriceCP, setCurrentPriceCP] = useState('')

//     // to get current 999 rate
//     const { currentPriceData, isLoading: getCPisLoading } = useGetCurrentPrice()

//     // to get jewell details
//     const params = useParams()
//     const _id = params.id;
//     const { simgleJewellData, isLoading: isCardLoding } = useGetOneJewllDesign(_id)
//     const details = simgleJewellData;
//     const KchaRate = currentPriceData?.currentPrice;

//     const allowedTokenAount18k = (((details?.touch_M_75 / 100) * KchaRate) / 3)/34
//     const allowedTokenAount22k = (((details?.touch_M_92 / 100) * KchaRate) / 3)/34

//     console.log("details --", details)
//     console.log("currentPriceData", currentPriceData)
//     console.log("allowedTokenAount18k", allowedTokenAount18k)

//     const { currentUserData, setCurrentUserData } = useCurrentUserConetxt();

//     useEffect(() => {
//         setActiveImage(simgleJewellData?.jewellImage[0])
//     }, [simgleJewellData])

//     const handleMouseEnter = (imgUrl) => {
//         setActiveImage(imgUrl)
//     }

//     const handleChange = (e) => {
//         setData(prev => ({ ...prev, selectedValue: e.target.value }));
//     }

//     const emptyImageListing = new Array(4).fill(null); // for loading empty small image

//     // get current user details 
//     const { currentUser, isLoading: isUserGetLoading } = useGetMyUser();

//     //Zomm image
//     const handleZoomImage = useCallback(
//         (e) => {
//             setZoomImageOpen(true);
//             const { left, top, width, height } = e.target.getBoundingClientRect();
//             const x = (e.clientX - left) / width;
//             const y = (e.clientY - top) / height;
//             setZoomImage({
//                 x: x,
//                 y: y,
//             });
//         },
//         [zoomImage]
//     );

//     const handleZoomOut = () => {
//         setZoomImageOpen(false);
//     };

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


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!isAuthenticated) return toast.warning("Please Login..")

//         if (!data.itemWeight || Number(data.itemWeight) === 0) {
//             toast.info("Please Enter Weight...")
//             return
//         }
//         if (!currentPriceData || getCPisLoading) return

//         if (data.selectedValue === "75halmark") {
//             let result, token, resultData;
//             result = ((((details.touch_75 + details.touch_M_75) / 100) * Number(data.itemWeight)) * currentPriceCP);

//             if (Number(data.usePriceToken) > 0 && (currentUserData?.bonousePoints >= Number(data.usePriceToken))) {
//                 token = Number(data.usePriceToken) * 39
//                 resultData = Number(result) - token
//                 setPrice({
//                     bestPrice: displayINR(result) || 0,
//                     afterTokenDiscount: displayINR(resultData) || 0,
//                     tokenPricediscount: displayINR(token) || 0
//                 })
//                 return;
//             } else {
//                 setPrice({
//                     bestPrice: displayINR(result) || 0,
//                     afterTokenDiscount: displayINR(result) || 0,
//                     tokenPricediscount: displayINR(0),
//                 })
//                 return
//             }

//         } else if (data.selectedValue === "916halmark") {
//             let result, token, resultData;
//             result = ((((details.touch_92 + details.touch_M_92) / 100) * Number(data.itemWeight)) * currentPriceCP)

//             if (Number(data.usePriceToken) > 0 && (currentUserData?.bonousePoints >= Number(data.usePriceToken))) {
//                 token = Number(data.usePriceToken) * 39
//                 resultData = Number(result) - token
//                 setPrice({
//                     bestPrice: displayINR(result) || 0,
//                     afterTokenDiscount: displayINR(resultData) || 0,
//                     tokenPricediscount: displayINR(token) || 0
//                 })
//                 return;
//             } else {
//                 setPrice({
//                     bestPrice: displayINR(result) || 0,
//                     afterTokenDiscount: displayINR(result) || 0,
//                     tokenPricediscount: displayINR(0),
//                 })
//                 return
//             }
//         } else {
//             setPrice()
//         }
//     }

//     const handleChangeFeild = (e) => {
//         const { name, value } = e.target
//         if (value < 0) return
//         setData((prev) => ({
//             ...prev,
//             [name]: value
//         }))
//     }


//     // VALIDATE PRICE TOKEN
//     const PriceTokenLabel = data?.usePriceToken ? (((currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)) ? (<p className=" text-slate-700">Use Prize Token :</p>) : (<p className=" text-red-500 ">Invalid.! prize token:</p>)) : <p className="  text-slate-700">Use Prize Token :</p>

//     // prize token data
//     const PrzeTokenData = ((currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)) ? (currentUserData?.bonousePoints - data?.usePriceToken) : currentUserData?.bonousePoints

//     return (
//         <div className='container mx-auto p-4  lg:px-8 pb-[60px] md:pb-[85px] bg-white lg:pb-[28px]'>
//             <div className='min-h-[200px] flex flex-col md:flex-row md:gap-8'>

//                 {/**Product image */}
//                 <div className='h-96 flex flex-col lg:flex-row-reverse gap-2 md:gap-4'>

//                     <div className='mx-auto h-[260px] w-[270px] md:h-[300px] md:w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
//                         <img src={activeImage} onMouseLeave={handleZoomOut} onMouseMove={handleZoomImage} className='h-full w-full object-cover bg-slate-50' />

//                         {/**Zoom image mix-blend-multiply*/}
//                         {zoomImageOpen && (<div className=' hidden lg:block absolute min-h-[400px] min-w-[400px] bg-slate-200 p-1 -right-[430px] top-0'>
//                             <div
//                                 className='h-full w-full min-h-[400px] min-w-[400px]  '
//                                 style={{
//                                     backgroundImage: `url(${activeImage})`, backgroundRepeat: "no-repeat",
//                                     backgroundPosition: `${zoomImage?.x * 100}% ${zoomImage?.y * 100}%`,
//                                 }}>
//                             </div>
//                         </div>)}

//                     </div>

//                     <div className='h-full'>
//                         {
//                             isCardLoding ? (
//                                 <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-hiden h-full'>
//                                     {emptyImageListing.map((el, index) => (
//                                         <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loading" + index}> </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-hiden h-full'>
//                                     {simgleJewellData?.jewellImage?.map((imgurl, index) => (
//                                         <div className='h-20 w-20 bg-slate-200 rounded' key={"img" + imgurl}>
//                                             <img src={imgurl} onMouseEnter={() => handleMouseEnter(imgurl)} className='cursor-pointer w-full h-full object-cover border ' />
//                                         </div>
//                                     ))}
//                                 </div>
//                             )
//                         }
//                     </div>

//                 </div>

//                 {/**Product details */}
//                 <div>
//                     <div className="w-full lg:min-w-[500px] min-h-[382px] px-1 md:px-4 lg:px-6  md:shadow-md   ">

//                         <div>
//                             <h2 className="text-[14px] md:text-[17px] font-bold  text-gray-800 uppercase "><span className='  text-[16px] md:text-[19px]   text-amber-600 pr-3'>{details?.jewellName} </span>{details?.jewellDescription} </h2>
//                             <p className='w-full text-left text-[11px] md:text-[12px] lg:text-[13px]   text-amber-800 mb-2 '>Enter the weight in grams and get the best market price at a glance</p>
//                         </div>

//                         <form>

//                             <div className='pb-5    md:py-2 '>
//                                 <div className=" flex gap-2  items-center mb-4">
//                                     <h2 className="text-[14px]  font-semibold text-slate-700">Available Prize Token :</h2>
//                                     <p className=' text-[14px]  font-bold text-sm text-slate-800'>{PrzeTokenData}</p>
//                                 </div>

//                                 <div className=" grid grid-cols-2 gap-x-3 md:gap-4 mb-5">
//                                     <div className=' lg:w-52 bg-white'>
//                                         <TextField
//                                             autoFocus
//                                             value={data.usePriceToken || ''}
//                                             onChange={handleChangeFeild}
//                                             name="usePriceToken"
//                                             label={PriceTokenLabel}
//                                             id="usePriceToken"
//                                             type='number'
//                                             fullWidth
//                                             variant='outlined'

//                                         />
//                                     </div>
//                                     <div className=' lg:w-52 bg-white'>
//                                         <TextField
//                                             autoFocus
//                                             value={data.itemWeight || ''}
//                                             onChange={handleChangeFeild}
//                                             name="itemWeight"
//                                             label="Enter Weight in gram"
//                                             id="itemWeight"
//                                             type='number'
//                                             fullWidth
//                                             variant='outlined'
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className=" flex flex-wrap  items-center  gap-2 ">
//                                     <label className='font-semibold text-[14px] text-slate-700'> Select Quality :</label>
//                                     <div className='flex gap-3  items-center justify-center '>
//                                         <RadioButton
//                                             label="75 HM(18K)"
//                                             value="75halmark"
//                                             checked={data.selectedValue === '75halmark'}
//                                             onChange={handleChange}
//                                         />
//                                         <RadioButton
//                                             label="916 HM(22k)"
//                                             value="916halmark"
//                                             checked={data.selectedValue === '916halmark'}
//                                             onChange={handleChange}
//                                         />
//                                     </div>

//                                 </div>
//                             </div>


//                             {/**show price */}
//                             <div className='md:pt-3 '>

//                                 <div className='flex justify-between items-center py-1.5 '>
//                                     <label className='text-[14px] md:text-md lg:text-[16px] font-semibold tracking-wide text-slate-700'>Fair Price :</label>
//                                     <p className='text-[14px] md:text-md lg:text-[16px] font-semibold text-pink-600 tracking-wider'> {price?.bestPrice}</p>
//                                 </div>

//                                 <div className='flex justify-between items-center py-1.5 '>
//                                     <label className='text-[14px] md:text-md lg:text-[16px] font-semibold tracking-wide text-slate-700'>Prize Token Discount :</label>
//                                     <p className=' text-[14px] md:text-md lg:text-[16px] font-semibold text-pink-600 tracking-wider'> {price?.tokenPricediscount}</p>
//                                 </div>

//                                 <div className='flex justify-between items-center py-1.5 '>
//                                     <label className='text-[14px] md:text-md lg:text-[16px] font-semibold tracking-wide text-slate-700'>Best Fair Price :</label>
//                                     <p className='text-[14px] md:text-md lg:text-[16px] font-semibold text-pink-600 tracking-wider'> {price?.afterTokenDiscount}</p>
//                                 </div>
//                             </div>

//                             <div className='flex  gap-8 pt-2'>
//                                 <button
//                                     className="bg-[#D4AF37]  uppercase text-xs sm:text-sm  lg:text-[15px] tracking-wider font-bold p-2 text-white my-3 w-full rounded"
//                                     onClick={handleSubmit}
//                                 >
//                                     Show Price
//                                 </button>

//                                 <button
//                                     className="bg-[#333333] uppercase text-xs sm:text-sm lg:text-[15px] tracking-wider font-bold p-2 text-white my-3 w-full rounded"
//                                     onClick={handleClear}
//                                 >
//                                     Clear Price
//                                 </button>
//                             </div>


//                         </form>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default ExploreCardDetails














import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import displayINR from '../../helper/RupeeConvetion';
import { toast } from 'react-toastify';
import { useCurrentUserConetxt } from '../../context/userContext';
import { TextField } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetOneJewllDesign } from '../../api/ExploreApi';
import { useGetCurrentPrice } from '../../api/AdminApi';
import { useGetMyUser } from '../../api/MyUserApi';

const RadioButton = ({ label, value, checked, onChange }) => (
    <label className="block text-sm md:text-md">
        <input
            type="radio"
            value={value}
            checked={checked}
            onChange={onChange}
            className="mr-2 text-[6px] md:text-xs"
        />
        {label}
    </label>
);

const ExploreCardDetails = () => {
    const [activeImage, setActiveImage] = useState('');
    const [zoomImage, setZoomImage] = useState();
    const [zoomImageOpen, setZoomImageOpen] = useState(false);
    const { isAuthenticated } = useAuth0();


    const { currentUser, isLoading: isUserGetLoading } = useGetMyUser();  // get current user details 
    const { currentPriceData, isLoading: getCPisLoading } = useGetCurrentPrice(); // GET KACHA RATE

    const emptyImageListing = new Array(4).fill(null); // for loading empty small image

    const [price, setPrice] = useState({
        bestPrice: '',
        tokenPricediscount: '',
        afterTokenDiscount: ''
    });

    const [data, setData] = useState({
        selectedValue: '75halmark',
        itemWeight: '',
        usePriceToken: ''
    });

    const handleClear = (e) => {
        e.preventDefault();
        setData({
            selectedValue: '75halmark',
            itemWeight: '',
            usePriceToken: ''
        });
        setPrice({});
    };



    const handleChange = (e) => {
        setData(prev => ({ ...prev, selectedValue: e.target.value }));
    }

    const [currentPriceCP, setCurrentPriceCP] = useState('');

    const params = useParams();
    const _id = params.id;
    const { simgleJewellData, isLoading: isCardLoding } = useGetOneJewllDesign(_id);
    const details = simgleJewellData;
    const { currentUserData, setCurrentUserData } = useCurrentUserConetxt();

    useEffect(() => {
        setActiveImage(simgleJewellData?.jewellImage[0]);
    }, [simgleJewellData]);

    useEffect(() => {
        if (currentPriceData?.currentPrice) {
            setCurrentPriceCP(Number(currentPriceData?.currentPrice));
        }
    }, [currentPriceData]);

    // useEffect(() => {
    //     if (currentUserData.length <= 0 && currentUser) {
    //         setCurrentUserData(currentUser);
    //     }
    // }, [currentUser, setCurrentUserData, currentUserData]);


    const handleMouseEnter = (imgUrl) => setActiveImage(imgUrl);
    const handleZoomImage = useCallback((e) => {
        setZoomImageOpen(true);
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setZoomImage({ x, y });
    }, [zoomImage]);
    const handleZoomOut = () => setZoomImageOpen(false);


    useEffect(() => {
        if (currentUser) {
            setCurrentUserData(currentUser);
        }
    }, [currentUserData]);


    //VALIDATION 
    const [tokkenErrorMessage, setTokenErrorMessage] = useState()

    // TO CHEK MAX TOKEN LIMIT 
    const allowedToken = (MtouchValue, KchaRate) => {
        const result = ((MtouchValue / 100) * KchaRate) / 3 / 34;
        const decimalPart = result % 1;

        if (decimalPart > 0.7) {
            return Math.ceil(result)
        } else {
            return Math.floor(result)
        }
    };

    //  TO SHOW ERROR MESSAGE IN LABEL 
    const validateTokenUsageErrorMessage = (userTokens, inputTokens, maxToken) => {
        if (inputTokens > maxToken) {
            return {
                isValid: true,
                message: `The max allowed token: ${maxToken}.`
            }
        }

        if (inputTokens < 0) {
            return {
                isValid: true,
                message: "Enter valid Token number"
            }
        }

        if (userTokens < inputTokens) {
            return {
                isValid: true,
                message: 'You do not have enough tokens.'
            }
        }

        if (inputTokens > 30) {
            return {
                isValid: true,
                message: 'Max Limit is 30'
            }
        }

        return {
            isValid: false,
            message: '',
        }

    }

    // HANDLE CHANGE
    const handleChangeFeild = (e) => {
        const { name, value } = e.target

        if (name === "usePriceToken" && !Number.isInteger(Number(value))) return;
        if (name === "usePriceToken") {
            const MtouchValue = data.selectedValue === '75halmark' ? details.touch_M_75 : details.touch_M_92;
            const maxToken = allowedToken(MtouchValue, currentPriceCP)
            const validation = validateTokenUsageErrorMessage(currentUserData?.bonousePoints, value, maxToken)
            console.log("validation", validation)
            setTokenErrorMessage(validation)
        }

        if (value < 0) return
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }



    const validateTokenUsage = (userTokens, inputTokens, maxToken) => {
        return inputTokens > 0 && userTokens >= inputTokens && inputTokens <= maxToken && inputTokens <= 30;
    };

    const calculatePrice = (weight, touchValue, currentPrice) => {
        return (((touchValue / 100) * Number(weight)) * currentPrice);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isAuthenticated) return toast.warning('Please Login..');

        const weight = Number(data.itemWeight);
        if (!weight) return toast.info('Please Enter Weight...');
        if (!currentPriceData || getCPisLoading) return;

        const touchValue = data.selectedValue === '75halmark' ? details.touch_75 + details.touch_M_75 : details.touch_92 + details.touch_M_92;
        const MtouchValue = data.selectedValue === '75halmark' ? details.touch_M_75 : details.touch_M_92;
        const result = calculatePrice(weight, touchValue, currentPriceCP);
        const maxToken = allowedToken(MtouchValue, currentPriceCP);

        let token = 0;
        if (validateTokenUsage(currentUserData?.bonousePoints, data?.usePriceToken, maxToken)) {
            token = Number(data?.usePriceToken) * 34;
        }

        const resultData = result - token;
        setPrice({
            bestPrice: displayINR(result),
            afterTokenDiscount: displayINR(resultData),
            tokenPricediscount: displayINR(token)
        });
    };


    const PriceTokenLabel = data?.usePriceToken
        ? ((currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)
            ? <p className="text-slate-700">Use Prize Token :</p>
            : <p className="text-red-500">Invalid.! prize token:</p>)
        : <p className="text-slate-700">Use Prize Token :</p>;

    const PrzeTokenData = (currentUserData?.bonousePoints >= data?.usePriceToken) && (data?.usePriceToken > 0)
        ? (currentUserData?.bonousePoints - data?.usePriceToken)
        : currentUserData?.bonousePoints;

    return (
        <div className='container mx-auto p-4  lg:px-8 pb-[60px] md:pb-[85px] bg-white lg:pb-[28px] w-full'>
            <div className='min-h-[200px] flex flex-col md:flex-row md:gap-8  items-center justify-center'>

                {/**Product image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-2 md:gap-4'>

                    <div className='mx-auto h-[260px] w-[270px] md:h-[300px] md:w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
                        <img src={activeImage} onMouseLeave={handleZoomOut} onMouseMove={handleZoomImage} className='h-full w-full object-cover bg-slate-50' />

                        {/**Zoom image mix-blend-multiply*/}
                        {zoomImageOpen && (<div className=' hidden lg:block absolute min-h-[400px] min-w-[400px] bg-slate-200 p-1 -right-[430px] top-0'>
                            <div
                                className='h-full w-full min-h-[400px] min-w-[400px]  '
                                style={{
                                    backgroundImage: `url(${activeImage})`, backgroundRepeat: "no-repeat",
                                    backgroundPosition: `${zoomImage?.x * 100}% ${zoomImage?.y * 100}%`,
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
                                            <img src={imgurl} onMouseEnter={() => handleMouseEnter(imgurl)} className='cursor-pointer w-full h-full object-cover border ' />
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div>

                </div>

                {/**Product details */}
                <div>
                    <div className="w-full lg:max-w-[520px] min-h-[382px] px-1 md:px-4 lg:px-6  md:shadow-md   ">

                        <div>
                            <h2 className="text-[14px] md:text-[17px] font-bold  text-gray-800 uppercase "><span className='  text-[16px] md:text-[19px]   text-amber-600 pr-3'>{details?.jewellName} </span>{details?.jewellDescription} </h2>
                            <p className='w-full text-left text-[11px] md:text-[12px] lg:text-[13px]   text-amber-800 mb-2 '>Enter the weight in grams and get the best market price at a glance</p>
                        </div>

                        <form>

                            <div className='pb-5    md:py-2 '>

                                <div className='mb-4'>
                                    {tokkenErrorMessage?.isValid
                                        ? <h2 className="text-[14px] text-red-500 font-semibold ">{tokkenErrorMessage?.message}</h2>
                                        : <h2 className="text-[14px]  font-semibold text-slate-700">{`Available Prize Token : ${PrzeTokenData}`}</h2>
                                    }
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

        </div>
    )
};

export default ExploreCardDetails;

