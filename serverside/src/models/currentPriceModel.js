import mongoose  from "mongoose";

const currentPriceShema = new mongoose.Schema({
    currentPrice:{type:Number}, 
})

const CurrentPrice = mongoose.model('CurrentPrice',currentPriceShema);
export default CurrentPrice;