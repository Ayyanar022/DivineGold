import mongoose from "mongoose";

const itemGender = new mongoose.Schema({
    itemGender:{type:String}
})

const ItemGender = mongoose.model("ItemGender",itemGender);
export default ItemGender;