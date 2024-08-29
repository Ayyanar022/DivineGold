import mongoose  from "mongoose";

const fairPriceschema = new mongoose.Schema({
    jewellName: {type:String},
    jewellCategory: {type:String},
    jewellType: {type:String},
    jewellGender: {type:String},
    touch_75: {type:Number},
    touch_92: {type:Number},
    jewellImage: [],
    jewellDescription: {type:String}
})

// jewellName,jewellCategory,jewellType

const FairPrice = mongoose.model('FairPrice',fairPriceschema);
export default FairPrice;