import CartModel from "../models/cartModel.js";


const addUpdateCart = async(req,res)=>{
    try{
        const {productId} =  req.body;
        const  userId =  req.userId;

        // Find if the product is already in the user's cart
        let cartItem = await CartModel.findOne({userId,productId});

        if(cartItem){
            if(cartItem.quantity>=3){
                res.status(200).json({message:"Max Limit is 3.." ,success:false})
                return
            }
            cartItem.quantity +=1;
        }else{
            cartItem = new CartModel({
                userId,
                productId,
                quantity:1,
            })
        }
        await cartItem.save();
        res.json({success:true,cartItem,message:"Item Added to the cart"})
    }catch(err){
        console.log("error",err)
        res.status(500).json({message:"somthing went wrong "})
    }
}


const getCart = async(req,res)=>{
    try{
        const  userId =  req?.userId;
        const cartItems = await CartModel.find({ userId }).populate('productId');
        res.json({success:true,cartItems})
    }catch(err){
        console.log("error",err)
        res.status(500).json({message:"somthing went wrong "})
    }
}


//DELETE CART ITEM
const deleteCart = async(req,res)=>{
    try{
        const {id} = req.body
        if(!id)res.status(400).json({message:"Id is required.."})

        const deleteItem = await CartModel.findByIdAndDelete(id)

        if(!deleteItem)res.status(404).json({message:"Item does not exist.."})
        res.json(deleteItem)

    }catch(err){
        console.log("error",err)
        res.status(500).json({message:"somthing went wrong"})
    }
}

const decreseCartCount = async(req,res)=>{
    try{
        const {id,qty} = req.body
        if(!id)res.status(400).json({message:"Id is required.."})

        const cartqty = await CartModel.findById(id)
        cartqty.quantity-=qty;

        if (cartqty.quantity <= 0) {
            await CartModel.findByIdAndDelete(id);
            return res.json({ message: "Item removed from cart." });
        }
        await cartqty.save()

        if(!cartqty)res.status(404).json({message:"Item does not exist.."})
        res.json(cartqty)

    }catch(err){
        console.log("error",err)
        res.status(500).json({message:"somthing went wrong"})
    }
}

export default {
    addUpdateCart,
    getCart,
    deleteCart,
    decreseCartCount,
}