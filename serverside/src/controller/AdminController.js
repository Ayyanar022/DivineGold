import CurrentPrice from '../models/currentPriceModel.js'
import FairPrice from '../models/fairPriceModel.js'
import User from '../models/userModel.js'
import NewJewllDesign from '../models/jewllItemDesignModel.js'


const getAllUser =async (req,res)=>{
try{
    const response = await User.find()
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
        const updateCP = await CurrentPrice.findOneAndUpdate(
            {}, // Assuming you have only one document, so an empty filter
            { currentPrice: currentPrice },
            { new: true, upsert: true } // `new` returns the modified document, `upsert` creates if it doesn't exist
        );
        res.status(201).json(updateCP);        
    }catch(err){
        console.log("err",err)
        res.status(500).json({message:"faild to Update fairPrice",success:false})
       }
}

const getCurrentPrice = async(req,res)=>{    
  try{
    const response = await CurrentPrice.findOne({})
    res.status(200).json(response);    
  }catch(err){
    console.log("error",err)
    res.status(500).json({message:"Somthing went wrong",error:true})
  }
}

const updateFairPriceItem = async(req,res)=>{
  try{
  
    const {_id,touch_92,touch_75,item_category,itemName} = req.body;
   
    const updateItem = await FairPrice.findByIdAndUpdate(
      _id,
      {
        itemName,
        item_category,
        touch_75,
        touch_92,
      },
      {new:true}
    )

    if(!updateItem){
      return res.status(404).json({ message: "Item not found", error: true });
    }
    res.status(200).json({ message: "Item updated successfully", updateItem, success:true });
  }catch(err){
    console.log("Error",err)
    res.status(500).json({message:"somthing went wrong in updating..",error:true})
  }
}

const deletFairPriceItem = async(req,res)=>{
  try{
    const {_id} = req.body;
    const response = await FairPrice.findByIdAndDelete(_id)
    if(!response){
      return res.status(404).json({ message: "Item not found", error: true });
    }
    res.status(200).json({ message: "Item deleted successfully", success:true });

  }catch(err){
    console.log("Error",err)
    res.status(500).json({message:"somthing went wrong in deleting..",error:true})
  }
}

// Add new Jewll Design 
const AddnewItemDesign = async(req,res)=>{
  try{
      const newDesign = new  NewJewllDesign(req.body)
      await newDesign.save()     
      res.status(201).json({data:newDesign.toObject(),sucess:true})

  }catch(err){
    console.log("Error",err)
    res.status(500).json({message:"somthing went wrong in Adding new design..",error:true})

  }
}


export default {
    getAllUser,
    createFairPriceItem,
    updateCurentPrice,
    getCurrentPrice,
    updateFairPriceItem,
    deletFairPriceItem,
    AddnewItemDesign,
}