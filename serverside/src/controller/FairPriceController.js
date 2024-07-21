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
        const {itemName,category} = req.params;
        console.log("itemName",itemName,category)
        const response = await FairPrice.find({category,itemName})
        console.log("respo ",response);
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

