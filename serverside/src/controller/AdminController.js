import FairPrice from '../models/fairPriceModel.js'
import User from '../models/userModel.js'


const getAllUser =async (req,res)=>{
try{
    const response = await User.find()
    console.log("response",response)
    if(!response) return res.status(404).json({message:"user Not Found"})
   res.json(response)     

}catch(err){
    console.log("error",err);
return res.status(500).json({message:"something went wrong fetch all user.."})
}  
}


const createFairPriceItem = async (req,res)=>{
   try{
    const newfairPrice = new FairPrice(req.body);
    console.log("req.body",req.body)
    await newfairPrice.save()
    res.status(201).json(newfairPrice.toObject())
   }catch(err){
    console.log("err",err)
    res.status(500).json({message:"faild to create fairPrice",success:false})
   }
}


export default {
    getAllUser,
    createFairPriceItem,
}