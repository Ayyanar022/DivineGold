import React, { useState } from 'react'
import { useGetIteCategoryConstant } from '../../api/AdminApi';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';

const FilterSales = () => {

  const { getAccessTokenSilently } = useAuth0()
  const { ConstantItemCategory, isLoading: CategoryIsLoading, refetch: CategoryRefetch } = useGetIteCategoryConstant();

  const [filter, setFilter] = useState({
    username: '',
    mobileNo: '',
    jewellCategory: '',
    startDate: '',
    endDate: '',
  })

  const [filterdData, setFilteredData] = useState([])
  const [CategoryWiseTotal, setCategoryWiseTotal] = useState([])

  const { username, mobileNo, startDate, endDate, jewellCategory } = filter

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter(curr => ({
      ...curr,
      [name]: value
    }))

  }

  //FILTER

  let totalQuantityArry = [];

  const handlefilterSubmit = async (e) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await axios.get(`http://localhost:7000/api/admin/filter`, {
        params: { filter },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
      })

      // console.log("response", response);

      if (response?.data.saleItems.length > 0) {
        setFilteredData(response?.data);
        totalQuantityArry = Object.entries(response?.data?.totalQtyBasedOnCategory)
        setCategoryWiseTotal(totalQuantityArry)
        console.log("totalQuantityArry", totalQuantityArry)
      } else {
        toast.info("No Data Found..")
      }

    } catch (err) {
      console.log("error", err)
    }
  }



  return (
    <div>
      <div className='p-4'>
        <form className='flex py-3 bg-pink-200 flex-col items-center justify-between gap-2 w-4/5 mx-auto  '>

          <section className='flex items-center justify-between gap-3 w-full  px-5'>
            <input type='text'
              value={username}
              onChange={handleChange}
              placeholder='Name'
              name='username'
              id='username'
              className='border w-60 py-2.5 focus:border-lime-500 focus:shadow-md shadow-sm focus:shadow-lime-200 transition-all duration-150  focus:border-2 px-4 outline-none'
            />
            <input type='number'
              value={mobileNo}
              onChange={handleChange}
              placeholder='MobileNo'
              name='mobileNo'
              id='mobileNo'
              className='border w-60 py-2.5 focus:border-lime-500 focus:shadow-md shadow-sm focus:shadow-lime-200 transition-all duration-150  focus:border-2 px-4 outline-none'
            />

            <Autocomplete
              className='w-60'
              autoFocus
              freeSolo
              required
              id="jewellCategory"
              value={jewellCategory || ''}
              name="jewellCategory"
              options={ConstantItemCategory?.data || []} // This should be your fetched data
              getOptionLabel={(option) => option?.itemCategory || jewellCategory || ''}  // Display the item name
              onChange={(event, newValue) => setFilter(prev => ({ ...prev, jewellCategory: newValue?.itemCategory }))}
              renderInput={(params) => (
                <TextField {...params} label="Select Category" variant='outlined' />
              )}
            />

          </section>

          <section className=' flex items-center justify-between gap-3 w-full px-5'>
            <input type='date'
              value={startDate}
              onChange={handleChange}
              placeholder='Satrt Date'
              name='startDate'
              id="startDate"
              className='border w-60 py-2.5 focus:border-lime-500 focus:shadow-md shadow-sm focus:shadow-lime-200 transition-all duration-150  focus:border-2 px-4 outline-none'
            />
            <input type='date'
              value={endDate}
              onChange={handleChange}
              placeholder='End Date'
              name='endDate'
              id="endDate"
              className='border w-60 py-2.5 focus:border-lime-500 focus:shadow-md shadow-sm focus:shadow-lime-200 transition-all duration-150  focus:border-2 px-4 outline-none'
            />
            <button onClick={handlefilterSubmit} className='px-8 py-2 w-60 bg-teal-400 hover:bg-teal-500 shadow-sm   rounded font-semibold uppercase transition-all duration-150 tracking-wider'>show</button>
          </section>


        </form>
      </div>



      <div className='w-full p-2'>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>CusNmae</th>
              <th>Village</th>
              <th>JewelName</th>
              <th>Jewel Category</th>
              <th>Quality</th>
              <th>Qty</th>
              <th>Net.Wt</th>
              <th>PriceToken</th>
              <th>Net.Amt</th>
            </tr>
          </thead>
          <tbody>
            {filterdData?.saleItems && filterdData?.saleItems.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item?.userId?.name}</td>
                <td>{item?.userId?.village}</td>
                <td>{item?.jewellName}</td>
                <td>{item?.jewellCategory}</td>
                <td>{item?.jewllTouch}</td>
                <td>{item?.quantity}</td>
                <td>{item?.netWeight}</td>
                <td>{item?.PrizeToken}</td>
                <td>{item?.price}</td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>

      <div className='w-full flex gap-20 px-10 py-7'>
        <section>
          <h2>Overal Total </h2>
          <li>TotalTkn :{filterdData?.totalTokens}</li>
          <li>Total Weight :{filterdData?.totalWeight}</li>
          <li>22K Total.Wt :{filterdData?.totalWeight}</li>
          <li>18K Total.Wt :{filterdData?.totalWeight18k}</li>
          <li>Total Price :{filterdData?.totalPrice}</li>
        </section>

        <section>
          <h2>Category Wise Qty</h2>
          {CategoryWiseTotal && CategoryWiseTotal?.map(([category, quantity]) => (
            <li>{category} : {quantity}</li>
          ))}

        </section>

      </div>
    </div>
  )
}

export default FilterSales
