import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { category, Gender, itemCategory } from '../../helper/uploadFairPriceItemData'
import uploadRateforImage from '../../helper/uploadRateForImage'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useGetIteCategoryConstant, useGetItemGenderConstant, useGetItemNameConstant, useGetItemTypeConstant, useUploadNewItemDesign } from '../../api/AdminApi'
import { toast } from 'react-toastify'
import { useGetAllJewllDesign } from '../../api/ExploreApi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useAuth0 } from '@auth0/auth0-react'
import { useQueryClient } from 'react-query'
import axios from 'axios'

const ExploreCardAdd = () => {

    const newDesign = {
        jewellName: '',
        jewellCategory: null,
        jewellType: null,
        jewellGender: '',
        touch_75: "",
        touch_92: "",
        jewellImage: [],
        jewellDescription: ""
    }

    const [dailogOpen, setDialogOpen] = useState()
    const [jewellData, setJewellData] = useState(newDesign)

    const openDialog = () => {
        setDialogOpen(true)
    }

    //close dialog
    const closeDialogFun = () => {
        setDialogOpen(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJewellData(prev => ({
            ...prev,
            [name]: value
        }))
    }

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

    const handleCancel = () => {
        setJewellData(newDesign)
        setDialogOpen(false)
    }

    const { AddNewItemDesign, isLoading, isSuccess: addDesignisSucess } = useUploadNewItemDesign()

    const uploadNewDesign = async () => {
        try {
            const response = await AddNewItemDesign(jewellData)
            if (response?.sucess) {
                queryClient.invalidateQueries('getAllJewell') // to refetch data
                handleCancel()
                toast.success("Added new Design")
                setDialogOpen(false)
            }
        } catch (err) {
            console.log("error", err)
            toast.error(err)
        }
    }

    const { JewellDesignData, isLoading: JewllDesignIsLoading } = useGetAllJewllDesign()

    // delete Jewell design 
    const handleDelete = async (item) => {
        const accessToken = await getAccessTokenSilently()
        const response = await axios.delete(`http://localhost:7000/api/admin/delete-jewllDesign`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: { _id: item._id }
        })
        if (response.data.success) {
            queryClient.invalidateQueries('getAllJewell') // to refetch data
            toast.success(response.data.message)
        }
    }

    // Edit 
    const opnDialog = (item) => {

        setJewellData({
            ...item,
            jewellCategory: item?.jewellCategory,
            jewellType: item?.jewellType,
        });
        setDialogOpen(true);
    }

    //Edit fun
    const { getAccessTokenSilently } = useAuth0()
    const queryClient = useQueryClient();

    const handleEditJewllDesign = async () => {

        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`http://localhost:7000/api/admin/edit-jewllDesign`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jewellData)
        })
        if (response.ok) {
            queryClient.invalidateQueries('getAllJewell') // to refetch data
            handleCancel()
            toast.success("Updated Scuccessfully..")
        }
    }

    const { ConstantItemName, isLoading: NameIsLoading, refetch: NameRefetch } = useGetItemNameConstant()
    const { ConstantItemCategory, isLoading: CategoryIsLoading, refetch: CategoryRefetch } = useGetIteCategoryConstant();
    const { ConstantItemType, isLoading: typeIsLoading, refetch: typeRefetch } = useGetItemTypeConstant();
    const { ConstantItemGender, isLoading: GenderisLoading, refetch: GenderRefetch } = useGetItemGenderConstant();

    return (
        <div>
            <div className='w-full border-b flex justify-between items-center px-1 py-3'>
                <h2 className='text-md font-semibold '>Upload jewell Items</h2>
                <button className='py-1 px-2 rounded bg-pink-500 hover:bg-pink-700 text-white' onClick={openDialog}>Upload item</button>
            </div>


            {/**Dilalog box for add item  */}
            <Dialog open={dailogOpen} onClose={closeDialogFun}  >
                <DialogTitle className=''>
                    Upload New Jewell Item
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={jewellData.jewellName || ''}
                        onChange={handleChange}
                        name="jewellName"
                        label="Jewell Name"
                        id="jewellName"
                        type='text'
                        fullWidth
                        variant='outlined'
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

                    {jewellData.jewellImage.length > 0 && (
                        <div className="flex gap-4">
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
                    <label htmlFor="image">
                        <div className='border p-3 mt-2 bg-green-300'>
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
                    <Button onClick={handleEditJewllDesign}>Edit</Button>
                    <Button onClick={uploadNewDesign}>Add</Button>
                </DialogActions>
            </Dialog>


            {/** Jewll designs */}
            <div className='w-full'>
                <h2 className='py-3 px-1 text-slate-700 font-semibold'>All Jewll Designs </h2>
                <table className='w-full mt-2 border '>
                    <thead className='border'>
                        <tr className='border-b text-md '>
                            <th className='px-4 py-2 text-left'>S.No</th>
                            <th className='px-4 py-2 text-left' >Image</th>
                            <th className='px-4 py-2 text-left' >Name</th>
                            <th className='px-4 py-2 text-left' >category</th>
                            <th className='px-4 py-2 text-left' >Type</th>
                            <th className='px-4 py-2 text-left' >Gender</th>
                            <th className='px-4 py-2 text-left' >Touch 75</th>
                            <th className='px-4 py-2 text-left' >Touch 92</th>
                            <th className='px-4 py-2 text-left' >Edit</th>
                            <th className='px-4 py-2 text-left' >Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            JewllDesignIsLoading ? (
                                <tr>
                                    <td colSpan="8" className='text-center py-10'>
                                        <div className='flex justify-center items-center'>
                                            <AiOutlineLoading3Quarters className='animate-spin text-4xl text-gray-600' />
                                            <span className='ml-2 text-xl font-semibold'>Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                JewellDesignData.map((data, index) => (
                                    <tr key={index} className='border-b text-[14px]'>
                                        <td className='px-4 py-1' >{index + 1}</td>
                                        <td>
                                            <img src={data?.jewellImage[0]} alt="img" width={40} height={40} />
                                        </td>
                                        <td className='px-4 py-1'>{data?.jewellName}</td>
                                        <td className='px-4 py-1'>{data?.jewellCategory}</td>
                                        <td className='px-4 py-1' >{data?.jewellType}</td>
                                        <td className='px-4 py-1' >{data?.jewellGender}</td>
                                        <td className='px-4 py-1' >{data?.touch_75}</td>
                                        <td className='px-4 py-1' >{data?.touch_92}</td>
                                        <td onClick={() => opnDialog(data)} className='px-4 py-2 text-green-400 hover:text-green-700 cursor-pointer'>
                                            <span className='text-xl'><MdEdit /></span>
                                        </td>
                                        <td onClick={() => handleDelete(data)} className='px-4 py-2 text-red-400 hover:text-red-700 cursor-pointer'>
                                            <span className='text-xl'><TiDeleteOutline /></span>
                                        </td>

                                    </tr>
                                ))
                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default ExploreCardAdd
