import React, { useState } from 'react'
// import UploadFairPrice from '../../components/admin/UploadFairPrice';
import { useCreateFairPriceItem, useGetIteCategoryConstant, useGetItemGenderConstant, useGetItemNameConstant, useGetItemTypeConstant, useUpdateCurrentPrice } from '../../api/AdminApi';
import { toast } from 'react-toastify';
import { useGetAllFairPrice } from '../../api/FairPriceApi';
import { TiDeleteOutline } from "react-icons/ti"; // icon
import { MdDelete, MdEdit } from "react-icons/md"; // icon
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Autocomplete } from '@mui/material';
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react';
import { useQueryClient } from 'react-query';
import uploadRateforImage from '../../helper/uploadRateForImage';

const AddFareRate = () => {

    const { createFairPrice, isLoading, isSuccess, isError } = useCreateFairPriceItem()

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

    const { ConstantItemName, isLoading: NameIsLoading, refetch: NameRefetch } = useGetItemNameConstant()
    const { ConstantItemCategory, isLoading: CategoryIsLoading, refetch: CategoryRefetch } = useGetIteCategoryConstant();
    const { ConstantItemType, isLoading: typeIsLoading, refetch: typeRefetch } = useGetItemTypeConstant();
    const { ConstantItemGender, isLoading: GenderisLoading, refetch: GenderRefetch } = useGetItemGenderConstant();

    // const [dialogOpen, setDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [isEditMode, setisEditMode] = useState(false)
    const [dailogOpen, setDialogOpen] = useState()

    const schema = {
        jewellName: '',
        jewellCategory: null,
        jewellType: null,
        jewellGender: '',
        touch_75: "",
        touch_92: "",
        jewellImage: [],
        jewellDescription: ""
    }
    const [jewellData, setJewellData] = useState(schema)


    const handleChange = (e) => {
        const { value, name } = e.target
        setJewellData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // Open EDIT Dialogbox
    // const opnDialog = (item) => {
    //     setCurrentItem(item);
    //     setDialogOpen(true)
    // }


    // Edit 
    const opnDialog = (item) => {

        setJewellData({
            ...item,
            jewellCategory: item?.jewellCategory,
            jewellType: item?.jewellType,
        });
        setDialogOpen(true);
    }


    // EDIT 
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();


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

    // to remove image from  array
    const deleteProductImage = (index) => {
        const newProductImage = [...jewellData.jewellImage];
        newProductImage?.splice(index, 1);
        setJewellData((prev) => {
            return {
                ...prev,
                jewellImage: [...newProductImage],
            };
        });
    };

    //Upload Image
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return
        try {
            const uploadImage = await uploadRateforImage(file);
            setJewellData(prev => ({ ...prev, jewellImage: [...prev.jewellImage, uploadImage.url] }))
        } catch (err) {
            console.log("error", err)
        }
    }

    //close dialog
    const closeDialogFun = () => {
        setDialogOpen(false)
        setisEditMode(false)
        setJewellData(schema)
    }


    const handleEditJewllDesign = async () => {
        try {
            console.log("jewll design", jewellData)
            const accessToken = await getAccessTokenSilently();
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/put-fairprice`, jewellData, {
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


    const handleSubmit = (e) => {
        e.preventDefault()
        if (createFairPrice) {
            createFairPrice(jewellData)
            setJewellData(schema)
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
                <button onClick={() => setDialogOpen(true)} className='bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded font-medium text-sm text-white'>Upload New</button>
            </div>


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
                                <th className='px-4 py-2 text-left'>Type</th>
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
                                    <tr key={index + item?.jewellImage[0]} className='border-b text-sm'>
                                        <td className='px-4 py-2'>{index + 1}</td>
                                        <td className='px-4 py-2'>
                                            <div className='w-10 h-10'>
                                                <img src={item?.jewellImage[0]} alt={item?.jewellName} className='w-full h-full object-cover' />
                                            </div>
                                        </td>
                                        <td className='px-4 py-2'>{item?.jewellName}</td>
                                        <td className='px-4 py-2'>{item?.jewellCategory}</td>
                                        <td className='px-4 py-2'>{item?.jewellType}</td>
                                        <td className='px-4 py-2'>{item?.touch_75}</td>
                                        <td className='px-4 py-2'>{item?.touch_92}</td>
                                        <td onClick={() => {
                                            opnDialog(item);
                                            setisEditMode(true)
                                        }} className='px-4 py-2 text-green-400 hover:text-green-700 cursor-pointer'>
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


            {/**Dilalog box for add item  */}
            <Dialog open={dailogOpen} onClose={closeDialogFun}  >
                <DialogTitle className=''>
                    Upload New Jewell Item
                </DialogTitle>
                <DialogContent>

                    <div className='grid grid-cols-2 gap-4'>
                        <Autocomplete
                            className='mt-4'
                            autoFocus
                            freeSolo
                            id="jewellName"
                            value={jewellData.jewellName || ''}
                            name="jewellName"
                            options={ConstantItemName?.data || []} // This should be your fetched data
                            getOptionLabel={(option) => option?.itemName || jewellData?.jewellName || ''}  // Display the item name
                            onChange={(event, newValue) => setJewellData(prev => ({ ...prev, jewellName: newValue?.itemName }))}
                            renderInput={(params) => (
                                <TextField {...params} label="Select Jewell Name" variant='outlined' />
                            )}
                        />

                        <Autocomplete
                            className='mt-4'
                            autoFocus
                            freeSolo
                            id="jewellCategory"
                            value={jewellData?.jewellCategory || ''}
                            name="jewellCategory"
                            options={ConstantItemCategory?.data || []} // This should be your fetched data
                            getOptionLabel={(option) => option?.itemCategory || jewellData?.jewellCategory || ''}  // Display the item name
                            onChange={(event, newValue) => setJewellData(prev => ({ ...prev, jewellCategory: newValue?.itemCategory }))}
                            renderInput={(params) => (
                                <TextField {...params} label="Select Jewell Category" variant='outlined' />
                            )}
                        />

                    </div>

                    <div className='grid grid-cols-2 gap-4'>

                        <Autocomplete
                            className='mt-4'
                            autoFocus
                            freeSolo
                            id="jewellType"
                            name="jewellType"
                            value={jewellData?.jewellType || ''}
                            options={ConstantItemType?.data || []}
                            getOptionLabel={(option) => option?.itemType || jewellData?.jewellType || ''}
                            onChange={(event, newValue) => setJewellData(prev => ({ ...prev, jewellType: newValue?.itemType }))}
                            renderInput={(params) => (
                                <TextField {...params} label="Select jewll Type" variant='outlined' />
                            )}
                        />

                        <Autocomplete
                            className='mt-4'
                            freeSolo
                            autoFocus
                            id="jewellGender"
                            name="jewellGender"
                            value={jewellData?.jewellGender || ''}
                            options={ConstantItemGender?.data || []}
                            getOptionLabel={(option) => option?.itemGender || jewellData?.jewellGender || ''}
                            onChange={(event, newValue) => setJewellData(prev => ({ ...prev, jewellGender: newValue?.itemGender }))}
                            renderInput={(params) => (
                                <TextField {...params} label="Select Gender" variant='outlined' />
                            )}
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <TextField
                            fullWidth
                            margin='dense'
                            autoFocus
                            value={jewellData.touch_75 || ''}
                            onChange={handleChange}
                            name="touch_75"
                            id="touch_75"
                            variant='outlined'
                            type='number'
                            label="Touch 75"
                        />
                        <TextField
                            fullWidth
                            margin='dense'
                            autoFocus
                            value={jewellData.touch_92 || ''}
                            onChange={handleChange}
                            name="touch_92"
                            id="touch_92"
                            variant='outlined'
                            type='number'
                            label="Touch 92"
                        />
                    </div>


                    {jewellData.jewellImage.length > 0 && (
                        <div className="flex gap-4 ">
                            {jewellData.jewellImage.map((image, index) => (
                                <div className="relative group" key={index}>
                                    <img
                                        src={image}
                                        width={90}
                                        height={90}
                                        className="bg-slate-100 rounded border cursor-pointer mt-2"
                                        alt="product"
                                    />
                                    <div
                                        className="absolute top-2 right-1 bg-orange-500 rounded-full p-1 hidden group-hover:block cursor-pointer"
                                        onClick={() => deleteProductImage(index)}
                                    >
                                        <MdDelete />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <label htmlFor="image" className=''>
                        <div className='border p-3 mt-2 bg-green-300 my-2'>
                            <p className='text-center font-sans font-semibold text-sm'>Upload Image</p>
                            <input id="image" className='hidden' onChange={handleUploadImage} type='file' />
                        </div>
                    </label>

                    <TextField
                        fullWidth
                        margin='dense'
                        autoFocus
                        value={jewellData.jewellDescription}
                        onChange={handleChange}
                        name="jewellDescription"
                        id="jewellDescription"
                        variant='outlined'
                        type='text'
                        label="Description"
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialogFun}>Cancel</Button>
                    {isEditMode && <Button onClick={handleEditJewllDesign}>Edit</Button>}
                    {!isEditMode && <Button onClick={handleSubmit}>Add</Button>}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddFareRate
