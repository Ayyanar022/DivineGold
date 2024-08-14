import mongoose from 'mongoose'

const itemNameSchema = new mongoose.Schema({
    itemName :{type:String},
})

const ItemName = mongoose.model('ItemName',itemNameSchema);
export default ItemName ; 