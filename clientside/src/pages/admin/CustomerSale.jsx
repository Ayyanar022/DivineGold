import { TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';

const CustomerSale = () => {
  const [mobileNo, setMobileNo] = useState('')

  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`http://localhost:7000/api/admin/customersale/get-customer/${mobileNo}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
      });
      // Handle response data
      console.log("customer", response.data);
    } catch (error) {
      toast.error(error.toString());
    }
  }


  return (
    <div>

      <form className='w-full flex justify-center p-3 gap-8 items-center border-b-2 '>
        <TextField
          autoFocus
          value={mobileNo || ''}
          onChange={(e) => setMobileNo(e.target.value)}
          name="mobileNo"
          label="Mobile No"
          id="mobileNo"
          type='number'
          variant='outlined'
          style={{ width: "330px", padding: "5px" }} // Adjust height and padding
          InputProps={{
            style: {
              height: '45px',
            },
          }}
        />
        <button onClick={handleSubmit} className='uppercase bg-cyan-600 py-2 rounded-md shadow-sm transition-all duration-150 text-white hover:shadow-lg hover:bg-cyan-700 font-bold px-4'>Submit</button>
      </form>

      <div className='flex flex-col md:flex-row '>
        <div className='bg-amber-200'></div>
        <div className='bg-cyan-200'></div>
      </div>

    </div>
  )
}

export default CustomerSale
