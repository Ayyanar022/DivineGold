import mongoose from "mongoose";

const itemTypeSchema = new mongoose.Schema({
    itemType : {type:String},
})

const ItemType = mongoose.model("Itemtype",itemTypeSchema);
export default ItemType;
