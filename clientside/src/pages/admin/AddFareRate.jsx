import React, { useState } from 'react'
import UploadFairPrice from '../../components/admin/UploadFairPrice';
import { useCreateFairPriceItem, useUpdateCurrentPrice } from '../../api/AdminApi';
import { toast } from 'react-toastify';
import { useGetAllFairPrice } from '../../api/FairPriceApi';
import { TiDeleteOutline } from "react-icons/ti"; // icon
import { MdEdit } from "react-icons/md"; // icon
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react';
import { useQueryClient } from 'react-query';

const AddFareRate = () => {

    const { createFairPrice, isLoading, isSuccess, isError } = useCreateFairPriceItem()

    const [openUploadFairPrice, setOpenUploadFairPrice] = useState(false);
    const [currentPrice, setCurrentPrice] = useState('')
    const { updateCurrentPrice, isLoading: CPisLoaing } = useUpdateCurrentPrice()
    const { fairPriceCardData, isLoading: FPisLoading } = useGetAllFairPrice()

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


    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    // Open EDIT Dialogbox
    const opnDialog = (item) => {
        setCurrentItem(item);
        setDialogOpen(true)
    }

    const closedialog = () => {
        setDialogOpen(false)
    }

    const handlechange = (e) => {
        const { name, value } = e.target;
        setCurrentItem((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    // EDIT 
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();
    const handleUpdate = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin`, currentItem, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (response?.data?.success) {
                toast.success(response?.data?.message)
                setDialogOpen(false)
                // Invalidate and refetch the query
                queryClient.invalidateQueries('getAllFairPrice');

            }
        } catch (err) {
            console.log("error", err)
        }
    }

    //DELETE 
    const handleDelete = async (item) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data: { _id: item._id }
            })
            if (response.data.success) {
                queryClient.invalidateQueries('getAllFairPrice');
                toast.success(response.data.message)
            }

        } catch (err) {
            console.log("ERROR", err)
        }
    }


    return (
        <div className=' w-full h-full container'>
            {/** TO ADD CURRENT RATE */}
            <div className='flex justify-center  border-b-2 pb-3'>
                <div className=''>
                    <form className='flex  flex-1 gap-2 p-3'>
                        <input className='p-1 px-2 outline-none border shadow-md' placeholder='Enter Current Price' value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} />
                        <button className='p-1 bg-pink-500 hover:bg-pink-600 px-2 rounded-md text-white' onClick={hanleUpdateCurrentPrice} >Update Current Price</button>
                    </form>
                </div>
            </div>

            <div className=' flex justify-between p-4 items-center shadow-md '>
                <h1 className='text-md font-semibold'>Upload new Fair Price item</h1>
                <button onClick={() => setOpenUploadFairPrice(true)} className='bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded font-medium text-sm text-white'>Upload New</button>
            </div>

            {/**Upload product */}
            {openUploadFairPrice && <UploadFairPrice
                createFairPrice={createFairPrice}
                isCreateLoading={isLoading}
                iscreateSuccess={isSuccess}
                onClose={() => setOpenUploadFairPrice(false)} />}

            {/**ALL FAIR PRICE ITEM LIST */}

            <div className='mt-7 p-3 shadow-sm'>
                <h2 className='text-md font-semibold'> All FairPrice Item List</h2>
                <div className='w-full'>
                    <table className='w-full mt-2'>
                        <thead className='border'>
                            <tr className='border-b text-md'>
                                <th className='px-4 py-2 text-left'>S.No</th>
                                <th className='px-4 py-2 text-left'>IMG</th>
                                <th className='px-4 py-2 text-left'>Item Name</th>
                                <th className='px-4 py-2 text-left'>Category</th>
                                <th className='px-4 py-2 text-left'>Touch 75</th>
                                <th className='px-4 py-2 text-left'>Touch 92</th>
                                <th className='px-4 py-2 text-left'>Edit</th>
                                <th className='px-4 py-2 text-left'>Remove</th>
                            </tr>
                        </thead>

                        <tbody>
                            {FPisLoading ? (
                                <tr>
                                    <td colSpan="8" className='text-center py-10'>
                                        <div className='flex justify-center items-center'>
                                            <AiOutlineLoading3Quarters className='animate-spin text-4xl text-gray-600' />
                                            <span className='ml-2 text-xl font-semibold'>Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                fairPriceCardData?.map((item, index) => (
                                    <tr key={index + item.item_Image} className='border-b text-sm'>
                                        <td className='px-4 py-2'>{index + 1}</td>
                                        <td className='px-4 py-2'>
                                            <div className='w-10 h-10'>
                                                <img src={item.item_Image} alt={item.itemName} className='w-full h-full object-cover' />
                                            </div>
                                        </td>
                                        <td className='px-4 py-2'>{item.itemName}</td>
                                        <td className='px-4 py-2'>{item.item_category}</td>
                                        <td className='px-4 py-2'>{item.touch_75}</td>
                                        <td className='px-4 py-2'>{item.touch_92}</td>
                                        <td onClick={() => opnDialog(item)} className='px-4 py-2 text-green-400 hover:text-green-700 cursor-pointer'>
                                            <span className='text-xl'><MdEdit /></span>
                                        </td>
                                        <td onClick={() => handleDelete(item)} className='px-4 py-2 text-red-400 hover:text-red-700 cursor-pointer'>
                                            <span className='text-xl'><TiDeleteOutline /></span>

                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/** Dialog box for editing  */}
            <Dialog open={dialogOpen} onClose={closedialog}>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent>
                    {currentItem && (
                        <div>
                            <TextField
                                autoFocus
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                name="itemName"
                                label="Item Name"
                                type='text'
                                value={currentItem.itemName}
                                onChange={handlechange}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                name="item_category"
                                label="Item Category"
                                type='text'
                                value={currentItem.item_category}
                                onChange={handlechange}
                            />
                            <TextField
                                autoFocus
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                name="touch_75"
                                label="Touch 75"
                                type='text'
                                value={currentItem.touch_75}
                                onChange={handlechange}
                            />

                            <TextField
                                autoFocus
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                name="touch_92"
                                label="Touch 92"
                                type='text'
                                value={currentItem.touch_92}
                                onChange={handlechange}
                            />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closedialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddFareRate
