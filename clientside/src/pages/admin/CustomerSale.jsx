import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetIteCategoryConstant } from '../../api/AdminApi';

const CustomerSale = () => {
  const [mobileNo, setMobileNo] = useState('')
  const [userData, setUserData] = useState([])

  const [saleData, setSaleData] = useState({
    jewellName: '',
    jewellCategory: "",
    jewllTouch: '',
    netWeight: '',
    PrizeToken: "",
    quantity: 1,
    price: '',
  })

  const { ConstantItemCategory, isLoading: CategoryIsLoading, refetch: CategoryRefetch } = useGetIteCategoryConstant();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSaleData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

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
      if (response?.data[0]) {
        setUserData(response?.data[0])
      }

    } catch (error) {
      toast.error(error.toString());
    }
  }
  console.log("userData", userData)

  return (
    <div className='w-full '>
      {/** FOR SEARCH */}
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
              padding: "5px"
            },
          }}
        />
        <button onClick={handleSubmit} className='uppercase bg-cyan-600 py-2 rounded-md shadow-sm transition-all duration-150 text-white hover:shadow-lg hover:bg-cyan-700 font-bold px-4'>Submit</button>
      </form>

      <div className=' flex px-16 py-4 gap-10  '>
        {/** TO SHOW USER DETAILS */}
        <div className=' text-lg font-semibold w-3/6 px-5 py-3 space-y-4 border shadow-md' >

          <div className='flex gap-4'>
            <label>Name :</label>
            <p className='text-slate-700'>{userData?.name}</p>
          </div>
          <div className='flex gap-4'>
            <label>Prize token :</label>
            <p className='text-slate-700'>{Number(userData?.bonousePoints) - Number(saleData?.PrizeToken)}</p>
          </div>
          <div className='flex gap-4'>
            <label>MobileNo :</label>
            <p className='text-slate-700'>{userData?.mobileNo}</p>
          </div>
          <div className='flex gap-4'>
            <label>Village :</label>
            <p className='text-slate-700'>{userData?.village}</p>
          </div>
          <div className='flex gap-4'>
            <label>City :</label>
            <p className='text-slate-700'>{userData?.city}</p>
          </div>
        </div>

        {/**TO SUBMIT JEWLL SALE */}
        <div className=' w-3/6 px-6 py-4 border shadow-md'>
          <form className='space-y-3 w-full'>

            <TextField
              autoFocus
              value={saleData?.jewellName || ''}
              onChange={handleChange}
              name="jewellName"
              label="Jewell Name"
              id="jewellName"
              type='text'
              variant='outlined'
              fullWidth
            />

            <Autocomplete
              className='mt-4'
              autoFocus
              freeSolo
              id="jewellCategory"
              value={saleData?.jewellCategory || ''}
              name="jewellCategory"
              options={ConstantItemCategory?.data || []} // This should be your fetched data
              getOptionLabel={(option) => option?.itemCategory || saleData?.jewellCategory || ''}  // Display the item name
              onChange={(event, newValue) => setSaleData(prev => ({ ...prev, jewellCategory: newValue?.itemCategory }))}
              renderInput={(params) => (
                <TextField {...params} label="Select Jewell Category" variant='outlined' />
              )}
            />

            <div className='flex gap-2'>


              <TextField
                autoFocus
                value={saleData?.PrizeToken || ''}
                onChange={handleChange}
                name="PrizeToken"
                label="Price Token"
                id="PrizeToken"
                type='number'
                variant='outlined'
              />
              <TextField
                autoFocus
                value={saleData?.jewllTouch || ''}
                onChange={handleChange}
                name="jewllTouch"
                label="Quality"
                id="jewllTouch"
                type='number'
                variant='outlined'
              />
              <TextField
                autoFocus
                value={saleData?.netWeight || ''}
                onChange={handleChange}
                name="netWeight"
                label="Net weight"
                id="netWeight"
                type='number'
                variant='outlined'
              />
            </div>

            <div className='flex gap-2 h-16'>

              <div className='w-[150px]'>
                <TextField
                  autoFocus
                  value={saleData?.quantity || ''}
                  onChange={handleChange}
                  name="quantity"
                  label="Quantity"
                  id="quantity"
                  type='number'
                  variant='outlined'
                />
              </div>

              <TextField
                autoFocus
                value={saleData?.price || ''}
                onChange={handleChange}
                name="price"
                label="Total Amount"
                id="price"
                type='number'
                variant='outlined'
                fullWidth
              />
            </div>

            <button className='bg-cyan-600 transition-all duration-150 hover:bg-cyan-700 hover:shadow-lg shadow-md py-2.5 w-full text-md font-bold text-white'>
              Submit
            </button>
          </form>
        </div>

      </div>

    </div>
  )
}

export default CustomerSale
