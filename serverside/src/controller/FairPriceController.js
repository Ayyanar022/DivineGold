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

const getSingleFairPriceDetails = async(req,res)=>{
    try{
        const {_id} = req.params;
        const response = await FairPrice.find({_id:_id})
        if(response.length<1){
            res.status(200).json({message:"nodata fount",success:false})
        }       
        res.status(200).json({data:response[0],success:true})
    }catch(err){
        console.log("err",err)
        return res.status(500).json({message:"Somthing went wrong..",error:false})
    }
}


export default{
    getAllFairPriceList,
    getSingleFairPriceDetails,
}

