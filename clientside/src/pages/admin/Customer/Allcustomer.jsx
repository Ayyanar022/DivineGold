import React from 'react'
import { useGetAllCustomer } from '../../../api/AdminApi'

const Allcustomer = () => {
    const { allCustomer, isLoading: allCusLoading } = useGetAllCustomer()

    if (allCusLoading) return <span>Loading....</span>

    console.log("allCustomer", allCustomer)

    return (
        <div className='container w-full h-full'>
            <div className='py-4'>
                search part
            </div>
            <table className='w-full userTable'>
                <thead className='bg-black text-white text-sm'>
                    <th className='p-2'>S.No</th>
                    <th className='p-2'>Full Name</th>
                    <th className='p-2'>MobileNo</th>
                    <th className='p-2'>Village</th>
                    <th className='p-2'>Points</th>
                    <th className='p-2'>Show</th>
                </thead>
                <tbody>
                    {allCustomer?.map((cus, index) => (
                        <tr className=''>
                            <td className='text-center text-sm p-1'>{index + 1}</td>
                            <td className='text-center text-sm p-1'>{cus.name}</td>
                            <td className='text-center text-sm p-1'>{cus.mobileNo}</td>
                            <td className='text-center text-sm p-1'>{cus.village}</td>
                            <td className='text-center text-sm p-1'>{cus.bonousePoints}</td>
                            <td className='text-center text-sm font-semibold p-1'><button className='px-3 rounded text-white py-1 bg-pink-500 hover:bg-pink-600'>View</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Allcustomer
