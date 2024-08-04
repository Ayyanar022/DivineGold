import NewJewllDesign from "../models/jewllItemDesignModel.js"



const getSingleJEwellDesignData = async(req,res)=>{
   try{
    const _id = req.params.id
    const response = await NewJewllDesign.findOne({_id})
   res.status(200).json(response)
   }catch(err){
    console.log("error",err)
    res.status(500).json({message:"somthing went wrong..",error:true})
   }
}

export default {
    getSingleJEwellDesignData,
}