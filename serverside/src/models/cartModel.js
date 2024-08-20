import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required :true},
    productId : {type : mongoose.Schema.Types.ObjectId , ref : 'NewJewllDesign' , required :true},
    quantity:{type:Number , default:1 , required:true}
})


const CartModel = mongoose.model("CartItem",cartSchema);

export default CartModel