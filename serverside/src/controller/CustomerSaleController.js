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


export default {
    getCustomer,
}