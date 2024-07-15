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


export default {
    getAllUser,
}