import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetFairPriceDetailsData } from '../../api/FairPriceApi'
import { useCurrentUserConetxt } from '../../context/userContext'


const RadioButton = ({ label, value, checked, onChange }) => {
    return (
        <label>
            <input
                type='radio'
                value={value}
                checked={checked}
                onChange={onChange}
                style={{ marginRight: "10px" }}
            />
            {label}
        </label>
    )
}

const FairPriceDetails = () => {

    const { itemName, category } = useParams()
    const { fairPriceDetails, isLoading: cardDetailsLoding } = useGetFairPriceDetailsData(itemName, category)
    const details = fairPriceDetails?.data
    console.log("details", details)

    const { currentUserData } = useCurrentUserConetxt();
    console.log("currentUserData", currentUserData)

    const [data, setData] = useState({
        selectedValue: "75halmark"
    })

    const handleChange = (e) => {
        setData(prev => ({ ...prev, selectedValue: e.target.value }));
    }

    return (
        <div className='container mx-auto '>
            {cardDetailsLoding ? <h1>Loading...</h1> : (
                <div className='flex items-center justify-center'>
                    <div className='w-1/2 h-full p-4 '>

                        {!cardDetailsLoding && <img src={details?.item_Image} alt={details?.item_category} />}
                    </div>
                    <div className='w-1/2 p-4 bg-gray-100 h-full'>
                        <div>
                            <h2>Avilable Price Token :</h2>
                            <p>{currentUserData?.bonousePoints}</p>
                        </div>
                        <div>
                            <RadioButton
                                label='75 Halmark'
                                value="75halmark"
                                checked={data.selectedValue === '75halmark'}
                                onChange={handleChange}
                            />
                            <RadioButton
                                label='916 Halmark'
                                value="916halmark"
                                checked={data.selectedValue === '916halmark'}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <h2>Avilable Price Token :</h2>
                            <p>{currentUserData?.bonousePoints}</p>
                        </div>

                    </div>
                </div>
            )}


        </div>
    )
}

export default FairPriceDetails
