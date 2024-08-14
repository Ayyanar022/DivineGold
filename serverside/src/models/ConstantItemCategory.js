import mongoose from "mongoose";

const itemCategorySchema = new mongoose.Schema({
    itemCategory:{type:String},
})

const ItemCategory = mongoose.model("ItemCategory",itemCategorySchema);
export default ItemCategory; 