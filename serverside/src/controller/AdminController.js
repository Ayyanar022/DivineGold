import CurrentPrice from '../models/currentPriceModel.js'
import FairPrice from '../models/fairPriceModel.js'
import User from '../models/userModel.js'
import NewJewllDesign from '../models/jewllItemDesignModel.js'
import ItemName from '../models/ConstantItemName.js'
import ItemGender from '../models/ConstantItemGender.js'
import ItemCategory from '../models/ConstantItemCategory.js'
import ItemType from '../models/ConstantItemType.js'


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

//UPDATE CURRENT RATE
const updateCurentPrice = async (req,res)=>{
    try{
        const currentPrice = req.body.currentPrice;
        const updateCP = await CurrentPrice.findOneAndUpdate(
            {}, // Assuming you have only one document, so an empty filter
            { currentPrice: currentPrice },
            { new: true, upsert: true } // `new` returns the modified document, `upsert` creates if it doesn't exist
        );
        res.status(201).json({updateCP,sucess:true,message:"Rate Added."});        
    }catch(err){
        console.log("err",err)
        res.status(500).json({message:"faild to Update Rate",success:false})
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

const getAllJewllDesigns = async(req,res)=>{
try{
  const data = await NewJewllDesign.find()
  res.status(200).json(data)
}catch(err){
  console.log("Error",err)
  res.status(500).json({message:"Somthing went Wrong.."})
}
}

const editJewllDesign = async (req,res)=>{
  try{
   const {_id , ...updateDate} = req.body
    const response = await NewJewllDesign.findByIdAndUpdate(_id , updateDate ,{new:true})
    res.status(200).json(response)

  }catch(err){
    console.log("error",err);
    res.status(500).json({message:"Somthing went wrong.."})
  }
}

const deleteJewllDesign = async (req,res)=>{
  try{
    const {_id} = req.body;
    const response = await NewJewllDesign.findByIdAndDelete(_id);
    if(!response){
    res.status(404).json({message:"id not found"})
    }
    res.status(200).json({message:"Deleted Successfully..",success:true})

  }catch(err){
    console.log("error",err)
    res.status(500).json({message:"somthing went wrong.."})
  }
}


//Add Constant Item names
const AddItemName = async (req, res) => {
  try {
    const addName = new ItemName({ itemName: req.body.ItemName }); // Ensure the case matches the request body
    await addName.save();
    res.status(201).json(addName);
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ message: "something went wrong.." });
  }
};


//Add Constant Item Category
const AddItemCategory = async(req,res)=>{
  try{
    const addCategory = new ItemCategory({itemCategory:req.body.ItemCategory});
    await addCategory.save()
    res.status(201).json(addCategory)

  }catch(err){
    console.log("error",err);
    res.status(500).json({message:"somthing went wrong.."})
  }

}
//Add Constant Item Types
const AddItemType = async(req,res)=>{
  try{
    const addType = new ItemType({itemType:req.body.Itemtype});
    await addType.save()
    res.status(201).json(addType);
    
  }catch(err){
    console.log("error",err);
    res.status(500).json({message:"somthing went wrong.."})
  }

}

//Add Constant Item Gender
const AddItemGender = async(req,res)=>{
  try{
    const addGender = new ItemGender({itemGender:req.body.itemGender});
    await addGender.save()
    res.status(201).json(addGender)

  }catch(err){
    console.log("error",err);
    res.status(500).json({message:"somthing went wrong.."})
  }
}

// get all constants
const getItemNameConstant = async(req,res)=>{
  try{
      const response = await ItemName.find()
      res.json(response)
  }catch(err){
    console.log("error",err)
    res.status(500).json({message:"Somthing went wrong.."})
  }
}
const getItemCategoryConstant = async(req,res)=>{
  try{
      const response = await ItemCategory.find()
      res.json(response)
  }catch(err){
    console.log("error",err)
    res.status(500).json({message:"Somthing went wrong.."})
  }
}
const getItemTypeConstant = async(req,res)=>{
  try{
      const response = await ItemType.find()
      res.json(response)
  }catch(err){
    console.log("error",err)
    res.status(500).json({message:"Somthing went wrong.."})
  }
}
const getItemGenderConstant = async(req,res)=>{
  try{
      const response = await ItemGender.find()
      res.json(response)
  }catch(err){
    console.log("error",err)
    res.status(500).json({message:"Somthing went wrong.."})
  }
}

// delete constants

const deleteItemNameConstant = async(req,res)=>{
try{
    const id = req.params.id
    const response = await ItemName.findByIdAndDelete({_id:id})
    res.json(response)
}catch(err){
  console.log("error",err)
  res.status(500).json({message:"Somthing went wrong.."})
}
}

const deleteItemCategoryConstant = async(req,res)=>{
try{
    const id = req.params.id
    const response = await ItemCategory.findByIdAndDelete({_id:id})
    res.json(response)
}catch(err){
  console.log("error",err)
  res.status(500).json({message:"Somthing went wrong.."})
}
}

const deleteItemtypeConstant = async(req,res)=>{
try{
    const id = req.params.id
    const response = await ItemType.findByIdAndDelete({_id:id})
    res.json(response)
}catch(err){
  console.log("error",err)
  res.status(500).json({message:"Somthing went wrong.."})
}
}

const deleteItemGenderConstant = async(req,res)=>{
try{
    const id = req.params.id
    const response = await ItemGender.findByIdAndDelete({_id:id})
    res.json(response)
}catch(err){
  console.log("error",err)
  res.status(500).json({message:"Somthing went wrong.."})
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
    getAllJewllDesigns,
    editJewllDesign,
    deleteJewllDesign,

    AddItemName,
    AddItemCategory,
    AddItemType,
    AddItemGender,
    getItemNameConstant,
    getItemCategoryConstant,
    getItemTypeConstant,
    getItemGenderConstant,

    //delete constants
    deleteItemNameConstant,
    deleteItemCategoryConstant,
    deleteItemtypeConstant,
    deleteItemGenderConstant,
}