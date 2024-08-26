import React, { useState } from 'react'
import { useGetIteCategoryConstant } from '../../api/AdminApi';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';

const FilterSales = () => {

  const { getAccessTokenSilently } = useAuth0()
  const { ConstantItemCategory, isLoading: CategoryIsLoading, refetch: CategoryRefetch } = useGetIteCategoryConstant();

  const filterObject = {
    username: '',
    mobileNo: '',
    jewellCategory: '',
    startDate: '',
    endDate: '',
  }
  const [filter, setFilter] = useState(filterObject)

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

  // HANDLE CANCEL

  const handleCancel = () => {
    setFilter(filterObject)
  }

  //FILTER

  let totalQuantityArry = [];

  const handlefilterSubmit = async (e) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/filter`, {
        params: { filter },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
      })


      if (response?.data.saleItems.length > 0) {
        setFilteredData(response?.data);
        totalQuantityArry = Object.entries(response?.data?.totalQtyBasedOnCategory)
        setCategoryWiseTotal(totalQuantityArry)
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
        <form className='flex py-4 bg-pink-200 flex-col items-center justify-between gap-2 w-4/5 mx-auto  '>

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
            <div className='flex  w-60  justify-between'>
              <button onClick={handlefilterSubmit} className='px-7 py-2  bg-orange-400 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-700  shadow-sm   rounded font-bold uppercase transition-all duration-300 tracking-wider'>show</button>
              <button onClick={handleCancel} className='px-7 py-2  bg-sky-500 hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-700  shadow-sm   rounded font-bold uppercase transition-all duration-300 tracking-wider'>Clear</button>
            </div>
          </section>  


        </form>
      </div>



      <div className='w-full p-2'>
        <table className='w-full mt-2 border '>
          <thead className='border'>
            <tr className='border-b bg-slate-200 '>
              <th className=' py-2 text-left px-2'>S.No</th>
              <th className=' py-2 text-left px-1'>CusNmae</th>
              <th className=' py-2 text-left px-1'>Village</th>
              <th className=' py-2 text-left '>JewelName</th>
              <th className=' py-2 text-left '>Jewel Category</th>
              <th className=' py-2 text-left '>Quality</th>
              <th className=' py-2 text-left px-2'>Qty</th>
              <th className=' py-2 text-left px-2'>Net.Wt</th>
              <th className=' py-2 text-left px-1'>Token</th>
              <th className=' py-2 text-left px-2'>Net.Amt</th>
            </tr>
          </thead>
          <tbody >
            {filterdData?.saleItems && filterdData?.saleItems.map((item, index) => (
              <tr key={index + item?.userId?.name} className='border-b text-[14px] '>
                <td className='py-2 px-1'>{index + 1}</td>
                <td className='py-2 px-1'>{item?.userId?.name}</td>
                <td className='py-2 px-1'>{item?.userId?.village}</td>
                <td className='py-2 '>{item?.jewellName}</td>
                <td className='py-2 '>{item?.jewellCategory}</td>
                <td className='py-2 px-3'>{item?.jewllTouch}</td>
                <td className='py-2 px-3'>{item?.quantity}</td>
                <td className='py-2 px-3'>{item?.netWeight}</td>
                <td className='py-2 px-3'>{item?.PrizeToken}</td>
                <td className='py-2 px-1'>{item?.price}</td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>

      <div className='w-full  pt-4 pb-6'>
        <h1 className='font-bold text-lg uppercase tracking-wide p-4'>Overal stats</h1>
        <div className='flex gap-20 px-10 w-full '>


          <section className="bg-slate-100 p-6 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg uppercase tracking-wide mb-4">Overall Totals</h2>
            <ul className="space-y-2">
              <li className="flex justify-between gap-10">
                <span className=''>Total Tokens :</span>
                <span className='font-semibold'>{filterdData?.totalTokens}</span>
              </li>
              <li className="flex justify-between gap-3 ">
                <span>Total Wt :</span>
                <span className='font-semibold'>{filterdData?.totalWeight}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>22K Total.wt :</span>
                <span className='font-semibold'>{filterdData?.totalWeight22k}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>18K Total.Wt :</span>
                <span className='font-semibold'>{filterdData?.totalWeight18k}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Total Price :</span>
                <span className='font-semibold'>{filterdData?.totalPrice}</span>
              </li>
            </ul>
          </section>


          <section className='bg-slate-100 flex flex-col gap-3 py-4 px-6'>
            <h2 className='font-semibold uppercase tracking-wide'>Category Wise Qty</h2>
            {CategoryWiseTotal && CategoryWiseTotal?.map(([category, quantity]) => (
              <li>{category} : <apan className='font-semibold px-3'>{quantity}</apan></li>
            ))}

          </section>
        </div>
      </div>
    </div>
  )
}

export default FilterSales
