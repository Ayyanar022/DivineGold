import mongoose  from "mongoose";

const fairPriceschema = new mongoose.Schema({
    itemName:{type:String},
    category: {type:String},
    touch_75: {type:Number},
    touch_92: {type:Number},
    item_Image: {type:String},
    description: {type:String},
})

const FairPrice = mongoose.model('FairPrice',fairPriceschema);
export default FairPrice;