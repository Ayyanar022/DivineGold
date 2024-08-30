import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import { useGetIteCategoryConstant, useGetItemGenderConstant, useGetItemNameConstant, useGetItemTypeConstant } from '../../api/AdminApi'
import { CiCircleRemove } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const ConstantsAdd = () => {

    const [ItemName, setItemName] = useState('')
    const [ItemCategory, setItemCategory] = useState('')
    const [Itemtype, setItemtype] = useState('')
    const [itemGender, setitemGender] = useState('')

    const [namedialogOpen, setNameDialogOpen] = useState(false)
    const [categorydialogOpen, setCategoryDialogOpen] = useState(false)
    const [typedialogOpen, setTypeDialogOpen] = useState(false)
    const [genderdialogOpen, setGenderDialogOpen] = useState(false)

    const handleNameDialogClose = () => {
        setNameDialogOpen(false)
    }
    const handleCategoryDialogClose = () => {
        setCategoryDialogOpen(false)
    }
    const handleTypeDialogClose = () => {
        setTypeDialogOpen(false)
    }
    const handleGenderDialogClose = () => {
        setGenderDialogOpen(false)
    }


    // this is for post request 
    const { getAccessTokenSilently } = useAuth0()
    const handleSubmitName = async (NameRefetch) => {
        const accessToken = await getAccessTokenSilently()
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/ItemName`, { ItemName }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            if (response?.status === 201) {
                setItemName('')
                NameRefetch()
            }
        } catch (err) {
            console.log("Error", err)
        }
    }

    const handleSubmitCategory = async (CategoryRefetch) => {
        const accessToken = await getAccessTokenSilently()
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/ItemCategory`, { ItemCategory }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            if (response?.status === 201) {
                setItemCategory('')
                CategoryRefetch()
            }
        } catch (err) {
            console.log("Error", err)
        }
    }

    const handleSubmitType = async (typeRefetch) => {
        const accessToken = await getAccessTokenSilently()
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/Itemtype`, { Itemtype }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            setItemtype('')
            await typeRefetch()
        } catch (err) {
            console.log("Error", err)
        }
    }

    const handleSubmitGender = async (GenderRefetch) => {
        const accessToken = await getAccessTokenSilently()
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/itemGender`, { itemGender }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            if (response?.status === 201) {
                setitemGender('')
                GenderRefetch()
            }
        } catch (err) {
            console.log("Error", err)
        }
    }

    const { ConstantItemName, isLoading: NameIsLoading, refetch: NameRefetch } = useGetItemNameConstant()
    const { ConstantItemCategory, isLoading: CategoryIsLoading, refetch: CategoryRefetch } = useGetIteCategoryConstant();
    const { ConstantItemType, isLoading: typeIsLoading, refetch: typeRefetch } = useGetItemTypeConstant();
    const { ConstantItemGender, isLoading: GenderisLoading, refetch: GenderRefetch } = useGetItemGenderConstant();

    const handleNameDeleteFun = async (id, NameRefetch) => {
        const accessToken = await getAccessTokenSilently();
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/delete-name/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        NameRefetch()
    }

    const handleCategoryDeleteFun = async (id, CategoryRefetch) => {
        const accessToken = await getAccessTokenSilently();
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/delete-category/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        CategoryRefetch()
    }

    const handletypeDeleteFun = async (id, typeRefetch) => {
        const accessToken = await getAccessTokenSilently();
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/delete-type/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        await typeRefetch()
    }

    const handleGenderDeleteFun = async (id, GenderRefetch) => {
        const accessToken = await getAccessTokenSilently();
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/delete-gender/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        GenderRefetch()
    }

    return (
        <div>
            <div className='flex justify-around items-center p-4'>
                <button onClick={() => setNameDialogOpen(true)} className='bg-slate-700 hover:bg-slate-800 transition-all text-slate-100 py-1 px-3 rounded-sm'>Item Name</button>
                <button onClick={() => setCategoryDialogOpen(true)} className='bg-slate-700 hover:bg-slate-800 transition-all text-slate-100 py-1 px-3 rounded-sm'>Item Category</button>
                <button onClick={() => setTypeDialogOpen(true)} className='bg-slate-700 hover:bg-slate-800 transition-all text-slate-100 py-1 px-3 rounded-sm'>Item Type</button>
                <button onClick={() => setGenderDialogOpen(true)} className='bg-slate-700 hover:bg-slate-800 transition-all text-slate-100 py-1 px-3 rounded-sm'>Gender</button>
            </div>

            <div className='bg-yellow-400 p-2 grid grid-cols-4'>

                <table className='border '>
                    <thead className='border'>
                        <tr className='border-b text-md'>
                            <th className='px-3 py-1 text-left'>S.No</th>
                            <th className='px-3 py-1 text-left'>Item Name</th>
                            <th className='px-3 py-1 text-left'>Rem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {NameIsLoading ? (<tr>
                            <td colSpan="8" className='text-center py-5'>
                                <div className='flex justify-center items-center'>
                                    <AiOutlineLoading3Quarters className='animate-spin text-xl text-gray-600' />
                                    <span className='ml-2 text-xl font-semibold'>Loading...</span>
                                </div>
                            </td>
                        </tr>) : (ConstantItemName?.data?.length > 0 && ConstantItemName?.data?.map((item, index) => {
                            return (
                                <tr key={item?._id}>
                                    <td className='px-3 py-1 text-sm'>{index + 1}</td>
                                    <td className='px-3 py-1 text-sm'>{item?.itemName}</td>
                                    <td className='px-3 py-1 text-lg'><span onClick={() => handleNameDeleteFun(item._id, NameRefetch)} className='cursor-pointer'><CiCircleRemove /></span></td>
                                </tr>
                            )
                        }))}

                    </tbody>
                </table>

                <table className='border '>
                    <thead className='border'>
                        <tr className='border-b text-md'>
                            <th className='px-3 py-1 text-left'>S.No</th>
                            <th className='px-3 py-1 text-left'>Item Name</th>
                            <th className='px-3 py-1 text-left'>Rem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CategoryIsLoading ? (<tr>
                            <td colSpan="8" className='text-center py-5'>
                                <div className='flex justify-center items-center'>
                                    <AiOutlineLoading3Quarters className='animate-spin text-xl text-gray-600' />
                                    <span className='ml-2 text-xl font-semibold'>Loading...</span>
                                </div>
                            </td>
                        </tr>) : (ConstantItemCategory?.data?.length > 0 && ConstantItemCategory?.data?.map((item, index) => {
                            return (
                                <tr key={item?._id}>
                                    <td className='px-3 py-1 text-sm'>{index + 1}</td>
                                    <td className='px-3 py-1 text-sm'>{item?.itemCategory}</td>
                                    <td className='px-3 py-1 text-lg '><span onClick={() => handleCategoryDeleteFun(item?._id, CategoryRefetch)} className='cursor-pointer'><CiCircleRemove /></span></td>
                                </tr>
                            )
                        }))}

                    </tbody>
                </table>

                <table className='border '>
                    <thead className='border'>
                        <tr className='border-b text-md'>
                            <th className='px-3 py-1 text-left'>S.No</th>
                            <th className='px-3 py-1 text-left'>Item Name</th>
                            <th className='px-3 py-1 text-left'>Rem</th>
                        </tr>
                    </thead>

                    <tbody>
                        {typeIsLoading ? (<tr>
                            <td colSpan="8" className='text-center py-5'>
                                <div className='flex justify-center items-center'>
                                    <AiOutlineLoading3Quarters className='animate-spin text-xl text-gray-600' />
                                    <span className='ml-2 text-xl font-semibold'>Loading...</span>
                                </div>
                            </td>
                        </tr>) : (ConstantItemType?.data?.length > 0 && ConstantItemType?.data?.map((item, index) => {
                            return (
                                <tr key={item?._id}>
                                    <td className='px-3 py-1 text-sm'>{index + 1}</td>
                                    <td className='px-3 py-1 text-sm'>{item?.itemType}</td>
                                    <td className='px-3 py-1 text-lg'><span onClick={() => handletypeDeleteFun(item?._id, typeRefetch)} className='cursor-pointer'><CiCircleRemove /></span></td>
                                </tr>
                            )
                        }))}

                    </tbody>
                </table>

                <table className='border '>
                    <thead className='border'>
                        <tr className='border-b text-md'>
                            <th className='px-3 py-1 text-left'>S.No</th>
                            <th className='px-3 py-1 text-left'>Item Name</th>
                            <th className='px-3 py-1 text-left'>Rem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {GenderisLoading ? (<tr>
                            <td colSpan="8" className='text-center py-5'>
                                <div className='flex justify-center items-center'>
                                    <AiOutlineLoading3Quarters className='animate-spin text-xl text-gray-600' />
                                    <span className='ml-2 text-xl font-semibold'>Loading...</span>
                                </div>
                            </td>
                        </tr>) : (ConstantItemGender?.data?.length > 0 && ConstantItemGender?.data?.map((item, index) => {
                            return (
                                <tr key={item?._id}>
                                    <td className='px-3 py-1 text-sm'>{index + 1}</td>
                                    <td className='px-3 py-1 text-sm'>{item?.itemGender}</td>
                                    <td className='px-3 py-1 text-lg'><span onClick={() => handleGenderDeleteFun(item?._id, GenderRefetch)} className='cursor-pointer'><CiCircleRemove /></span></td>
                                </tr>
                            )
                        }))}

                    </tbody>
                </table>

            </div>

            <Dialog open={namedialogOpen} onClose={handleNameDialogClose}  >
                <DialogTitle>Add Item Name</DialogTitle>
                <DialogContent>
                    <div className='min-w-[400px]'>
                        <TextField
                            fullWidth
                            margin='dense'
                            autoFocus
                            value={ItemName}
                            onChange={(e) => setItemName(e.target.value)}
                            name="ItemName"
                            id="ItemName"
                            variant='outlined'
                            type='text'
                            label="Item Name"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNameDialogClose} >Cancel</Button>
                    <Button onClick={() => handleSubmitName(NameRefetch)}>Submit</Button>

                </DialogActions>
            </Dialog>

            <Dialog open={categorydialogOpen} onClose={handleCategoryDialogClose} >
                <DialogTitle>Add Item Category</DialogTitle>
                <DialogContent>
                    <div className='min-w-[400px]'>
                        <TextField
                            fullWidth
                            margin='dense'
                            autoFocus
                            value={ItemCategory}
                            onChange={(e) => setItemCategory(e.target.value)}
                            name="ItemCategory"
                            id="ItemCategory"
                            variant='outlined'
                            type='text'
                            label="Item Category"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCategoryDialogClose} >Cancel</Button>
                    <Button onClick={() => handleSubmitCategory(CategoryRefetch)}>Submit</Button>

                </DialogActions>
            </Dialog>

            <Dialog open={typedialogOpen} onClose={handleTypeDialogClose} >
                <DialogTitle>Add Item Type</DialogTitle>
                <DialogContent>
                    <div className='min-w-[400px]'>
                        <TextField
                            fullWidth
                            margin='dense'
                            autoFocus
                            value={Itemtype}
                            onChange={(e) => setItemtype(e.target.value)}
                            name="Itemtype"
                            id="Itemtype"
                            variant='outlined'
                            type='text'
                            label="Item Type"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTypeDialogClose} >Cancel</Button>
                    <Button onClick={() => handleSubmitType()}>Submit</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={genderdialogOpen} onClose={handleGenderDialogClose} >
                <DialogTitle>Add Item Gender</DialogTitle>
                <DialogContent>
                    <div className='min-w-[400px]'>
                        <TextField
                            fullWidth
                            margin='dense'
                            autoFocus
                            value={itemGender}
                            onChange={(e) => setitemGender(e.target.value)}
                            name="itemGender"
                            id="itemGender"
                            variant='outlined'
                            type='text'
                            label="Item Gender"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleGenderDialogClose} >Cancel</Button>
                    <Button onClick={() => handleSubmitGender(GenderRefetch)}>Submit</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default ConstantsAdd
