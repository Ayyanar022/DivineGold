import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField } from '@mui/material'
import React, { useState } from 'react'
import { category, Gender, itemCategory } from '../../helper/uploadFairPriceItemData'
import uploadRateforImage from '../../helper/uploadRateForImage'
import { MdDelete } from 'react-icons/md'
import { useUploadNewItemDesign } from '../../api/AdminApi'
import { toast } from 'react-toastify'

const ExploreCardAdd = () => {

    const newDesign = {
        jewellName: '',
        jewellCategory: null,
        jewellType: null,
        jewellGender: null,
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
            console.log("uploadImage", uploadImage?.url)
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

    const uploadNewDesign = async (e) => {
        e.preventDefault()
        const response = await AddNewItemDesign(jewellData)
        if (addDesignisSucess) {
            toast.success("Added new Design")
        }
        handleCancel()
    }

    return (
        <div>
            <div className='w-full border-b flex justify-between items-center p-3'>
                <h2 className='text-md font-semibold'>Upload jewell Items</h2>
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
                        value={jewellData.jewellName}
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
                        id="jewellCategory"
                        value={jewellData?.jewellCategory}
                        name="jewellCategory"
                        options={itemCategory}
                        getOptionLabel={(option) => option?.label}
                        onChange={(event, newValue) => setJewellData(prev => ({ ...prev, jewellCategory: newValue?.label }))}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Jewell Category" variant='outlined' />
                        )}

                    />

                    <Autocomplete
                        className='mt-4'
                        autoFocus
                        id="jewellType"
                        value={jewellData?.jewellType}
                        options={category}
                        getOptionLabel={(option) => option?.label}
                        onChange={(event, newValue) => setJewellData(prev => ({ ...prev, jewellType: newValue?.label }))}
                        renderInput={(params) => (
                            <TextField {...params} label="Select jewll Type" variant='outlined' />
                        )}
                    />


                    <Autocomplete
                        className='mt-4'
                        autoFocus
                        id="jewellGender"
                        value={jewellData?.jewellGender}
                        options={Gender}
                        getOptionLabel={(option) => option?.label}
                        onChange={(newValue) => setJewellData(prev => ({ ...prev, jewellGender: newValue?.label }))}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Gender" variant='outlined' />
                        )}
                    />


                    <TextField
                        fullWidth
                        margin='dense'
                        autoFocus
                        value={jewellData.touch_75}
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
                        value={jewellData.touch_92}
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
                    <Button onClick={uploadNewDesign}>Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ExploreCardAdd
