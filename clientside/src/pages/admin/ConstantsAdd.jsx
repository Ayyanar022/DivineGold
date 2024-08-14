import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'

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
    const handleSubmitName = async () => {
        const accessToken = await getAccessTokenSilently()
        try {
            const response = await axios.post(`http://localhost:7000/api/admin/ItemName`, { ItemName }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            console.log("response", response);
        } catch (err) {
            console.log("Error", err)
        }
    }

    const handleSubmitCategory = async () => {
        const accessToken = await getAccessTokenSilently()
        try {
            const response = await axios.post(`http://localhost:7000/api/admin/ItemCategory`, { ItemCategory }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            console.log("response", response);
        } catch (err) {
            console.log("Error", err)
        }
    }

    const handleSubmitType = async () => {
        const accessToken = await getAccessTokenSilently()
        try {
            const response = await axios.post(`http://localhost:7000/api/admin/Itemtype`, { Itemtype }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            console.log("response", response);
        } catch (err) {
            console.log("Error", err)
        }
    }

    const handleSubmitGender = async () => {
        const accessToken = await getAccessTokenSilently()
        try {
            const response = await axios.post(`http://localhost:7000/api/admin/itemGender`, { itemGender }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            console.log("response", response);
        } catch (err) {
            console.log("Error", err)
        }
    }

    return (
        <div>
            <div className='flex justify-around items-center p-4'>
                <button onClick={() => setNameDialogOpen(true)} className='bg-slate-700 hover:bg-slate-800 transition-all text-slate-100 py-1 px-3 rounded-sm'>Item Name</button>
                <button onClick={() => setCategoryDialogOpen(true)} className='bg-slate-700 hover:bg-slate-800 transition-all text-slate-100 py-1 px-3 rounded-sm'>Item Category</button>
                <button onClick={() => setTypeDialogOpen(true)} className='bg-slate-700 hover:bg-slate-800 transition-all text-slate-100 py-1 px-3 rounded-sm'>Item Type</button>
                <button onClick={() => setGenderDialogOpen(true)} className='bg-slate-700 hover:bg-slate-800 transition-all text-slate-100 py-1 px-3 rounded-sm'>Gender</button>
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
                    <Button onClick={handleSubmitName}>Submit</Button>
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
                    <Button onClick={handleSubmitCategory}>Submit</Button>
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
                    <Button onClick={handleSubmitType}>Submit</Button>
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
                    <Button onClick={handleSubmitGender}>Submit</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default ConstantsAdd
