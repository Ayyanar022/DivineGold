import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useUpdateCurrentPrice } from '../../api/AdminApi'
import { toast } from 'react-toastify'

const AddCP_Rate = () => {

    const { updateCurrentPrice } = useUpdateCurrentPrice()
    const [currentPrice, setCurrentPrice] = useState('')

    //Update current RATE
    const hanleUpdateCurrentPrice = async (e) => {
        e.preventDefault()
        const response = await updateCurrentPrice(currentPrice);
        if (response?.sucess) {
            toast.success(response?.message?.toString())
            setCurrentPrice('')
        } else {
            toast.error("somthing wrong..")
        }
    }


    return (
        <div>
            <form className='flex flex-col justify-center items-center gap-7 py-7 '>
              
                <div className='w-36 h-12 flex justify-center items-center'>
                    <TextField
                        fullWidth
                        margin='dense'
                        autoFocus
                        value={currentPrice || ''}
                        onChange={(e) => setCurrentPrice(e.target.value)}
                        id="currentPrice"
                        variant='outlined'
                        type='number'
                        label="Current Rate"
                    />
                </div>

                <button className=' px-5 py-3.5  uppercase text-[16px] font-semibold  bg-gradient-to-br from-lime-500 bg-yellow-300  hover:shadow-lg transition-all duration-300' onClick={hanleUpdateCurrentPrice} >Update Current Rate</button>
            </form>
        </div>
    )
}

export default AddCP_Rate
