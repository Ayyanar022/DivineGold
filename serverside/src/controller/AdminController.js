import CurrentPrice from '../models/currentPriceModel.js'
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

const updateCurentPrice = async (req,res)=>{
    try{
        const currentPrice = req.body.currentPrice;
        console.log("currentPrice",currentPrice)
        const updateCP = await CurrentPrice.findOneAndUpdate(
            {}, // Assuming you have only one document, so an empty filter
            { currentPrice: currentPrice },
            { new: true, upsert: true } // `new` returns the modified document, `upsert` creates if it doesn't exist
        );
console.log()
        res.status(201).json(updateCP);
        
    }catch(err){
        console.log("err",err)
        res.status(500).json({message:"faild to Update fairPrice",success:false})
       }
}

const getCurrentPrice = async(req,res)=>{
    
  try{
    // console.log("req",req)
    const response = await CurrentPrice.findOne({})
    // console.log("response",response)
    res.status(200).json(response);
    
  }catch(err){
    console.log("error",err)
    res.status(500).json({message:"Somthing went wrong",error:false})
  }
}


export default {
    getAllUser,
    createFairPriceItem,
    updateCurentPrice,
    getCurrentPrice,
}