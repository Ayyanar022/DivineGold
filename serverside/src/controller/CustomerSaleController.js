import SaleItem from "../models/SaleProductModel.js";
import User from "../models/userModel.js"; 


const getCustomer = async(req,res)=>{
    try{
        const mobileNo = Number(req.params.mobileNo);
        const response = await User.find({mobileNo:mobileNo})
        if(!response){
        res.status(404).json({message:"data not found",success:false})
        }
        res.json(response)
    }catch(err){
        res.status(500).json({message:"Somthing went wrong.."})
    }
    
}

const AddSaleItem = async(req,res)=>{
    try{
    
            const { userId, jewellName, jewellCategory, jewllTouch, netWeight, PrizeToken, quantity, price } = req.body;
        
            // 1. Fetch User Data
            const user = await User.findById(userId);
        
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
        
            // 2. Validate and Calculate
            if (user.bonousePoints < PrizeToken) {
              return res.status(400).json({ message: "Not enough Prize Tokens" });
            }
        
            // const finalPrice = price - PrizeToken; // Assuming 1 PrizeToken = 1 currency unit
        
            // 3. Update User's PrizeTokens
            user.bonousePoints -= PrizeToken;
            await user.save();
        
            // 4. Create Sale Record
            const newSale = new SaleItem({
              userId: user._id,
              jewellName,
              jewellCategory,
              jewllTouch,
              netWeight,
              PrizeToken,
              quantity,
              price,
            });
        
            await newSale.save();
        
            return res.status(201).json({ message: "Sale recorded successfully", sale: newSale,success:true });
        

    }catch(err){
      console.log("error",err)
        res.status(500).json({message:"Somthing went wrong.."})
    }
}


export default {
    getCustomer,
    AddSaleItem,
}