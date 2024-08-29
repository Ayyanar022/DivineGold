import mongoose from "mongoose";

const newJewllDesignSchema = new mongoose.Schema({
    jewellName: {type:String},
    jewellCategory: {type:String},
    jewellType: {type:String},
    jewellGender: {type:String},
    touch_75: {type:Number},
    touch_92: {type:Number},
    touch_M_75: {type:Number},
    touch_M_92: {type:Number},
    jewellImage: [],
    jewellDescription: {type:String}
})

const NewJewllDesign = mongoose.model("NewJewllDesign",newJewllDesignSchema);
export default NewJewllDesign;