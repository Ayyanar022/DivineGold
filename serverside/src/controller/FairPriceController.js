import FairPrice from "../models/fairPriceModel.js"


const getAllFairPriceList = async(req,res)=>{
    try{
        const response = await FairPrice.find();
        if(!response) return res.status(404).json({message:"No Data..",sucess:false});
        res.status(200).json(response)
    }catch(err){
        console.log("err",err)
        return res.status(500).json({message:"something went wrong ..",error:true})
    }
}


export default{
    getAllFairPriceList,
}

