import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetIteCategoryConstant } from '../../api/AdminApi';

const quality = [{ id: 1, label: "22k" }, { id: 2, label: "18k" },]

const CustomerSale = () => {
  const [mobileNo, setMobileNo] = useState('')
  const [userData, setUserData] = useState([])

  const [saleData, setSaleData] = useState({
    jewellName: '',
    jewellCategory: "",
    jewllTouch: "22k",
    netWeight: '',
    PrizeToken: '',
    quantity: 1,
    price: '',

  })

  const { ConstantItemCategory,  } = useGetIteCategoryConstant();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSaleData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const { getAccessTokenSilently } = useAuth0();


  // TO GET USER 
  const handleSubmitGetUser = async (e, mobileNo) => {

    e.preventDefault()
    if (!mobileNo) {
      toast.warning("Enter MobileNo");
      return
    }
    // Validation: Check if mobileNo is a valid number and has the correct length (assuming 10 digits for example)
    const mobileNoRegex = /^[0-9]{10}$/; // Adjust the regex based on the required format
    if (!mobileNoRegex.test(mobileNo)) {
      toast.warning("Enter a valid 10-digit Mobile Number");
      return;
    }


    try {

      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/customersale/get-customer/${mobileNo}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
      });
      // Handle response data
      if (response?.data[0]) {
        setUserData(response?.data[0])
      } else {
        toast.info("No customer Found..!")
      }

    } catch (error) {
      toast.error(error.toString());
    }
  }

  // TO ADD SALE DATA
  const handleAddSale = async (e, userId) => {
    e.preventDefault();
    const sale = { ...saleData, userId }
    const { PrizeToken, jewellCategory, jewellName, jewllTouch, quantity, price, netWeight } = sale;
    if (!PrizeToken || !jewellCategory || !jewellName || !jewllTouch || !quantity || !price || !netWeight || !userId) {
      toast.warning("Check all feilds..");
      return;
    }
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/customersale`, sale, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      })

      if (response?.status === 201) {
        setSaleData({})
        toast.success(response?.data?.message)
      }

    } catch (err) {
      console.log("Somthing went wrong ..", err)
    }
  }


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
          style={{ width: "330px", }}
          required

        />
        <button onClick={(e) => handleSubmitGetUser(e, mobileNo)} className='uppercase bg-cyan-600 py-2 rounded-md shadow-sm transition-all duration-150 text-white hover:shadow-lg hover:bg-cyan-700 font-bold px-4'>Submit</button>
      </form>

      <div className=' flex px-16 py-4 gap-10  '>
        {/** TO SHOW USER DETAILS */}
        <div className=' text-lg font-semibold w-3/6 px-5 py-3 space-y-4 border shadow-md' >

          <div className='flex gap-4'>
            <label>Name :</label>
            <p className='text-slate-700'>{userData?.name || ''}</p>
          </div>
          <div className='flex gap-4'>
            <label>Prize token :</label>
            <p className='text-slate-700'>{Number(userData?.bonousePoints) - Number(saleData?.PrizeToken) || ''}</p>
          </div>
          <div className='flex gap-4'>
            <label>MobileNo :</label>
            <p className='text-slate-700'>{userData?.mobileNo || ''}</p>
          </div>
          <div className='flex gap-4'>
            <label>Village :</label>
            <p className='text-slate-700'>{userData?.village || ''}</p>
          </div>
          <div className='flex gap-4'>
            <label>City :</label>
            <p className='text-slate-700'>{userData?.city || ''}</p>
          </div>
        </div>

        {/**TO SUBMIT JEWELL SALE */}
        <div className=' w-3/6 p-4 border shadow-md'>
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
              required
            />

            <Autocomplete
              className='mt-4'
              autoFocus
              freeSolo
              required
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

            <div className='flex gap-2 items-center justify-center '>


              <TextField
                autoFocus
                value={saleData?.PrizeToken || ''}
                onChange={handleChange}
                name="PrizeToken"
                label="PriceToken"
                id="PrizeToken"
                type='number'
                variant='outlined'
                style={{ maxWidth: "110px" }}
                required
              />

              <Autocomplete
                className='w-44'
                required
                autoFocus
                id="jewllTouch"
                value={saleData?.jewllTouch || ''}
                name="jewllTouch"
                options={quality || []} // This should be your fetched data
                getOptionLabel={(option) => option?.label || saleData?.jewllTouch || ''}  // Display the item name
                onChange={(event, newValue) => setSaleData(prev => ({ ...prev, jewllTouch: newValue?.label }))}
                renderInput={(params) => (
                  <TextField {...params} label="Quality" variant='outlined' />
                )}
              />


              <TextField
                autoFocus
                required
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
                required
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

            <button onClick={(e) => handleAddSale(e, userData?._id)} className='bg-cyan-600 transition-all duration-150 hover:bg-cyan-700 hover:shadow-lg shadow-md py-2.5 w-full text-md font-bold text-white'>
              Submit
            </button>
          </form>
        </div>

      </div>

    </div>
  )
}

export default CustomerSale
