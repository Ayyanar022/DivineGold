import NewJewllDesign from "../models/jewllItemDesignModel.js"



const getSingleJEwellDesignData = async(req,res)=>{
   try{
    const _id = req.params.id;
    
    const response = await NewJewllDesign.findOne({_id:_id})
   res.status(200).json(response)
   }catch(err){
    console.log("error",err)
    res.status(500).json({message:"somthing went wrong..",error:true})
   }
}


const getFilterJEwellDesignData = async (req, res) => {
    try {
      const { gender, type, category } = req.query;  
      let filter = {};
  
      if (gender) filter.jewellGender = { $in: gender.split(',') };
      if (type) filter.jewellType = { $in: type.split(',') };
      if (category) filter.jewellCategory = { $in: category.split(',') };
  
      const designs = await NewJewllDesign.find(filter);
      res.json(designs);
    } catch (err) {
      console.log('Error', err);
      res.status(500).json({ message: 'Something went wrong..', error: true });
    }
  };
  

export default {
    getSingleJEwellDesignData,
    getFilterJEwellDesignData,
}